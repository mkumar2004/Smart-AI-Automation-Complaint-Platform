export const AI_SERVICE_URL = (
  process.env.AI_SERVICE_URL || 'http://localhost:8000'
).replace(/\/$/, '');

export const AI_API_BASE = `${AI_SERVICE_URL}/api/v1`;
