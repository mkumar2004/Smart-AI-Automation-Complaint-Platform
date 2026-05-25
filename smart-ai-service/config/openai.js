import OpenAI from 'openai';

let client = null;

export const getOpenAIClient = () => {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    client = new OpenAI({ apiKey });
  }
  return client;
};
