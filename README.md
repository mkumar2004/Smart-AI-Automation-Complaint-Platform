# Smart AI Automation Complaint Platform

## Quick start (run both frontend + backend)

From the **project root**:

```bash
npm install
npm run install:all
```

Copy env files (first time only):

```bash
copy server\.env.example server\.env
copy client\.env.local.example client\.env.local
```

### AI service (Python + LangChain) — first time

From project root (installs venv + dependencies):

```bash
npm run setup:ai
```

Set `OPENAI_API_KEY` in `smart-ai-service/.env`.

**If `npm run dev` fails:**

| Error | Fix |
|-------|-----|
| `No module named uvicorn` | Run `npm run setup:ai` |
| `EADDRINUSE :::5000` | Run `npm run kill-ports` then `npm run dev` again |

Start **client, server, and AI together**:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| AI service (Python) | http://localhost:8000 |
| AI docs | http://localhost:8000/docs |
| API health | http://localhost:5000/api/health |
| AI via API (proxy) | http://localhost:5000/api/ai/analyze |

### AI routes on main server (`/api/ai/*`)

The Node server proxies to the Python AI service:

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/ai/health` | Check AI service connection |
| POST | `/api/ai/analyze` | Full LangChain pipeline |
| POST | `/api/ai/categorize` | Category only |
| POST | `/api/ai/sentiment` | Sentiment only |
| POST | `/api/ai/priority` | Priority only |
| POST | `/api/ai/duplicates` | Duplicate detection |
| POST | `/api/ai/department` | Department assignment |
| POST | `/api/ai/response` | Draft response |
| POST | `/api/ai/analytics/summary` | Dashboard summary |
| POST | `/api/ai/ocr` | Image OCR (multipart `file`) |

## Run separately (optional)

```bash
npm run dev:server   # API only
npm run dev:client   # Next.js only
npm run dev:ai       # Python LangChain service only
```

See [smart-ai-service/README.md](./smart-ai-service/README.md) for the AI module layout.

Project layout: `client/` · `server/` · `smart-ai-service/` (Python LangChain)

## Setup per folder

### Server (Node.js + Express)

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

### Client (Next.js)

```bash
cd client
copy .env.local.example .env.local
npm install
npm run dev
```
