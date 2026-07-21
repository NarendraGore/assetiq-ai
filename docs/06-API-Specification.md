# API Specification

**Project Name:** AssetIQ AI  
**Project Type:** AI-Powered Inventory & Asset Management SaaS  
**Version:** 1.0.0  
**Document Type:** API Specification  
**Status:** Draft  
**Author:** Narendra Gore  
**Last Updated:** 2026-07-18

---

# Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0.0 |  2026-07-18 | Narendra Gore | Initial API Specification |

---

# Table of Contents

1. Introduction
2. API Standards
3. Authentication
4. Response Format
5. Error Handling
6. Pagination
7. Filtering
8. Sorting
9. API Modules
10. Authentication APIs
11. User APIs
12. Dashboard APIs
13. Category APIs
14. Product APIs
15. Supplier APIs
16. Warehouse APIs
17. Asset APIs
18. Employee APIs
19. Purchase Order APIs
20. Document APIs
21. Notification APIs
22. Audit APIs
23. AI APIs
24. HTTP Status Codes
25. Versioning

---

# 1. Introduction

## Purpose

This document defines the REST API endpoints, request/response formats, authentication mechanisms, validation rules, and API standards used by AssetIQ AI.

---

# 2. API Standards

Architecture Style

- REST API

Protocol

- HTTPS

Data Format

- JSON

Encoding

- UTF-8

Base URL

```

/api/v1

```

---

# 3. Authentication

The API uses

- JWT Access Token
- Refresh Token

Authentication Header

```

Authorization: Bearer <access_token>

```

---

# 4. Standard API Response

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "errors": null,
  "timestamp": "2026-07-18T10:15:30Z"
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "data": null,
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    }
  ],
  "timestamp": "2026-07-18T10:15:30Z"
}
```

---

# 5. Error Handling

Validation errors return:

- HTTP 400

Authentication errors return:

- HTTP 401

Authorization errors return:

- HTTP 403

Missing resources return:

- HTTP 404

Unexpected errors return:

- HTTP 500

---

# 6. Pagination

Request

```

?page=1&pageSize=10

```

Response

```json
{
  "page": 1,
  "pageSize": 10,
  "totalRecords": 150,
  "totalPages": 15,
  "items": []
}
```

---

# 7. Filtering

Example

```

GET /products?categoryId=1&status=Active

```

---

# 8. Sorting

```

GET /products?sort=name&direction=asc

```

---

# 9. API Modules

- Authentication
- Users
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
- AI

---

# 10. Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register user |
| POST | /auth/login | User login |
| POST | /auth/logout | Logout |
| POST | /auth/refresh-token | Refresh JWT |
| POST | /auth/forgot-password | Forgot password |
| POST | /auth/reset-password | Reset password |
| GET | /auth/profile | Logged-in user |
| PUT | /auth/profile | Update profile |

---

# 11. User APIs

| Method | Endpoint |
|---------|----------|
| GET | /users |
| GET | /users/{id} |
| POST | /users |
| PUT | /users/{id} |
| DELETE | /users/{id} |

---

# 12. Dashboard APIs

| Method | Endpoint |
|---------|----------|
| GET | /dashboard |
| GET | /dashboard/kpis |
| GET | /dashboard/charts |
| GET | /dashboard/recent-activities |
| GET | /dashboard/ai-insights |

---

# 13. Category APIs

| Method | Endpoint |
|---------|----------|
| GET | /categories |
| GET | /categories/{id} |
| POST | /categories |
| PUT | /categories/{id} |
| DELETE | /categories/{id} |

---

# 14. Product APIs

| Method | Endpoint |
|---------|----------|
| GET | /products |
| GET | /products/{id} |
| POST | /products |
| PUT | /products/{id} |
| PATCH | /products/{id}/stock |
| DELETE | /products/{id} |

---

# 15. Supplier APIs

| Method | Endpoint |
|---------|----------|
| GET | /suppliers |
| GET | /suppliers/{id} |
| POST | /suppliers |
| PUT | /suppliers/{id} |
| DELETE | /suppliers/{id} |

---

# 16. Warehouse APIs

| Method | Endpoint |
|---------|----------|
| GET | /warehouses |
| GET | /warehouses/{id} |
| POST | /warehouses |
| PUT | /warehouses/{id} |
| DELETE | /warehouses/{id} |

---

# 17. Asset APIs

| Method | Endpoint |
|---------|----------|
| GET | /assets |
| GET | /assets/{id} |
| POST | /assets |
| PUT | /assets/{id} |
| DELETE | /assets/{id} |
| POST | /assets/{id}/assign |
| POST | /assets/{id}/return |

---

# 18. Employee APIs

| Method | Endpoint |
|---------|----------|
| GET | /employees |
| GET | /employees/{id} |
| POST | /employees |
| PUT | /employees/{id} |
| DELETE | /employees/{id} |

---

# 19. Purchase Order APIs

| Method | Endpoint |
|---------|----------|
| GET | /purchase-orders |
| GET | /purchase-orders/{id} |
| POST | /purchase-orders |
| PUT | /purchase-orders/{id} |
| DELETE | /purchase-orders/{id} |

---

# 20. Document APIs

| Method | Endpoint |
|---------|----------|
| POST | /documents/upload |
| GET | /documents |
| GET | /documents/{id} |
| DELETE | /documents/{id} |
| POST | /documents/{id}/summarize |

---

# 21. Notification APIs

| Method | Endpoint |
|---------|----------|
| GET | /notifications |
| PUT | /notifications/{id}/read |

---

# 22. Audit APIs

| Method | Endpoint |
|---------|----------|
| GET | /audit-logs |

---

# 23. AI APIs

| Method | Endpoint |
|---------|----------|
| POST | /ai/chat |
| POST | /ai/product-description |
| POST | /ai/document-summary |
| POST | /ai/report-summary |
| POST | /ai/dashboard-insights |

---

# 24. HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Failed |
| 500 | Internal Server Error |

---

# 25. API Versioning

Current Version

```

v1

```

Future versions

```

v2

v3

```

Versioning Strategy

```

/api/v1/

```

---

# API Security

- JWT Authentication
- Role-Based Authorization
- HTTPS
- Input Validation
- Secure File Upload
- Rate Limiting (Future)

---

# API Characteristics

| Characteristic | Status |
|---------------|--------|
| REST API | ✔ |
| JSON | ✔ |
| JWT | ✔ |
| Versioned | ✔ |
| Paginated | ✔ |
| Filterable | ✔ |
| Sortable | ✔ |
| Secure | ✔ |
| Consistent Response | ✔ |

---

**End of Document**