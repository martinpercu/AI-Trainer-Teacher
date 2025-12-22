# RAG Backend Sample

This is a **standalone, production-ready example** of the RAG (Retrieval-Augmented Generation) system that powers the Trainer-Teacher chat interface.

## 🎯 What This Demonstrates

This FastAPI application showcases **four key RAG optimizations**:

1. **Dynamic Page Filtering** - Reduces irrelevant context by ~70% through section-specific search
2. **History-Aware Retrieval** - LLM reformulates vague follow-ups using conversation history
3. **Streaming Responses** - Real-time token delivery via Server-Sent Events (SSE)
4. **Redis Session Persistence** - <10ms conversation history retrieval across sessions

## 📁 Files

```
backend-sample/
├── main.py              # FastAPI application with heavily commented code
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- OpenAI API key
- Pinecone account (free tier available)
- Redis instance (Upstash recommended for serverless)

### Installation

1. **Clone and navigate to this directory**
   ```bash
   cd backend-sample
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

5. **Prepare Pinecone index**
   - Create a Pinecone index named `ethic-teacher`
   - Dimension: `1536` (for OpenAI text-embedding-3-small)
   - Metric: `cosine`
   - Upload your vectorized documents with metadata:
     ```json
     {
       "source": "path/to/document.pdf",
       "page": 15,
       "text": "Document content..."
     }
     ```

6. **Run the server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   Server runs at: http://localhost:8000

## 🔌 API Endpoints

### POST `/stream_chat`

Stream RAG responses with context-aware retrieval.

**Request:**
```json
{
  "message": "What is informed consent?",
  "session_id": "user123_teacher456",
  "pages": [10, 11, 12, 13, 14, 15],
  "doc_path": "documents/ethics_course.pdf"
}
```

**Response:** Server-Sent Events stream of text chunks

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/stream_chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Explain business ethics",
    "session_id": "test_session",
    "pages": [1, 2, 3, 4, 5],
    "doc_path": "ethics.pdf"
  }'
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "RAG Educational Chat"
}
```

### DELETE `/session/{session_id}`

Clear conversation history for a session.

**Example:**
```bash
curl -X DELETE "http://localhost:8000/session/test_session"
```

## 🧠 How It Works

### 1. Dynamic Page Filtering

Instead of searching the entire document, we filter by current section pages:

```python
retriever = vector_store.as_retriever(
    search_kwargs={
        "k": 14,  # Top-14 most relevant chunks
        "filter": {
            "source": "ethics.pdf",
            "page": {"$in": [15, 16, 17, 18, 19, 20]}  # Section 3 only
        }
    }
)
```

**Impact:** When a student is in "Section 3" (pages 15-20), only those pages are searched instead of all 100 pages.

### 2. History-Aware Question Reformulation

```
User: "What is informed consent?"
AI: [responds with context]

User: "Can you give me an example?"
System reformulates internally to:
  "Can you give an example of informed consent in business ethics?"
[Then retrieves with full context]
```

This maintains conversation continuity across multi-turn interactions.

### 3. Streaming Architecture

```python
async for chunk in streaming_chain.astream({}):
    response_text += chunk
    yield chunk  # Stream to client immediately
```

Users see responses appear token-by-token (ChatGPT-style), improving perceived latency.

### 4. Redis Session Persistence

```python
# Save to Redis with session key
redis_client.set(
    f"chat_history:{user123_teacher456}",
    json.dumps(messages)
)

# Retrieve in <10ms
history = redis_client.get(f"chat_history:{user123_teacher456}")
```

Conversations survive page reloads, navigation, and server restarts.

## 🏗️ Architecture Flow

```
1. User sends question + session_id + pages filter
2. Load conversation history from Redis
3. LLM reformulates question using history context
4. Vector search with page filtering (k=14, pages=[...])
5. Retrieve relevant document chunks
6. Stream LLM response token-by-token
7. Save updated conversation to Redis
```

## 📊 Performance Characteristics

- **Context noise reduction:** Estimated ~70% via page filtering (compared to full-document search)
- **Session retrieval:** Redis provides sub-10ms latency for typical chat history sizes
- **Response delivery:** Token-by-token streaming reduces perceived latency vs. buffered responses
- **Scalability:** Stateless API design allows horizontal scaling; Redis handles concurrent sessions efficiently

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_KEY` | OpenAI API key for embeddings & LLM | `sk-proj-...` |
| `PINECONE_API` | Pinecone API key for vector store | `xxxxxxxx-xxxx-...` |
| `REDIS_URL` | Redis connection URL (Upstash format) | `rediss://default:...` |

## 🛠️ Tech Stack

- **API Framework:** FastAPI (async, high-performance)
- **LLM Integration:** LangChain with OpenAI GPT-4o-mini
- **Vector Store:** Pinecone (managed vector database)
- **Embeddings:** OpenAI text-embedding-3-small (1536 dimensions)
- **Session Storage:** Redis (Upstash recommended)
- **Message History:** LangChain's `ChatMessageHistory`

## 📝 Notes

- This sample uses **real production code** with enhanced documentation
- The main application has additional features (PDF ingestion, multi-document support, analytics)
- For full implementation details, contact the repository owner

## 🤝 Testing

**Test with a simple Python client:**

```python
import requests
import json

response = requests.post(
    "http://localhost:8000/stream_chat",
    json={
        "message": "What is business ethics?",
        "session_id": "test_session",
        "pages": [1, 2, 3, 4, 5],
        "doc_path": "ethics.pdf"
    },
    stream=True
)

for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
    if chunk:
        print(chunk, end='', flush=True)
```

## 📖 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain RAG Tutorial](https://python.langchain.com/docs/tutorials/rag/)
- [Pinecone Quickstart](https://docs.pinecone.io/guides/get-started/quickstart)
- [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted)

---

**Built with production-grade RAG patterns for educational AI applications**
