import axios from 'axios'
import { env } from '../config/env'
import Complaint, { IAIAnalysis } from '../models/Complaint'
import { complaintQueue } from '../queues/complaint.queue'

interface AIResponse {
  category: string
  priority: string
  sentiment: string
  sentimentScore: number
  confidence: number
  summary: string
  draftResponse: string
}

// Call the Python AI service
const analyzeWithAI = async (
  title: string,
  description: string,
  category: string
): Promise<AIResponse> => {
  try {
    const response = await axios.post(
      `${env.AI_SERVICE_URL}/analyze`,
      { title, description, category },
      { timeout: 30000 }
    )
    return response.data
  } catch (error) {
    // Fallback if AI service is down
    console.warn('⚠️  AI service unavailable, using fallback analysis')
    return {
      category: category || 'other',
      priority: 'medium',
      sentiment: 'neutral',
      sentimentScore: 0.5,
      confidence: 0.5,
      summary: 'AI service unavailable. Manual review required.',
      draftResponse:
        'Thank you for reaching out. We have received your complaint and will get back to you shortly.',
    }
  }
}

// Process one complaint through AI
export const processComplaintWithAI = async (
  complaintId: string,
  title: string,
  description: string,
  category: string
): Promise<void> => {
  try {
    // Mark as processing
    await Complaint.findByIdAndUpdate(complaintId, {
      status: 'ai_processing',
    })

    // Call AI
    const aiResult = await analyzeWithAI(title, description, category)

    // Save AI analysis back to complaint
    const aiAnalysis: IAIAnalysis = {
      category: aiResult.category as IAIAnalysis['category'],
      priority: aiResult.priority as IAIAnalysis['priority'],
      sentiment: aiResult.sentiment as IAIAnalysis['sentiment'],
      sentimentScore: aiResult.sentimentScore,
      confidence: aiResult.confidence,
      summary: aiResult.summary,
      draftResponse: aiResult.draftResponse,
      processedAt: new Date(),
    }

    await Complaint.findByIdAndUpdate(complaintId, {
      status: 'ai_processed',
      aiAnalysis,
      priority: aiResult.priority,
      category: aiResult.category,
    })

    console.log(`🤖 AI processed complaint ${complaintId}`)
  } catch (error) {
    console.error(`❌ AI processing failed for ${complaintId}:`, error)
    // Reset to pending if AI fails
    await Complaint.findByIdAndUpdate(complaintId, {
      status: 'pending',
    })
  }
}

// Register queue worker
export const initAIWorker = (): void => {
  complaintQueue.process(async (job) => {
    await processComplaintWithAI(
      job.complaintId,
      job.title,
      job.description,
      job.category
    )
  })
  console.log('✅ AI worker initialized')
}