import os
from typing import Any

from langchain_community.vectorstores import Chroma

from config.settings import settings
from utils.llm import get_embeddings


class DuplicateVectorStore:
    """Embedding-based duplicate complaint detection."""

    COLLECTION = "complaints"

    def __init__(self) -> None:
        os.makedirs(settings.chroma_persist_dir, exist_ok=True)
        self._store = Chroma(
            collection_name=self.COLLECTION,
            embedding_function=get_embeddings(),
            persist_directory=settings.chroma_persist_dir,
        )

    def find_duplicates(
        self,
        text: str,
        organization_id: str,
        exclude_id: str | None = None,
        k: int = 5,
    ) -> list[dict[str, Any]]:
        filter_meta = {"organization_id": organization_id}
        results = self._store.similarity_search_with_score(text, k=k, filter=filter_meta)

        duplicates = []
        for doc, score in results:
            if exclude_id and doc.metadata.get("complaint_id") == exclude_id:
                continue
            similarity = 1 - score
            if similarity >= settings.duplicate_similarity_threshold:
                duplicates.append(
                    {
                        "complaint_id": doc.metadata.get("complaint_id"),
                        "similarity": round(similarity, 4),
                        "snippet": doc.page_content[:200],
                    }
                )
        return duplicates

    def index_complaint(
        self,
        complaint_id: str,
        organization_id: str,
        title: str,
        description: str,
    ) -> None:
        text = f"{title}\n{description}".strip()
        self._store.add_texts(
            texts=[text],
            metadatas=[
                {
                    "complaint_id": complaint_id,
                    "organization_id": organization_id,
                }
            ],
            ids=[complaint_id],
        )
