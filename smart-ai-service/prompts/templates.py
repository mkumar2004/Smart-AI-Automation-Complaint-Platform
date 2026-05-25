CATEGORIZATION_PROMPT = """Classify this complaint into exactly one category.
Categories: billing, technical, service_quality, delivery, account, safety, other.

Complaint title: {title}
Complaint description: {description}

Return only the category slug."""

SENTIMENT_PROMPT = """Analyze sentiment of this complaint.
Return JSON with keys: label (positive|neutral|negative), score (-1 to 1), summary (one sentence).

Title: {title}
Description: {description}"""

PRIORITY_PROMPT = """Predict complaint priority: low, medium, high, or critical.
Consider urgency, safety risk, and customer impact.

Title: {title}
Description: {description}
Category: {category}
Sentiment: {sentiment}"""

DEPARTMENT_PROMPT = """Assign the best department from this list: {departments}.
Return JSON: {{"department": "slug", "confidence": 0-1, "reason": "brief"}}

Title: {title}
Description: {description}
Category: {category}"""

RESPONSE_PROMPT = """Draft a professional, empathetic customer response for staff to review.
Keep it under 120 words. Do not admit legal liability.

Title: {title}
Description: {description}
Status: {status}
Category: {category}"""

ANALYTICS_SUMMARY_PROMPT = """Summarize complaint analytics for an admin dashboard in 3-5 bullet points.
Data: {stats_json}"""
