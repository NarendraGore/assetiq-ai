# Frontend Architecture

**Project Name:** AssetIQ AI  
**Project Type:** AI-Powered Inventory & Asset Management SaaS  
**Frontend Framework:** Next.js 15 (App Router)  
**Language:** TypeScript  
**Version:** 1.0.0  
**Status:** Draft  
**Author:** Narendra Gore

---

# Table of Contents

1. Introduction
2. Technology Stack
3. Architecture Principles
4. Project Structure
5. Folder Structure
6. Application Layers
7. Routing Architecture
8. Authentication Flow
9. State Management
10. Data Fetching
11. API Communication
12. Form Handling
13. Validation
14. UI Architecture
15. Styling Strategy
16. Component Design
17. Error Handling
18. Loading States
19. AI Integration
20. Performance Optimization
21. Security
22. Accessibility
23. Internationalization
24. Logging
25. Testing Strategy
26. Deployment

---

# 1. Introduction

The frontend application is built using Next.js App Router and follows a feature-based architecture.

Goals:

- Scalable
- Maintainable
- Modular
- Reusable
- Type-safe
- High Performance
- Enterprise Ready

---

# 2. Technology Stack

| Technology | Purpose |
|------------|----------|
| Next.js 15 | Framework |
| React 19 | UI Library |
| TypeScript | Type Safety |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI Components |
| Lucide React | Icons |
| React Hook Form | Forms |
| Zod | Validation |
| TanStack Query | Server State |
| Zustand | Global State |
| Axios | HTTP Client |
| Mapster DTOs | Backend Mapping |
| Recharts | Charts |
| Framer Motion | Animations |
| Sonner | Toast Notifications |
| React Dropzone | File Upload |
| React Markdown | Markdown Rendering |
| Highlight.js | Code Highlighting |
| Next Themes | Dark Mode |

---

# 3. Architecture Principles

- Feature-first architecture
- Separation of concerns
- Reusable UI components
- Single Responsibility Principle
- Dependency inversion
- Type-safe development
- API-first design
- Responsive design
- Accessibility-first

---

# 4. High-Level Architecture

```
Browser
      │
      ▼
Next.js App Router
      │
      ▼
Pages
      │
      ▼
Feature Modules
      │
      ▼
Components
      │
      ▼
Hooks
      │
      ▼
API Layer
      │
      ▼
ASP.NET Core Web API
```

---

# 5. Project Structure

```
src/
│
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── store/
├── lib/
├── types/
├── utils/
├── providers/
├── constants/
├── config/
├── styles/
├── assets/
└── middleware.ts
```

---

# 6. Feature Folder Structure

```
features/

authentication/
dashboard/
products/
categories/
suppliers/
warehouses/
assets/
employees/
purchase-orders/
documents/
notifications/
settings/
ai/
```

Each feature contains:

```
products/

components/
pages/
hooks/
services/
types/
schemas/
constants/
utils/
```

---

# 7. Routing Architecture

```
app/

(auth)/
dashboard/
products/
categories/
assets/
employees/
settings/
profile/
```

Example URLs

```
/login
/dashboard
/products
/products/new
/products/1
/products/1/edit
/assets
/profile
/settings
```

---

# 8. Authentication Flow

```
User Login

↓

JWT Received

↓

Store Token

↓

Protected Routes

↓

Refresh Token

↓

Logout
```

Middleware protects all authenticated routes.

---

# 9. State Management

## Global State

Zustand

Used for

- Authentication
- Theme
- Sidebar
- User

---

## Server State

TanStack Query

Used for

- Products
- Assets
- Dashboard
- Categories
- Suppliers

---

## Local State

React useState

Used for

- Modal
- Tabs
- Form Controls

---

# 10. Data Fetching

Pattern

```
Component

↓

Hook

↓

API Service

↓

Axios

↓

Backend
```

---

# 11. API Layer

```
services/

api.ts

auth.service.ts

product.service.ts

asset.service.ts

dashboard.service.ts
```

Each service

- strongly typed
- reusable
- centralized
- interceptors enabled

---

# 12. Form Handling

Library

React Hook Form

Validation

Zod

Pattern

```
Form

↓

React Hook Form

↓

Zod Validation

↓

API
```

---

# 13. Validation Strategy

Client Validation

- Required
- Min Length
- Max Length
- Email
- Password

Server Validation

ASP.NET FluentValidation

---

# 14. UI Architecture

Three-Level Components

### UI Components

Reusable

Example

Button

Input

Card

Dialog

Badge

Avatar

---

### Shared Components

Navbar

Sidebar

Breadcrumb

Data Table

Pagination

Search

---

### Feature Components

Product Form

Asset Form

Dashboard Cards

AI Chat Panel

---

# 15. Styling Strategy

Tailwind CSS v4

Rules

- Utility-first
- Responsive
- Dark Mode
- CSS Variables
- Design Tokens

---

# 16. Component Design Pattern

```
Page

↓

Feature

↓

Container

↓

Presentational Component

↓

UI Component
```

---

# 17. Error Handling

Global Error Boundary

API Error Handler

404 Page

500 Page

Validation Errors

Toast Notifications

---

# 18. Loading States

Skeleton

Spinner

Suspense

Progress Bar

Optimistic Updates

---

# 19. AI Integration

Free AI Provider

Google Gemini API

Modules

- AI Chat
- Product Description Generator
- Inventory Insights
- Report Summarization
- Document Summarization

Flow

```
User

↓

AI Panel

↓

Next.js

↓

.NET API

↓

Gemini API

↓

Response
```

---

# 20. Performance Optimization

Lazy Loading

Dynamic Imports

Image Optimization

Code Splitting

Memoization

Virtual Lists

Debounced Search

Pagination

Caching

Prefetching

---

# 21. Security

JWT Authentication

Protected Routes

Role-Based UI

HTTP Only Refresh Cookie

CSRF Protection

XSS Prevention

Input Sanitization

Environment Variables

Secure Headers

---

# 22. Accessibility

WCAG 2.1

Keyboard Navigation

ARIA Labels

Focus Management

Screen Reader Support

High Contrast

---

# 23. Internationalization

Future Support

English

Hindi

Marathi

---

# 24. Logging

Frontend Error Logging

Console (Development)

Production Logger

API Request Logging

---

# 25. Testing Strategy

Unit Testing

- Vitest

Component Testing

- React Testing Library

E2E Testing

- Playwright

---

# 26. Deployment

Frontend

Vercel

Backend

Render / Railway / Azure App Service

Database

Supabase PostgreSQL

Storage

Cloudinary

Domain

Custom Domain

CI/CD

GitHub Actions

---

# Coding Standards

- Strict TypeScript
- ESLint
- Prettier
- Husky
- lint-staged
- Conventional Commits

---

# Design Principles

- SOLID
- DRY
- KISS
- Feature-based Architecture
- Composition over Inheritance
- Atomic Design (UI Components)

---

# Third-Party Libraries

| Library | Purpose |
|----------|----------|
| shadcn/ui | UI Components |
| TanStack Query | Server State |
| Zustand | Global State |
| Axios | HTTP Client |
| React Hook Form | Forms |
| Zod | Validation |
| Sonner | Notifications |
| Framer Motion | Animations |
| Recharts | Charts |
| React Dropzone | File Upload |
| React Markdown | Markdown Rendering |
| Highlight.js | Syntax Highlighting |
| Next Themes | Theme Switching |
| date-fns | Date Utilities |
| clsx | Conditional Classes |
| class-variance-authority | Component Variants |
| tailwind-merge | Tailwind Class Merge |

---

# Summary

The frontend architecture follows a **feature-first, modular, enterprise-grade design** built on Next.js App Router. It emphasizes scalability, maintainability, performance, security, accessibility, and type safety while integrating modern React patterns and AI-powered features. The architecture is designed to support future expansion without major structural changes.

---

**End of Document**