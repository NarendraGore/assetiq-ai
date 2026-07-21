# System Architecture

**Project Name:** AssetIQ AI  
**Project Type:** AI-Powered Inventory & Asset Management SaaS  
**Version:** 1.0.0  
**Document Type:** System Architecture Document (SAD)  
**Status:** Draft  
**Author:** Narendra Gore  
**Last Updated:** YYYY-MM-DD

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0.0 | YYYY-MM-DD | Narendra Gore | Initial System Architecture |

---

# Table of Contents

1. Introduction
2. Architecture Goals
3. Architecture Principles
4. High-Level Architecture
5. Logical Architecture
6. Physical Architecture
7. Component Architecture
8. Module Communication
9. Data Flow
10. Authentication Flow
11. AI Integration Architecture
12. Database Architecture
13. Security Architecture
14. Deployment Architecture
15. Logging & Monitoring
16. Scalability
17. Reliability
18. Future Architecture

---

# 1. Introduction

## Purpose

This document describes the overall architecture of AssetIQ AI. It explains how the various software components interact to provide a scalable, secure, maintainable, and AI-powered inventory and asset management platform.

This document serves as the architectural blueprint for the implementation team.

---

# 2. Architecture Goals

The architecture is designed to achieve the following goals:

- Scalability
- Maintainability
- Modularity
- Security
- Performance
- Testability
- Extensibility
- High Cohesion
- Low Coupling
- Separation of Concerns

---

# 3. Architecture Principles

The application follows the following architectural principles:

- Clean Architecture
- Layered Architecture
- SOLID Principles
- Dependency Injection
- Single Responsibility Principle
- Open/Closed Principle
- Separation of Concerns
- Domain-Centric Design
- API-First Development

---

# 4. High-Level Architecture

```
                    ┌──────────────────────┐
                    │      End User        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Next.js Client    │
                    │  (React + TypeScript)│
                    └──────────┬───────────┘
                               │
                        HTTPS / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │ ASP.NET Core Web API │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
     Application Layer   AI Integration   Infrastructure
             │                 │                 │
             ▼                 ▼                 ▼
      Domain Layer      Gemini/OpenRouter   PostgreSQL
```

---

# 5. Logical Architecture

The system consists of five logical layers.

```
Presentation Layer

↓

API Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer
```

## Presentation Layer

Responsibilities

- User Interface
- Forms
- Navigation
- Validation
- State Management

---

## API Layer

Responsibilities

- Authentication
- Authorization
- API Controllers
- Request Handling
- Response Generation

---

## Application Layer

Responsibilities

- Business Rules
- DTOs
- Use Cases
- Validation
- Mapping

---

## Domain Layer

Responsibilities

- Entities
- Value Objects
- Domain Rules
- Enumerations

---

## Infrastructure Layer

Responsibilities

- Database
- File Storage
- AI Providers
- External Services
- Logging

---

# 6. Physical Architecture

```
Browser

↓

Vercel

↓

Render

↓

Neon PostgreSQL

↓

Cloudinary

↓

Gemini API
```

Each component can be independently deployed and updated.

---

# 7. Component Architecture

## Frontend Components

- Authentication
- Dashboard
- Inventory
- Assets
- Employees
- Suppliers
- Warehouses
- Purchase Orders
- Reports
- AI Assistant
- Settings

---

## Backend Components

- Authentication Service
- User Service
- Inventory Service
- Asset Service
- Supplier Service
- Warehouse Service
- Purchase Service
- Document Service
- AI Service
- Notification Service

---

# 8. Module Communication

```
User

↓

Frontend

↓

REST API

↓

Controller

↓

Application Service

↓

Repository / DbContext

↓

PostgreSQL
```

Responses follow the reverse path.

---

# 9. Data Flow

Example

Create Product

```
User

↓

Fill Form

↓

Validate Input

↓

API Request

↓

Controller

↓

Application Service

↓

Validation

↓

Mapping

↓

Database

↓

Response

↓

Update UI
```

---

# 10. Authentication Flow

```
Login

↓

Validate Credentials

↓

Generate JWT

↓

Generate Refresh Token

↓

Return Tokens

↓

Store Securely

↓

Authenticated Requests

↓

Token Validation

↓

Access Granted
```

---

# 11. AI Integration Architecture

```
User Prompt

↓

Frontend

↓

AI Controller

↓

AI Service

↓

Prompt Builder

↓

Gemini API

↓

Response Formatter

↓

Frontend
```

Future AI providers can be added without changing the frontend.

---

# 12. Database Architecture

Primary Database

PostgreSQL

The database stores:

- Users
- Roles
- Products
- Categories
- Assets
- Warehouses
- Suppliers
- Employees
- Purchase Orders
- Documents
- Audit Logs

Entity Framework Core manages persistence.

---

# 13. Security Architecture

Authentication

- JWT

Authorization

- RBAC

Security Features

- Password Hashing
- HTTPS
- Input Validation
- Secure APIs
- Role-Based Policies
- Audit Logs

Future

- Rate Limiting
- Multi-Factor Authentication

---

# 14. Deployment Architecture

```
GitHub

↓

GitHub Actions (Future)

↓

Frontend

Vercel

↓

Backend

Render

↓

Database

Neon PostgreSQL

↓

Cloudinary

↓

Gemini API
```

---

# 15. Logging & Monitoring

Application Logging

- API Requests
- Errors
- Exceptions
- Authentication
- Business Events

Future Monitoring

- Health Checks
- Metrics
- Performance Monitoring

---

# 16. Scalability

The architecture supports:

- Additional modules
- Additional AI providers
- Background Jobs
- Distributed Caching
- Horizontal Scaling
- Multiple Databases
- Future Microservices

---

# 17. Reliability

The architecture provides:

- Exception Handling
- Validation
- Transaction Management
- Logging
- Consistent API Responses
- Error Recovery

---

# 18. Future Architecture

Future versions may include:

- CQRS
- MediatR
- Redis
- SignalR
- Docker
- Kubernetes
- Event-Driven Architecture
- Message Queue
- Multi-Tenant SaaS
- GraphQL
- Mobile Applications

---

# Architecture Summary

| Layer | Responsibility |
|---------|---------------|
| Presentation | User Interface |
| API | HTTP Communication |
| Application | Business Logic |
| Domain | Business Models |
| Infrastructure | Database & External Services |

---

# Architecture Characteristics

| Characteristic | Status |
|---------------|--------|
| Clean Architecture | ✔ |
| Layered Architecture | ✔ |
| Dependency Injection | ✔ |
| Modular Design | ✔ |
| REST API | ✔ |
| JWT Security | ✔ |
| AI Integration | ✔ |
| Scalable Design | ✔ |
| Cloud Ready | ✔ |
| Maintainable | ✔ |
| Testable | ✔ |
| Extensible | ✔ |

---

**End of Document**