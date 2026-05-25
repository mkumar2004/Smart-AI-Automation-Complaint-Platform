import { AI_API_BASE, AI_SERVICE_URL } from '../config/ai.js';

class AiServiceError extends Error {
  constructor(message, statusCode = 502, details = null) {
    super(message);
    this.name = 'AiServiceError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function aiRequest(path, options = {}) {
  const url = `${AI_API_BASE}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 120000);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }
    }

    if (!res.ok) {
      const detail = data?.detail ?? data?.message ?? text;
      throw new AiServiceError(
        typeof detail === 'string' ? detail : 'AI service request failed',
        res.status,
        data
      );
    }

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new AiServiceError('AI service request timed out', 504);
    }
    if (err instanceof AiServiceError) throw err;
    throw new AiServiceError(
      `Cannot reach AI service at ${AI_SERVICE_URL}. Start it with: npm run dev:ai`,
      503,
      err.message
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkAiHealth() {
  return aiRequest('/health', { method: 'GET' });
}

export async function analyzeComplaint(body) {
  return aiRequest('/analyze', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function categorizeComplaint(body) {
  return aiRequest('/categorize', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function analyzeSentiment(body) {
  return aiRequest('/sentiment', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function predictPriority(body) {
  return aiRequest('/priority', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function findDuplicates(body) {
  return aiRequest('/duplicates', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function assignDepartment(body) {
  return aiRequest('/department', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function generateResponse(body) {
  return aiRequest('/response', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function analyticsSummary(body) {
  return aiRequest('/analytics/summary', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function indexComplaint(body) {
  return aiRequest('/index', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function ocrImage(buffer, filename, mimeType) {
  const form = new FormData();
  const blob = new Blob([buffer], { type: mimeType || 'image/png' });
  form.append('file', blob, filename || 'upload.png');

  const url = `${AI_API_BASE}/ocr`;
  const res = await fetch(url, { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const detail = data?.detail ?? 'OCR failed';
    throw new AiServiceError(
      typeof detail === 'string' ? detail : JSON.stringify(detail),
      res.status,
      data
    );
  }
  return data;
}

export { AiServiceError };
