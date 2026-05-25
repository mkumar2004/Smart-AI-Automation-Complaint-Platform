import { Router } from 'express';
import multer from 'multer';
import * as aiController from '../controllers/aiController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { body } from 'express-validator';
import {
  analyticsBodyRules,
  complaintBodyRules,
  responseBodyRules,
  validate,
} from '../middleware/validate.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype?.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image uploads are allowed'));
  },
});

router.get('/health', asyncHandler(aiController.getAiHealth));

router.post('/analyze', complaintBodyRules, validate, asyncHandler(aiController.analyze));
router.post('/categorize', complaintBodyRules, validate, asyncHandler(aiController.categorize));
router.post('/sentiment', complaintBodyRules, validate, asyncHandler(aiController.sentiment));
router.post('/priority', complaintBodyRules, validate, asyncHandler(aiController.priority));
router.post('/duplicates', complaintBodyRules, validate, asyncHandler(aiController.duplicates));
router.post('/department', complaintBodyRules, validate, asyncHandler(aiController.department));
router.post(
  '/index',
  [
    body('complaint_id').trim().notEmpty().withMessage('complaint_id is required'),
    ...complaintBodyRules,
  ],
  validate,
  asyncHandler(aiController.indexComplaint)
);
router.post('/response', responseBodyRules, validate, asyncHandler(aiController.response));
router.post('/analytics/summary', analyticsBodyRules, validate, asyncHandler(aiController.analyticsSummary));
router.post('/ocr', upload.single('file'), asyncHandler(aiController.ocr));

export default router;
