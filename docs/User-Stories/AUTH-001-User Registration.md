# AUTH-001 — User Registration

---

## Story Information

| Field | Value |
|--------|-------|
| Story ID | AUTH-001 |
| Epic | Authentication |
| Title | User Registration |
| Priority | Critical |
| Story Points | 8 |
| Sprint | Sprint 1 |
| Status | Planned |
| Module | Authentication |
| Feature | User Registration |
| Created By | Narendra Gore |
| Version | 1.0 |
| Last Updated | YYYY-MM-DD |

---

# User Story

**As a** new user

**I want** to create an account using my personal information

**So that** I can securely access AssetIQ AI and use the application based on my assigned role.

---

# Business Goal

Allow new users to securely create an account while ensuring data integrity, uniqueness, and compliance with authentication standards.

---

# Business Value

- Enables secure onboarding.
- Prevents unauthorized access.
- Establishes user identity.
- Supports future authentication.
- Supports RBAC.
- Creates audit trail.

---

# Actors

### Primary Actor

- Guest User

### Secondary Actors

- Authentication Service
- Email Service
- Database
- Audit Logging Service

---

# Trigger

The guest user clicks the **Create Account** button.

---

# Preconditions

- User is not logged in.
- Registration feature is enabled.
- Database is available.
- Email service is available.
- Internet connection is available.

---

# Assumptions

- User has a valid email address.
- User accepts Terms & Conditions.
- User provides accurate information.

---

# Main Success Scenario

1. User navigates to the Registration page.
2. System displays the registration form.
3. User enters First Name.
4. User enters Last Name.
5. User enters Email Address.
6. User enters Phone Number (optional).
7. User enters Password.
8. User enters Confirm Password.
9. User accepts Terms & Conditions.
10. User clicks **Register**.
11. Client-side validation is performed.
12. Registration request is sent to the backend.
13. Backend validates the request.
14. System verifies that the email does not already exist.
15. Password is securely hashed.
16. User record is created.
17. Default role is assigned.
18. Email verification token is generated.
19. Verification email is sent.
20. Audit log entry is created.
21. System returns success response.
22. User is redirected to the Verify Email page.

---

# Alternative Flows

## A1 — Email Already Exists

1. User enters an existing email.
2. System detects duplicate email.
3. Registration is cancelled.
4. User receives:

> An account with this email already exists.

---

## A2 — Passwords Do Not Match

1. User enters different passwords.
2. Validation fails.
3. Registration request is not submitted.
4. Error displayed.

---

## A3 — Invalid Email

1. User enters invalid email.
2. Validation fails.
3. User is asked to correct it.

---

## A4 — Weak Password

System rejects password and displays password requirements.

---

## A5 — Terms Not Accepted

Registration cannot continue until Terms & Conditions are accepted.

---

# Exception Flows

## E1 — Database Failure

- Registration fails.
- Error logged.
- Generic error message displayed.

---

## E2 — Email Service Failure

- User account is created.
- Verification email is marked as pending.
- User can request another verification email later.

---

## E3 — Unexpected Server Error

- HTTP 500 returned.
- Error logged.
- User sees a generic error message.

---

# Postconditions

## Success

- User account exists.
- Password is hashed.
- Verification token is generated.
- Verification email is queued/sent.
- Audit log is recorded.

## Failure

- No account is created.
- Database remains unchanged.

---

# Functional Requirements

The system shall:

- Display registration form.
- Validate all required fields.
- Prevent duplicate email registration.
- Hash passwords before storage.
- Generate email verification token.
- Assign default role.
- Record audit logs.
- Return standardized API responses.

---

# Non-Functional Requirements

## Security

- Passwords must never be stored in plain text.
- HTTPS only.
- Sensitive data encrypted in transit.

---

## Performance

- Registration response within 2 seconds under normal load.

---

## Availability

- Registration available 24×7.

---

## Scalability

- Support concurrent registrations.

---

# Validation Rules

## First Name

- Required
- 2–50 characters
- Letters only

---

## Last Name

- Required
- 2–50 characters

---

## Email

- Required
- Valid email format
- Maximum 255 characters
- Must be unique

---

## Phone Number

- Optional
- Valid format
- Maximum 20 characters

---

## Password

- Required
- Minimum 8 characters
- Maximum 100 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

---

## Confirm Password

- Required
- Must match Password

---

# Business Rules

- Email must be unique.
- Password must be hashed.
- User status is PendingVerification until email is verified.
- Default role is Employee.
- Registration timestamp is stored.
- Terms & Conditions acceptance is mandatory.

---

# Security Requirements

- Password hashing using ASP.NET Identity PasswordHasher.
- JWT is **not** generated during registration.
- Email verification required before first login.
- CSRF protection (if applicable).
- Rate limiting for registration endpoint.
- Server-side validation for all inputs.

---

# API Information

### Endpoint

```
POST /api/v1/auth/register
```

---

## Request Body

```json
{
  "firstName": "Narendra",
  "lastName": "Gore",
  "email": "narendra@example.com",
  "phoneNumber": "9876543210",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "acceptTerms": true
}
```

---

## Success Response

HTTP 201 Created

```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "uuid",
    "email": "narendra@example.com"
  },
  "errors": null
}
```

---

## Error Responses

### 400 Bad Request

Validation failed.

---

### 409 Conflict

Email already exists.

---

### 500 Internal Server Error

Unexpected server error.

---

# Database Changes

### Table

User

New record inserted.

---

### AuditLog

New audit record created.

---

# UI Components

- Registration Page
- Registration Form
- First Name Field
- Last Name Field
- Email Field
- Phone Number Field
- Password Field
- Confirm Password Field
- Show/Hide Password Toggle
- Terms & Conditions Checkbox
- Register Button
- Login Link

---

# Backend Components

- AuthController
- RegisterCommand
- RegisterCommandValidator
- RegisterCommandHandler
- IUserRepository
- Password Service
- Email Service
- Audit Service
- Unit of Work
- Mapster Mapping

---

# Dependencies

- User Module
- Role Module
- Email Service
- Audit Logging
- PostgreSQL
- Entity Framework Core

---

# Acceptance Criteria

- Registration page loads successfully.
- Required field validation works.
- Invalid data is rejected.
- Duplicate emails are rejected.
- Password is securely hashed.
- User record is created.
- Default role is assigned.
- Verification email is sent.
- Audit log is created.
- Success response returned.

---

# Test Cases

- Register with valid information.
- Register with existing email.
- Register with weak password.
- Register with invalid email.
- Register without accepting Terms.
- Register with mismatched passwords.
- Email service unavailable.
- Database unavailable.
- High concurrent registrations.

---

# Definition of Done

- Backend implemented.
- Frontend implemented.
- Database migration completed.
- Validation completed.
- Unit tests passed.
- Integration tests passed.
- API documented.
- Code reviewed.
- QA approved.
- Documentation updated.

---

# Related Documents

- SRS
- FRS
- SDS
- API Specification
- Database Design
- Use Case UC-AUTH-001
