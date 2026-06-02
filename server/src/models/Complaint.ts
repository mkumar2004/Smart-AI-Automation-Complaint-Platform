import mongoose, { Document, Schema } from 'mongoose'

export type ComplaintStatus =
  | 'pending'
  | 'ai_processing'
  | 'ai_processed'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'escalated'

export type ComplaintCategory =
  | 'billing'
  | 'technical'
  | 'delivery'
  | 'product_quality'
  | 'customer_service'
  | 'other'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export interface IMessage {
  sender: mongoose.Types.ObjectId
  senderRole: 'customer' | 'agent' | 'admin'
  message: string
  isInternal: boolean
  createdAt: Date
}

export interface IAIAnalysis {
  category: ComplaintCategory
  priority: Priority
  sentiment: 'positive' | 'neutral' | 'frustrated' | 'very_angry'
  sentimentScore: number
  confidence: number
  summary: string
  draftResponse: string
  processedAt: Date
}

export interface IComplaint extends Document {
  _id: mongoose.Types.ObjectId
  ticketId: string
  title: string
  description: string
  category: ComplaintCategory
  priority: Priority
  status: ComplaintStatus
  customer: mongoose.Types.ObjectId
  assignedAgent?: mongoose.Types.ObjectId
  aiAnalysis?: IAIAnalysis
  messages: IMessage[]
  attachments: string[]
  resolvedAt?: Date
  closedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderRole: {
      type: String,
      enum: ['customer', 'agent', 'admin'],
      required: true,
    },
    message: { type: String, required: true, trim: true },
    isInternal: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const AIAnalysisSchema = new Schema<IAIAnalysis>({
  category: { type: String, enum: ['billing', 'technical', 'delivery', 'product_quality', 'customer_service', 'other'] },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
  sentiment: { type: String, enum: ['positive', 'neutral', 'frustrated', 'very_angry'] },
  sentimentScore: { type: Number, min: 0, max: 1 },
  confidence: { type: Number, min: 0, max: 1 },
  summary: { type: String },
  draftResponse: { type: String },
  processedAt: { type: Date },
})

const ComplaintSchema = new Schema<IComplaint>(
  {
    ticketId: {
      type: String,
      
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description must be at least 20 characters'],
    },
    category: {
      type: String,
      enum: ['billing', 'technical', 'delivery', 'product_quality', 'customer_service', 'other'],
      default: 'other',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'ai_processing', 'ai_processed', 'assigned', 'in_progress', 'resolved', 'closed', 'escalated'],
      default: 'pending',
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedAgent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    aiAnalysis: AIAnalysisSchema,
    messages: [MessageSchema],
    attachments: [{ type: String }],
    resolvedAt: { type: Date },
    closedAt: { type: Date },
  },
  { timestamps: true }
)

// Auto-generate ticket ID before saving
ComplaintSchema.pre('save', async function (next) {
  if (!this.ticketId) {
    const count = await mongoose.model('Complaint').countDocuments()
    this.ticketId = `TK-${String(count + 1).padStart(4, '0')}`
  }
  next()
})

// Indexes for fast queries
ComplaintSchema.index({ customer: 1, status: 1 })
ComplaintSchema.index({ assignedAgent: 1, status: 1 })
ComplaintSchema.index({ ticketId: 1 })
ComplaintSchema.index({ priority: 1, status: 1 })

export default mongoose.model<IComplaint>('Complaint', ComplaintSchema)