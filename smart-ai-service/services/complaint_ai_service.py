from chains.classify_chain import run_classify_chain
from chains.sentiment_chain import run_sentiment_chain
from chains.response_chain import run_response_chain


URGENCY_TO_PRIORITY = {
    "critical": "critical",
    "high": "high",
    "medium": "medium",
    "low": "low",
}


async def analyze_complaint(
    title: str,
    description: str,
    category: str = "other",
) -> dict:
    """
    Runs all 3 LangChain chains in sequence:
    1. Classify complaint type
    2. Analyze sentiment + urgency
    3. Generate draft response
    """

    print(f"🤖 Analyzing complaint: {title[:50]}...")

    # Step 1 — Classify
    classification = run_classify_chain(title, description)
    detected_category = classification.get("category", category)
    confidence = classification.get("confidence", 0.5)

    print(f"   ✅ Category: {detected_category} (confidence: {confidence})")

    # Step 2 — Sentiment
    sentiment_result = run_sentiment_chain(title, description)
    sentiment = sentiment_result.get("sentiment", "neutral")
    sentiment_score = sentiment_result.get("sentimentScore", 0.5)
    urgency = sentiment_result.get("urgencyLevel", "medium")
    priority = URGENCY_TO_PRIORITY.get(urgency, "medium")

    print(f"   ✅ Sentiment: {sentiment} | Priority: {priority}")

    # Step 3 — Draft response
    draft_response = run_response_chain(
        title=title,
        description=description,
        category=detected_category,
        sentiment=sentiment,
        priority=priority,
    )

    print(f"   ✅ Draft response generated ({len(draft_response)} chars)")

    return {
        "category": detected_category,
        "priority": priority,
        "sentiment": sentiment,
        "sentimentScore": sentiment_score,
        "confidence": confidence,
        "summary": f"{detected_category.replace('_', ' ').title()} issue with {sentiment} sentiment. Priority: {priority}.",
        "draftResponse": draft_response,
    }