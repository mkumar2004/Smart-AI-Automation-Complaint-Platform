const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Request failed');
  }
  return json;
}

export type ComplaintAnalyzeInput = {
  title: string;
  description: string;
  organization_id?: string;
  complaint_id?: string;
  departments?: string[];
};

export const aiApi = {
  health: () => request<{ success: boolean; ai: unknown }>('/ai/health'),
  analyze: (body: ComplaintAnalyzeInput) =>
    request<{ success: boolean; data: Record<string, unknown> }>('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

export { API_URL };
