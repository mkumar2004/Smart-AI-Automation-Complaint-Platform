import { Router } from 'express'
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignComplaint,
  addMessage,
  approveDraft,
  deleteComplaint,
} from '../controllers/Complaint.controller'
import { protect } from '../middleware/auth'
import { authorize } from '../middleware/role'

const router = Router()

// All routes require authentication
router.use(protect)

// Customer + Agent + Admin
router.get('/', getComplaints)
router.get('/:id', getComplaintById)
router.post('/:id/messages', addMessage)

// Customer only
router.post('/', authorize('customer'), createComplaint)

// Agent + Admin
router.patch('/:id/status', authorize('agent', 'admin'), updateComplaintStatus)
router.post('/:id/approve-draft', authorize('agent', 'admin'), approveDraft)

// Admin only
router.patch('/:id/assign', authorize('admin'), assignComplaint)
router.delete('/:id', authorize('admin'), deleteComplaint)

export default router