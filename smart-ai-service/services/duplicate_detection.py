from utils.vector_store import DuplicateVectorStore


def check_duplicates(
    complaint_id: str | None,
    organization_id: str,
    title: str,
    description: str,
) -> list[dict]:
    store = DuplicateVectorStore()
    text = f"{title}\n{description}".strip()
    return store.find_duplicates(
        text=text,
        organization_id=organization_id,
        exclude_id=complaint_id,
    )


def index_complaint(
    complaint_id: str,
    organization_id: str,
    title: str,
    description: str,
) -> None:
    store = DuplicateVectorStore()
    store.index_complaint(complaint_id, organization_id, title, description)
