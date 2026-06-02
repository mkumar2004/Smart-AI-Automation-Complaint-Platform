import mongoose, { Document, Schema } from 'mongoose'

export interface IAuditLog extends Document {
  action: string
  performedBy: mongoose.Types.ObjectId
  targetModel: 'Complaint' | 'User' | 'Agent'
  targetId: mongoose.Types.ObjectId
  changes?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetModel: {
      type: String,
      enum: ['Complaint', 'User', 'Agent'],
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    changes: {
      type: Schema.Types.Mixed,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
)

AuditLogSchema.index({ performedBy: 1 })
AuditLogSchema.index({ targetId: 1 })
AuditLogSchema.index({ createdAt: -1 })

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema)