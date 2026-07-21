    # Use Cases

**Project Name:** AssetIQ AI  
**Project Type:** AI-Powered Inventory & Asset Management SaaS  
**Version:** 1.0.0  
**Document Type:** Use Case Specification  
**Status:** Draft  
**Author:** Narendra Gore  
**Last Updated:** 2026-07-18

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0.0 | 2026-07-18 | Narendra Gore | Initial Use Case Specification |

---

# Table of Contents

1. Introduction
2. Actors
3. System Scope
4. Use Case Summary
5. Authentication Use Cases
6. Dashboard Use Cases
7. Category Use Cases
8. Product Use Cases
9. Supplier Use Cases
10. Warehouse Use Cases
11. Asset Use Cases
12. Employee Use Cases
13. Purchase Order Use Cases
14. Document Use Cases
15. Notification Use Cases
16. Audit Log Use Cases
17. AI Assistant Use Cases
18. Settings Use Cases

---

# 1. Introduction

## Purpose

This document describes how users interact with the AssetIQ AI system. Each use case defines the sequence of interactions between an actor and the system to achieve a specific business goal.

---

# 2. Actors

| Actor | Description |
|--------|-------------|
| Guest | Unauthenticated visitor |
| Employee | Standard application user |
| Manager | Team manager with elevated permissions |
| Admin | Organization administrator |
| Super Admin | Platform administrator |
| AI Service | External AI provider |
| Cloud Storage | File storage service |
| Email Service | Email notification service |

---

# 3. System Scope

The use cases cover all major business functions including:

- Authentication
- Dashboard
- Categories
- Products
- Suppliers
- Warehouses
- Assets
- Employees
- Purchase Orders
- Documents
- Notifications
- Audit Logs
- AI Assistant
- Settings

---

# 4. Use Case Summary

| ID | Module | Use Case |
|----|---------|----------|
| UC-AUTH-001 | Authentication | Register User |
| UC-AUTH-002 | Authentication | Login |
| UC-AUTH-003 | Authentication | Logout |
| UC-AUTH-004 | Authentication | Reset Password |
| UC-DASH-001 | Dashboard | View Dashboard |
| UC-CAT-001 | Categories | Manage Categories |
| UC-PROD-001 | Products | Create Product |
| UC-PROD-002 | Products | Update Product |
| UC-PROD-003 | Products | Delete Product |
| UC-PROD-004 | Products | Search Products |
| UC-SUP-001 | Suppliers | Manage Suppliers |
| UC-WH-001 | Warehouses | Manage Warehouses |
| UC-AST-001 | Assets | Register Asset |
| UC-AST-002 | Assets | Assign Asset |
| UC-AST-003 | Assets | Return Asset |
| UC-EMP-001 | Employees | Manage Employees |
| UC-PO-001 | Purchase Orders | Create Purchase Order |
| UC-DOC-001 | Documents | Upload Document |
| UC-DOC-002 | Documents | Summarize Document |
| UC-NOT-001 | Notifications | View Notifications |
| UC-AUD-001 | Audit Logs | View Audit Logs |
| UC-AI-001 | AI | Chat with AI |
| UC-AI-002 | AI | Generate Product Description |
| UC-SET-001 | Settings | Manage Profile |

---

# 5. Authentication Use Cases

## UC-AUTH-002 — User Login

### Goal

Authenticate a registered user and grant access to the application.

### Primary Actor

Registered User

### Secondary Actors

Authentication Service

### Trigger

The user selects **Login**.

### Preconditions

- User account exists.
- User account is active.
- Email is verified.

### Main Success Scenario

1. User opens the login page.
2. User enters email.
3. User enters password.
4. User clicks **Login**.
5. System validates the input.
6. System authenticates the credentials.
7. System generates JWT and Refresh Token.
8. System records the login event.
9. System redirects the user to the dashboard.

### Alternative Flows

**A1. Invalid Email**

- Display an "Email not found" message.

**A2. Incorrect Password**

- Display an "Invalid email or password" message.

**A3. Account Locked**

- Display an account locked message.

### Exception Flow

- Database unavailable.
- Authentication service unavailable.
- Token generation failure.

### Postconditions

- User session is established.
- Tokens are issued.
- Audit log entry is created.

### Business Rules

- Email must be unique.
- Password must be hashed.
- JWT expiration is enforced.

### Validation Rules

- Email is required.
- Password is required.
- Email format must be valid.

### Related APIs

- POST /api/v1/auth/login

### Related User Story

- AUTH-002

---

# 6. Dashboard Use Cases

| Use Case ID | Description |
|-------------|-------------|
| UC-DASH-001 | View Dashboard |
| UC-DASH-002 | View KPI Cards |
| UC-DASH-003 | View Charts |
| UC-DASH-004 | View AI Insights |

---

# 7. Category Use Cases

| Use Case ID | Description |
|-------------|-------------|
| UC-CAT-001 | Create Category |
| UC-CAT-002 | Update Category |
| UC-CAT-003 | Delete Category |
| UC-CAT-004 | View Categories |

---

# 8. Product Use Cases

| Use Case ID | Description |
|-------------|-------------|
| UC-PROD-001 | Create Product |
| UC-PROD-002 | Update Product |
| UC-PROD-003 | Delete Product |
| UC-PROD-004 | View Product |
| UC-PROD-005 | Search Products |
| UC-PROD-006 | Filter Products |
| UC-PROD-007 | Update Stock |

---

# 9. Supplier Use Cases

- UC-SUP-001 Create Supplier
- UC-SUP-002 Update Supplier
- UC-SUP-003 Delete Supplier
- UC-SUP-004 View Suppliers

---

# 10. Warehouse Use Cases

- UC-WH-001 Create Warehouse
- UC-WH-002 Update Warehouse
- UC-WH-003 Delete Warehouse
- UC-WH-004 View Warehouses

---

# 11. Asset Use Cases

- UC-AST-001 Register Asset
- UC-AST-002 Assign Asset
- UC-AST-003 Return Asset
- UC-AST-004 View Assets

---

# 12. Employee Use Cases

- UC-EMP-001 Create Employee
- UC-EMP-002 Update Employee
- UC-EMP-003 Delete Employee
- UC-EMP-004 View Employees

---

# 13. Purchase Order Use Cases

- UC-PO-001 Create Purchase Order
- UC-PO-002 Update Purchase Order
- UC-PO-003 Approve Purchase Order
- UC-PO-004 View Purchase Orders

---

# 14. Document Use Cases

- UC-DOC-001 Upload Document
- UC-DOC-002 Download Document
- UC-DOC-003 Delete Document
- UC-DOC-004 Summarize Document

---

# 15. Notification Use Cases

- UC-NOT-001 View Notifications
- UC-NOT-002 Mark Notification as Read

---

# 16. Audit Log Use Cases

- UC-AUD-001 View Audit Logs

---

# 17. AI Assistant Use Cases

- UC-AI-001 Chat with AI
- UC-AI-002 Generate Product Description
- UC-AI-003 Summarize Report
- UC-AI-004 Dashboard Insights
- UC-AI-005 Summarize Document

---

# 18. Settings Use Cases

- UC-SET-001 Update Profile
- UC-SET-002 Change Password
- UC-SET-003 Toggle Theme

---

# Use Case Statistics

| Module | Use Cases |
|---------|----------:|
| Authentication | 4 |
| Dashboard | 4 |
| Categories | 4 |
| Products | 7 |
| Suppliers | 4 |
| Warehouses | 4 |
| Assets | 4 |
| Employees | 4 |
| Purchase Orders | 4 |
| Documents | 4 |
| Notifications | 2 |
| Audit Logs | 1 |
| AI Assistant | 5 |
| Settings | 3 |

**Total Use Cases:** 54

---

# Traceability Matrix

| User Story | Use Case |
|------------|----------|
| AUTH-002 | UC-AUTH-002 |
| PROD-001 | UC-PROD-001 |
| AST-002 | UC-AST-002 |
| DOC-004 | UC-DOC-004 |
| AI-001 | UC-AI-001 |

---

**End of Document**