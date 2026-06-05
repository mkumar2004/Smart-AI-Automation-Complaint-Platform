SENTIMENT_PROMPT = """
You are an expert at analyzing customer emotion and sentiment.

Analyze the sentiment of this customer complaint:

Title: {title}
Description: {description}

You MUST respond with ONLY a valid JSON object, no extra text, no markdown:

{{
  "sentiment": "one of: positive, neutral, frustrated, very_angry",
  "sentimentScore": 0.0 to 1.0,
  "urgencyLevel": "one of: low, medium, high, critical"
}}

Rules for sentiment:
- positive: customer is polite, understanding
- neutral: factual complaint, no strong emotion
- frustrated: clearly annoyed, repeated issues mentioned
- very_angry: aggressive language, threats, ALL CAPS, multiple exclamation marks

Rules for urgencyLevel:
- critical: financial loss, safety issue, service completely broken
- high: major inconvenience, time-sensitive
- medium: moderate issue, needs attention
- low: minor issue, suggestion

sentimentScore: 0.0 = very positive, 1.0 = extremely angry

Respond ONLY with the JSON. No explanation. No markdown.
"""