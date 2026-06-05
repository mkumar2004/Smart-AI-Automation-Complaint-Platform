CLASSIFY_PROMPT = """
You are an expert complaint classification system.

Analyze the following customer complaint and classify it.

Complaint Title: {title}
Complaint Description: {description}

You MUST respond with ONLY a valid JSON object, no extra text, no markdown:

{{
  "category": "one of: billing, technical, delivery, product_quality, customer_service, other",
  "confidence": 0.0 to 1.0
}}

Rules:
- billing: payment issues, refunds, overcharging, invoice problems
- technical: app bugs, website errors, login issues, system failures
- delivery: late delivery, missing package, wrong item delivered
- product_quality: damaged product, defective item, quality issues
- customer_service: rude staff, no response, poor support experience
- other: anything that doesn't fit above categories

Respond ONLY with the JSON. No explanation. No markdown.
"""