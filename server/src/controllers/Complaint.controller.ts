import { Response } from 'express'
import { z } from 'zod'
import mongoose from 'mongoose'
import Complaint from '../models/Complaint'
import AuditLog from '../models/AuditLog'
import { complaintQueue } from '../queues/complaint.queue'
import { AuthRequest } from '../middleware/auth'
import { sendSuccess, sendError } from '../utils/apiResponse'
import {
  notifyComplaintRoom,
  notifyUser,
  notifyAgents,
} from '../services/notification.service'
// Validation schemas
const createComplaintSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z
    .enum([
      'billing',
      'technical',
      'delivery',
      'product_quality',
      'customer_service',
      'other',
    ])
    .optional()
    .default('other'),
  attachments: z.array(z.string()).optional().default([]),
})

const updateStatusSchema = z.object({
  status: z.enum([
    'pending',
    'ai_processing',
    'ai_processed',
    'assigned',
    'in_progress',
    'resolved',
    'closed',
    'escalated',
  ]),
})

const addMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  isInternal: z.boolean().optional().default(false),
})

// ─────────────────────────────────────────
// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Customer
// ─────────────────────────────────────────
export const createComplaint = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const parsed = createComplaintSchema.safeParse(req.body)
    if (!parsed.success) {
      sendError(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors)
      return
    }

    const { title, description, category, attachments } = parsed.data

    const complaint = await Complaint.create({
      title,
      description,
      category,
      attachments,
      customer: req.user?._id,
      status: 'pending',
    })

    // Queue AI processing (async - doesn't block response)
    await complaintQueue.add({
      complaintId: complaint._id.toString(),
      title,
      description,
      category,
    })

    // Audit log
    await AuditLog.create({
      action: 'complaint_created',
      performedBy: req.user?._id,
      targetModel: 'Complaint',
      targetId: complaint._id,
      ipAddress: req.ip,
    })

    sendSuccess(
      res,
      { complaint },
      'Complaint submitted successfully. AI is analyzing it.',
      201
    )
  } catch (error) {
    console.error('Create complaint error:', error)
    sendError(res, 'Failed to create complaint')
  }
}

// ─────────────────────────────────────────
// @desc    Get all complaints (role-based)
// @route   GET /api/complaints
// @access  All roles
// ─────────────────────────────────────────
export const getComplaints = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { status, category, priority, page = '1', limit = '10' } = req.query

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)
    const skip = (pageNum - 1) * limitNum

    // Build filter based on role
    const filter: Record<string, unknown> = {}

    if (req.user?.role === 'customer') {
      filter.customer = req.user._id
    } else if (req.user?.role === 'agent') {
      filter.assignedAgent = req.user._id
    }
    // admin sees all — no filter on user

    if (status) filter.status = status
    if (category) filter.category = category
    if (priority) filter.priority = priority

    const [complaints, total] = await Promise.all([
      Complaint.find(filter)
        .populate('customer', 'name email')
        .populate('assignedAgent', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Complaint.countDocuments(filter),
    ])

    sendSuccess(res, {
      complaints,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    })
  } catch (error) {
    console.error('Get complaints error:', error)
    sendError(res, 'Failed to fetch complaints')
  }
}

// ─────────────────────────────────────────
// @desc    Get single complaint by ID
// @route   GET /api/complaints/:id
// @access  All roles (own complaint for customer)
// ─────────────────────────────────────────
export const getComplaintById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('assignedAgent', 'name email')
      .populate('messages.sender', 'name role')

    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    // Customer can only view own complaints
    if (
      req.user?.role === 'customer' &&
      complaint.customer._id.toString() !== req.user._id.toString()
    ) {
      sendError(res, 'Not authorized to view this complaint', 403)
      return
    }

    sendSuccess(res, { complaint })
  } catch (error) {
    console.error('Get complaint error:', error)
    sendError(res, 'Failed to fetch complaint')
  }
}

// ─────────────────────────────────────────
// @desc    Update complaint status
// @route   PATCH /api/complaints/:id/status
// @access  Agent, Admin
// ─────────────────────────────────────────
export const updateComplaintStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const parsed = updateStatusSchema.safeParse(req.body)
    if (!parsed.success) {
      sendError(res, 'Invalid status', 400, parsed.error.flatten().fieldErrors)
      return
    }

    const { status } = parsed.data

    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    const previousStatus = complaint.status
    complaint.status = status

    if (status === 'resolved') complaint.resolvedAt = new Date()
    if (status === 'closed') complaint.closedAt = new Date()

    await complaint.save()

    // Notify everyone in complaint room
    notifyComplaintRoom(req.params.id, 'complaint:status_changed', {
      complaintId: req.params.id,
      status,
      updatedBy: req.user?.name,
    })

    // If escalated — notify admins
    if (status === 'escalated') {
      notifyAgents('complaint:escalated', {
        complaintId: req.params.id,
        message: 'A complaint has been escalated',
      })
    }
    // Audit log
    await AuditLog.create({
      action: 'status_updated',
      performedBy: req.user?._id,
      targetModel: 'Complaint',
      targetId: complaint._id,
      changes: { from: previousStatus, to: status },
    })

    sendSuccess(res, { complaint }, `Status updated to ${status}`)
  } catch (error) {
    console.error('Update status error:', error)
    sendError(res, 'Failed to update status')
  }
}

// ─────────────────────────────────────────
// @desc    Assign complaint to agent
// @route   PATCH /api/complaints/:id/assign
// @access  Admin only
// ─────────────────────────────────────────
export const assignComplaint = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { agentId } = req.body

    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId)) {
      sendError(res, 'Valid agent ID is required', 400)
      return
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedAgent: agentId,
        status: 'assigned',
      },
      { new: true }
    ).populate('assignedAgent', 'name email')

    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    await AuditLog.create({
      action: 'complaint_assigned',
      performedBy: req.user?._id,
      targetModel: 'Complaint',
      targetId: complaint._id,
      changes: { assignedTo: agentId },
    })

    sendSuccess(res, { complaint }, 'Complaint assigned successfully')
  } catch (error) {
    console.error('Assign complaint error:', error)
    sendError(res, 'Failed to assign complaint')
  }
}

// ─────────────────────────────────────────
// @desc    Add message to complaint thread
// @route   POST /api/complaints/:id/messages
// @access  All roles
// ─────────────────────────────────────────
export const addMessage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const parsed = addMessageSchema.safeParse(req.body)
    if (!parsed.success) {
      sendError(res, 'Validation failed', 400, parsed.error.flatten().fieldErrors)
      return
    }

    const { message, isInternal } = parsed.data

    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    // Customer can only message own complaint
    if (
      req.user?.role === 'customer' &&
      complaint.customer.toString() !== req.user._id.toString()
    ) {
      sendError(res, 'Not authorized', 403)
      return
    }

    complaint.messages.push({
      sender: req.user!._id,
      senderRole: req.user!.role as 'customer' | 'agent' | 'admin',
      message,
      isInternal: req.user?.role === 'customer' ? false : isInternal,
      createdAt: new Date(),
    })

    // Auto update status to in_progress when agent replies
    if (
      req.user?.role === 'agent' &&
      complaint.status === 'assigned'
    ) {
      complaint.status = 'in_progress'
    }

    await complaint.save()


    // Notify everyone in complaint room about new message
    notifyComplaintRoom(req.params.id, 'complaint:new_message', {
      complaintId: req.params.id,
      sender: req.user?.name,
      senderRole: req.user?.role,
      message,
    })

    sendSuccess(res, { complaint }, 'Message sent successfully')
  } catch (error) {
    console.error('Add message error:', error)
    sendError(res, 'Failed to send message')
  }
}

// ─────────────────────────────────────────
// @desc    Approve AI draft response
// @route   POST /api/complaints/:id/approve-draft
// @access  Agent, Admin
// ─────────────────────────────────────────
export const approveDraft = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const complaint = await Complaint.findById(req.params.id)
    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    if (!complaint.aiAnalysis?.draftResponse) {
      sendError(res, 'No AI draft available for this complaint', 400)
      return
    }

    // Add AI draft as agent message
    complaint.messages.push({
      sender: req.user!._id,
      senderRole: req.user!.role as 'agent' | 'admin',
      message: complaint.aiAnalysis.draftResponse,
      isInternal: false,
      createdAt: new Date(),
    })

    complaint.status = 'in_progress'
    await complaint.save()

    await AuditLog.create({
      action: 'ai_draft_approved',
      performedBy: req.user?._id,
      targetModel: 'Complaint',
      targetId: complaint._id,
    })

    sendSuccess(res, { complaint }, 'AI draft approved and sent to customer')
  } catch (error) {
    console.error('Approve draft error:', error)
    sendError(res, 'Failed to approve draft')
  }
}

// ─────────────────────────────────────────
// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Admin only
// ─────────────────────────────────────────
export const deleteComplaint = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id)
    if (!complaint) {
      sendError(res, 'Complaint not found', 404)
      return
    }

    await AuditLog.create({
      action: 'complaint_deleted',
      performedBy: req.user?._id,
      targetModel: 'Complaint',
      targetId: new mongoose.Types.ObjectId(req.params.id),
    })

    sendSuccess(res, null, 'Complaint deleted successfully')
  } catch (error) {
    console.error('Delete complaint error:', error)
    sendError(res, 'Failed to delete complaint')
  }
}