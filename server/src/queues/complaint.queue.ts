// In-memory async queue (no Redis needed)
// Each job calls the AI service in the background

type Job = {
  complaintId: string
  title: string
  description: string
  category: string
}

type JobHandler = (job: Job) => Promise<void>

class ComplaintQueue {
  private handler: JobHandler | null = null

  // Register the worker function
  process(handler: JobHandler): void {
    this.handler = handler
  }

  // Add a job — fires async, doesn't block the request
  async add(job: Job): Promise<void> {
    if (!this.handler) {
      console.warn('⚠️  No queue handler registered')
      return
    }

    // Run async without blocking
    setImmediate(async () => {
      try {
        console.log(`📋 Queue: Processing complaint ${job.complaintId}`)
        await this.handler!(job)
        console.log(`✅ Queue: Done processing ${job.complaintId}`)
      } catch (error) {
        console.error(`❌ Queue: Failed processing ${job.complaintId}`, error)
      }
    })
  }
}

export const complaintQueue = new ComplaintQueue()