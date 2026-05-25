# Smart AI Service (Python + LangChain)

Standalone AI microservice for **Smart AI Automation Complaint Platform**.  
Sits next to `client/` and `server/` — not inside the Node backend.

## Folder structure

```txt
smart-ai-service/
├── main.py                 # FastAPI entry
├── requirements.txt
├── .env.example
├── config/                 # Settings & env
├── prompts/                # LangChain prompt templates
├── chains/                 # LangChain chains (structured output)
├── services/               # Feature modules
│   ├── categorization.py
│   ├── sentiment.py
│   ├── priority.py
│   ├── department_assignment.py
│   ├── response_generator.py
│   ├── duplicate_detection.py
│   ├── analytics.py
│   ├── ocr.py
│   └── pipeline.py         # Full analyze workflow
├── utils/                  # LLM, embeddings, Chroma vector store
└── api/                    # REST routes & schemas
```

## Setup

From project root:

```bash
npm run setup:ai
```

Or manually:

```bash
cd smart-ai-service
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env
```

Set `OPENAI_API_KEY` in `.env`.

## Run

```bash
npm run dev:ai
```

| Endpoint | Description |
|----------|-------------|
| http://localhost:8000/docs | Swagger UI |
| POST `/api/v1/analyze` | Full AI pipeline |
| POST `/api/v1/duplicates` | Embedding duplicate check |
| POST `/api/v1/response` | AI-generated reply draft |
| POST `/api/v1/ocr` | Image text extraction |

## Node server integration

In `server/.env`:

```env
AI_SERVICE_URL=http://localhost:8000
```

Express proxies AI calls at `/api/ai/*` to this service.
