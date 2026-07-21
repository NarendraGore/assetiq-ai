# AUTH-003 — Forgot Password

---

## Story Information

| Field | Value |
|--------|-------|
| Story ID | AUTH-003 |
| Epic | Authentication |
| Title | Forgot Password |
| Priority | High |
| Story Points | 5 |
| Sprint | Sprint 1 |
| Status | Planned |
| Module | Authentication |
| Feature | Forgot Password |
| Created By | Narendra Gore |
| Version | 1.0 |
| Last Updated | YYYY-MM-DD |

---

# User Story

**As a** registered user

**I want** to request a password reset link when I forget my password

**So that** I can securely regain access to my account.

---

# Business Goal

Provide a secure and user-friendly password recovery mechanism that verifies the user's identity through email without exposing sensitive account information.

---

# Business Value

- Enables users to recover account access.
- Reduces support requests.
- Improves user experience.
- Maintains account security.
- Prevents unauthorized password resets.

---

# Actors

## Primary Actor

- Registered User

## Secondary Actors

- Authentication Service
- Email Service
- Token Service
- Database
- Audit Logging Service

---

# Trigger

The user clicks the **Forgot Password?** link on the Login page.

---

# Preconditions

- User account exists.
- Email service is available.
- Authentication service is available.
- Database is available.

---

# Assumptions

- User remembers the registered email address.
- User has access to their email inbox.
- Internet connection is available.

---

# Main Success Scenario

1. User clicks **Forgot Password?**
2. System displays the Forgot Password page.
3. User enters the registered email address.
4. User clicks **Send Reset Link**.
5. Client-side validation is performed.
6. Request is sent to the backend.
7. Backend validates the request.
8. System checks if the email exists.
9. A secure password reset token is generated.
10. Token expiration time is assigned (e.g., 15 minutes).
11. Token is securely stored.
12. Password reset email is generated.
13. Email containing the reset link is sent.
14. Audit log entry is created.
15. System returns a success response.
16. User is informed that, if the account exists, a reset email has been sent.

---

# Alternative Flows

## A1 — Email Does Not Exist

1. User enters an email that is not registered.
2. System does **not** reveal that the account does not exist.
3. System displays:

> If an account with this email exists, a password reset link has been sent.

---

## A2 — Invalid Email Format

1. User enters an invalid email.
2. Validation fails.
3. User is prompted to enter a valid email address.

---

## A3 — Expired Existing Token

1. User already has an expired reset token.
2. System generates a new token.
3. Previous token is invalidated.

---

# Exception Flows

## E1 — Email Service Failure

- Token is generated.
- Email cannot be delivered.
- Error is logged.
- User receives a generic message.
- User may retry later.

---

## E2 — Database Failure

- Request fails.
- Error is logged.
- No token is generated.

---

## E3 — Unexpected Server Error

- HTTP 500 returned.
- Error logged.
- Generic message displayed.

---

# Postconditions

## Success

- Reset token generated.
- Reset email sent.
- Audit log created.

## Failure

- No password changes occur.
- Existing password remains valid.

---

# Functional Requirements

The system shall:

- Display Forgot Password page.
- Validate email address.
- Generate secure reset token.
- Set token expiration.
- Send reset email.
- Log password reset request.
- Return standardized API response.

---

# Non-Functional Requirements

## Security

- Never expose whether an email exists.
- Generate cryptographically secure tokens.
- Tokens must expire automatically.
- HTTPS required.

---

## Performance

- Response should complete within 2 seconds.

---

## Availability

- Password recovery available 24×7.

---

## Scalability

- Support concurrent password reset requests.

---

# Validation Rules

## Email

- Required
- Valid email format
- Maximum 255 characters

---

# Business Rules

- Reset tokens are single-use.
- Token expires after 15 minutes.
- Previous reset tokens become invalid when a new one is generated.
- Password is not changed until the Reset Password process is completed.
- User existence must never be disclosed.

---

# Security Requirements

- Secure random token generation.
- Token stored securely (hashed if persisted).
- HTTPS only.
- Rate limiting to prevent abuse.
- Audit logging for every request.
- No user enumeration.

---

# API Information

## Endpoint

```
POST /api/v1/auth/forgot-password
```

---

## Request Body

```json
{
  "email": "narendra@example.com"
}
```

---

## Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "If an account with this email exists, a password reset link has been sent.",
  "data": null,
  "errors": null,
  "timestamp": "2026-07-21T12:00:00Z"
}
```

---

## Error Responses

### HTTP 400 Bad Request

Validation failed.

### HTTP 429 Too Many Requests

Too many reset requests.

### HTTP 500 Internal Server Error

Unexpected server error.

---

# Database Changes

### PasswordResetToken

- Create new reset token.
- Store expiration time.
- Mark previous tokens as invalid.

---

### AuditLog

Insert password reset request activity.

---

# UI Components

- Forgot Password Page
- Email Input
- Send Reset Link Button
- Back to Login Link
- Validation Messages
- Success Message
- Loading Spinner

---

# Backend Components

- AuthController
- ForgotPasswordCommand
- ForgotPasswordCommandValidator
- ForgotPasswordCommandHandler
- PasswordResetService
- EmailService
- TokenGenerator
- AuditLogService
- Entity Framework Core
- Mapster

---

# Dependencies

- User Module
- Email Service
- Authentication Module
- Audit Logging
- PostgreSQL
- Entity Framework Core

---

# Acceptance Criteria

- Forgot Password page loads successfully.
- Email validation works.
- Reset token generated successfully.
- Email is sent successfully.
- Existing account is not disclosed.
- Previous reset tokens are invalidated.
- Audit log is created.
- Standard API response returned.

---

# Test Cases

- Request reset with valid email.
- Request reset with unregistered email.
- Request reset with invalid email.
- Submit empty email.
- Submit multiple reset requests.
- Verify token expiration.
- Verify token is single-use.
- Verify previous token invalidation.
- Email service unavailable.
- Database unavailable.
- Verify audit logging.
- Verify rate limiting.

---

# Definition of Done

- Forgot Password API implemented.
- Email template created.
- Secure reset token implemented.
- Validation completed.
- Audit logging completed.
- Unit tests passed.
- Integration tests passed.
- Security testing completed.
- API documented.
- Code reviewed.
- QA approved.
- Documentation updated.

---

# Related Documents

- SRS
- Functional Requirements Specification (FRS)
- Software Design Specification (SDS)
- API Specification
- Database Design
- Use Case UC-AUTH-003
- AUTH-002 — User Login
- AUTH-004 — Reset Password