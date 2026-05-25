import { Router } from 'express';
import aiRoutes from './ai.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Smart AI Automation Complaint Platform API is running',
    services: {
      api: true,
      ai: process.env.AI_SERVICE_URL || 'http://localhost:8000',
    },
  });
});

router.use('/ai', aiRoutes);

export default router;
