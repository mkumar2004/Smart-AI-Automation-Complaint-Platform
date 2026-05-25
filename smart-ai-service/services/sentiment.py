from chains.analysis_chain import run_structured_analysis


def analyze_sentiment(title: str, description: str) -> dict:
    result = run_structured_analysis(title, description)
    return result.model_dump()
