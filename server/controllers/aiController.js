import * as aiService from '../services/aiService.js';

export const getAiHealth = async (_req, res) => {
  const ai = await aiService.checkAiHealth();
  res.json({
    success: true,
    message: 'AI service connected',
    ai,
  });
};

export const analyze = async (req, res) => {
  const data = await aiService.analyzeComplaint(req.body);
  res.json({ success: true, data });
};

export const categorize = async (req, res) => {
  const data = await aiService.categorizeComplaint(req.body);
  res.json({ success: true, data });
};

export const sentiment = async (req, res) => {
  const data = await aiService.analyzeSentiment(req.body);
  res.json({ success: true, data });
};

export const priority = async (req, res) => {
  const data = await aiService.predictPriority(req.body);
  res.json({ success: true, data });
};

export const duplicates = async (req, res) => {
  const data = await aiService.findDuplicates(req.body);
  res.json({ success: true, data });
};

export const department = async (req, res) => {
  const data = await aiService.assignDepartment(req.body);
  res.json({ success: true, data });
};

export const response = async (req, res) => {
  const data = await aiService.generateResponse(req.body);
  res.json({ success: true, data });
};

export const analyticsSummary = async (req, res) => {
  const data = await aiService.analyticsSummary(req.body);
  res.json({ success: true, data });
};

export const indexComplaint = async (req, res) => {
  const data = await aiService.indexComplaint(req.body);
  res.json({ success: true, data });
};

export const ocr = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Image file is required' });
  }
  const data = await aiService.ocrImage(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype
  );
  res.json({ success: true, data });
};
