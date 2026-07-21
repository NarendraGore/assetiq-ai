# Coding Standards

**Project:** AssetIQ AI

**Version:** 1.0.0

**Architecture:** Layered (N-Tier) Service-Based Architecture

---

# Table of Contents

1. Introduction
2. General Principles
3. Naming Conventions
4. Folder Structure Standards
5. File Naming Standards
6. TypeScript Standards
7. React Standards
8. Next.js Standards
9. Tailwind CSS Standards
10. shadcn/ui Standards
11. C# Standards
12. ASP.NET Core Standards
13. Service Layer Standards
14. Repository Standards
15. Entity Framework Standards
16. DTO Standards
17. Mapster Standards
18. Validation Standards
19. Exception Handling
20. Logging Standards
21. API Standards
22. Security Standards
23. Performance Guidelines
24. Git Standards
25. Code Review Checklist
26. Documentation Standards
27. Testing Standards
28. Tools & Extensions
29. Summary

---

# 1. Introduction

This document defines the coding standards followed throughout the AssetIQ AI project.

Goals:

- Consistency
- Readability
- Maintainability
- Scalability
- Testability

---

# 2. General Principles

Always follow:

- SOLID
- DRY
- KISS
- YAGNI
- Separation of Concerns
- Dependency Injection
- Composition over Inheritance

---

# 3. Naming Conventions

## Classes

```csharp
ProductService
InventoryRepository
UserController
```

## Interfaces

```csharp
IProductService
IInventoryRepository
```

## Methods

```csharp
CreateProductAsync()
GetProductByIdAsync()
UpdateProfileAsync()
```

## Variables

```csharp
product
inventoryItem
userId
```

## Constants

```csharp
MaxFileSize
DefaultPageSize
```

---

# 4. Folder Structure

```
Controllers/
Services/
Repositories/
DTOs/
Validators/
Mappings/
Entities/
Middlewares/
Configurations/
Extensions/
Helpers/
```

Every feature should follow the same organization.

---

# 5. File Naming

Good examples

```
ProductController.cs
ProductService.cs
CreateProductRequest.cs
ProductResponse.cs
ProductValidator.cs
```

Avoid

```
abc.cs
helper.cs
test.cs
```

---

# 6. TypeScript Standards

- Enable strict mode
- Avoid any
- Prefer interfaces
- Use readonly where possible
- Prefer enums only when required
- Keep functions small

Example

```ts
interface Product {
    id: string;
    name: string;
}
```

---

# 7. React Standards

- Functional Components only
- Hooks instead of class components
- Keep components under 250 lines
- Move business logic into hooks
- Prefer composition

Example

```
components/
features/
hooks/
```

---

# 8. Next.js Standards

- Use App Router
- Use Server Components where appropriate
- Use Client Components only when needed
- Route groups for organization
- Use loading.tsx and error.tsx

---

# 9. Tailwind CSS

Use utility classes.

Avoid custom CSS unless necessary.

Prefer

```
flex
grid
gap
space
rounded
shadow
```

Don't use inline styles.

---

# 10. shadcn/ui

Always customize using Tailwind.

Never modify library source files.

Reuse components.

---

# 11. C# Standards

- Nullable Reference Types enabled
- Async/Await everywhere
- Use var only when obvious
- Use expression-bodied members sparingly
- One class per file

Example

```csharp
public async Task<ProductResponse> GetByIdAsync(Guid id)
```

---

# 12. ASP.NET Core Standards

Controllers should:

- Validate requests
- Call Services only
- Never access DbContext
- Never call Repository directly

---

# 13. Service Layer

Responsibilities

- Business Logic
- Transactions
- Validation
- AI Integration
- Email
- File Storage

Services must never return Entity objects.

Return DTOs.

---

# 14. Repository Standards

Repositories should

- CRUD
- Pagination
- Search
- Filtering
- Sorting

Repositories must never

- Send Emails
- Call AI
- Contain Business Rules

---

# 15. Entity Framework

Use

- Fluent API
- Async Queries
- Projection
- Include only when required

Avoid

```csharp
ToList()
```

when pagination is required.

---

# 16. DTO Standards

Separate DTOs

```
CreateProductRequest

UpdateProductRequest

ProductResponse
```

Never expose Entity objects.

---

# 17. Mapster

Map

```
Entity → DTO

DTO → Entity

Request → Entity

Entity → Response
```

Never manually map large objects.

---

# 18. Validation

Use FluentValidation.

Never validate inside Controllers.

Example

```
CreateProductValidator
```

---

# 19. Exception Handling

Use Global Exception Middleware.

Never use

```
try
catch
```

inside Controllers unless necessary.

---

# 20. Logging

Use Serilog.

Log

- Errors
- Warnings
- Important Events

Never log

- Passwords
- Tokens
- Secrets

---

# 21. API Standards

Always return

```json
{
  "success": true,
  "message": "",
  "data": {},
  "errors": null
}
```

Use proper HTTP status codes.

---

# 22. Security

- JWT Authentication
- BCrypt Password Hashing
- HTTPS
- Environment Variables
- Input Validation
- Rate Limiting
- CORS

---

# 23. Performance

- Async/Await
- Pagination
- Projection
- Caching
- Response Compression
- Database Indexes

---

# 24. Git Standards

Branch Names

```
feature/authentication

feature/products

bugfix/login

hotfix/token
```

Commit Messages

```
feat: add product module

fix: resolve login issue

refactor: improve repository

docs: update architecture
```

---

# 25. Code Review Checklist

- Naming follows standards
- No duplicated code
- No business logic in controllers
- DTOs used
- Validation implemented
- Logging added
- Async methods used
- Unit tests added

---

# 26. Documentation Standards

Every public service should include XML documentation.

Example

```csharp
/// <summary>
/// Creates a new product.
/// </summary>
```

---

# 27. Testing Standards

Unit Tests

- xUnit
- Moq
- FluentAssertions

Integration Tests

- PostgreSQL
- Testcontainers

---

# 28. Tools & Extensions

## Backend

- C# Dev Kit
- .NET SDK
- Entity Framework Tools

## Frontend

- ESLint
- Prettier
- Tailwind CSS IntelliSense

## Git

- GitHub Desktop
- GitLens

---

# 29. Summary

Following these coding standards ensures consistency across the codebase, improves readability, reduces technical debt, and enables scalable, maintainable development for the AssetIQ AI platform.