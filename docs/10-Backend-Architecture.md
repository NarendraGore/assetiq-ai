# Backend Architecture

> **Note:** This document describes the backend architecture for **AssetIQ AI** using a **Layered (N-Tier) Service-Based Architecture**.

## Project Information

| Item | Value |
|---|---|
| Project | AssetIQ AI |
| Backend | ASP.NET Core 9/10 Web API |
| Language | C# |
| Architecture | Layered (N-Tier) Service-Based Architecture |
| Database | PostgreSQL |
| ORM | Entity Framework Core |
| Mapping | Mapster |
| Validation | FluentValidation |

---

# 1. Architecture Overview

```text
Next.js Client
      │
Authentication Middleware
      │
Authorization Middleware
      │
Controllers
      │
FluentValidation
      │
Services
      │
Repositories
      │
Entity Framework Core
      │
PostgreSQL
```

---

# 2. Solution Structure

```text
AssetIQAI.sln

src/
├── AssetIQAI.API
├── AssetIQAI.Domain
└── AssetIQAI.Infrastructure

tests/
├── AssetIQAI.UnitTests
└── AssetIQAI.IntegrationTests
```

---

# 3. Project Structure

```text
AssetIQAI.API
├── Controllers
├── Services
│   ├── Interfaces
│   └── Implementations
├── DTOs
├── Validators
├── Mapping
├── Middlewares
├── Extensions
├── Helpers
├── Common
├── Configurations
└── Program.cs

AssetIQAI.Domain
├── Entities
├── Enums
├── Constants
├── Exceptions
└── ValueObjects

AssetIQAI.Infrastructure
├── Persistence
│   ├── ApplicationDbContext.cs
│   ├── Configurations
│   └── Migrations
├── Repositories
│   ├── Interfaces
│   └── Implementations
├── AI
├── Email
├── Storage
├── Identity
├── Logging
└── DependencyInjection.cs
```

---

# 4. Layer Responsibilities

## Controllers
- Handle HTTP requests/responses
- Call services only
- No business logic
- No DbContext access

## Services
- Business rules
- Validation orchestration
- DTO mapping
- Repository coordination
- AI integration
- Email & storage integration
- Cache management

## Repositories
- CRUD
- Search/filter/sort
- Pagination
- Includes
- Database access only
- No business logic

## Infrastructure
- EF Core
- PostgreSQL
- AI
- Logging
- Cloudinary
- Identity

---

# 5. Request Flow

```text
Client
  │
Exception Middleware
  │
Authentication
  │
Authorization
  │
Controller
  │
FluentValidation
  │
Service
  │
Repository
  │
Entity Framework Core
  │
PostgreSQL
  │
Mapster
  │
Standard API Response
```

---

# 6. Dependency Injection

```text
Controller
   │
IProductService
   │
ProductService
   │
IProductRepository
   │
ProductRepository
```

Register services using extension methods.

---

# 7. Standard API Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "errors": null,
  "timestamp": "2026-07-21T12:00:00Z"
}
```

---

# 8. Security

- HTTPS
- JWT + Refresh Tokens
- BCrypt Password Hashing
- Role-Based Authorization
- Input Validation
- SQL Injection Protection (EF Core)
- XSS Protection
- CORS
- Rate Limiting
- Secure configuration via environment variables

---

# 9. Third-Party Libraries

| Library | Purpose |
|---|---|
| Entity Framework Core | ORM |
| Npgsql | PostgreSQL |
| Mapster | Mapping |
| FluentValidation | Validation |
| Serilog | Logging |
| Swashbuckle | Swagger |
| Asp.Versioning | API Versioning |
| Polly | Resilience |
| CloudinaryDotNet | Storage |

---

# 10. Design Patterns

- Layered (N-Tier) Architecture
- Service Pattern
- Repository Pattern
- Dependency Injection
- Factory Pattern
- Strategy Pattern
- Options Pattern
- Result Pattern

---

# Summary

This backend follows a layered service-based architecture where controllers manage HTTP concerns, services contain business logic, repositories handle persistence, and Infrastructure encapsulates external dependencies such as EF Core, AI, storage, and logging. The architecture is modular, testable, and suitable for a production-style portfolio project.
