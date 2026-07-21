# AI Architecture

## Project Information

| Item | Value |
|---|---|
| Project | AssetIQ AI |
| AI Provider | Google Gemini |
| Integration | Service-Based |
| Framework | ASP.NET Core Web API |
| Frontend | Next.js |

---

# 1. Purpose

The AI module provides intelligent assistance for inventory and asset management while keeping business logic isolated behind an `IAIService`.

# 2. AI Features

- AI Chat Assistant
- Product description generation
- Inventory insights
- Dashboard summaries
- Smart recommendations
- Report summarization

# 3. High-Level Architecture

```text
Next.js Client
      │
 AI Chat Screen
      │
 AIController
      │
 IAIService
      │
 Prompt Builder
      │
 Gemini API
      │
 Response Parser
      │
 Client
```

# 4. Components

- AIController
- IAIService
- AIService
- PromptBuilder
- GeminiClient
- ResponseParser

# 5. Folder Structure

```text
AI/
├── Interfaces/
│   └── IAIService.cs
├── Services/
│   └── AIService.cs
├── Prompts/
├── Models/
├── Providers/
│   └── GeminiProvider.cs
└── ResponseParser.cs
```

# 6. Request Flow

```text
User
 ↓
Frontend
 ↓
POST /api/v1/ai/chat
 ↓
AIController
 ↓
AIService
 ↓
Prompt Builder
 ↓
Gemini API
 ↓
Response Parser
 ↓
API Response
```

# 7. Prompt Engineering

Principles:
- Clear instructions
- Domain-specific context
- Structured output
- Limit hallucinations
- Return Markdown where appropriate

Example template:

```text
You are an inventory management assistant.
Answer using concise business language.
```

# 8. AI Service Responsibilities

- Build prompts
- Call provider
- Validate input
- Handle retries
- Parse responses
- Log requests
- Return standardized results

# 9. Configuration

```json
{
  "Gemini": {
    "ApiKey": "...",
    "Model": "gemini-2.5-flash"
  }
}
```

# 10. Security

- API key stored in environment variables
- Never expose keys to frontend
- Validate prompt length
- Sanitize user input
- Rate limit endpoints

# 11. Error Handling

- Invalid prompt
- Timeout
- Provider unavailable
- Rate limit exceeded

Return a standard API response.

# 12. Caching

Optional:
- Cache repeated prompts
- Cache dashboard summaries
- Redis for distributed deployments

# 13. Logging

Log:
- Request ID
- Execution time
- Token usage (if available)
- Errors

Never log secrets.

# 14. Performance

- Async/await
- HTTP client reuse
- Prompt optimization
- Response caching

# 15. Future Enhancements

- Multi-provider support
- Streaming responses
- RAG
- Vector database
- Image understanding
- Function calling

# 16. Third-Party Libraries

| Library | Purpose |
|---|---|
| Google Gemini SDK | AI |
| Polly | Retry |
| Serilog | Logging |
| Mapster | Mapping |

# Summary

The AI architecture isolates all AI functionality behind a dedicated service layer. Controllers communicate only with `IAIService`, enabling provider replacement, centralized prompt management, secure API key handling, and scalable AI features without impacting the rest of the application.
