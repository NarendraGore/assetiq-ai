# AUTH-004 — Reset Password

---

## Story Information

| Field | Value |
|--------|-------|
| Story ID | AUTH-004 |
| Epic | Authentication |
| Title | Reset Password |
| Priority | Critical |
| Story Points | 5 |
| Sprint | Sprint 1 |
| Status | Planned |
| Module | Authentication |
| Feature | Reset Password |
| Created By | Narendra Gore |
| Version | 1.0 |
| Last Updated | YYYY-MM-DD |

---

# User Story

**As a** registered user who has requested a password reset

**I want** to securely set a new password using a valid password reset link

**So that** I can regain access to my account if I have forgotten my password.

---

# Business Goal

Provide a secure password reset mechanism that validates a time-limited reset token before allowing users to create a new password.

---

# Business Value

- Enables secure account recovery.
- Protects user accounts from unauthorized access.
- Eliminates the need for administrator intervention.
- Improves user experience.
- Maintains security compliance.

---

# Actors

## Primary Actor

- Registered User

## Secondary Actors

- Authentication Service
- Password Reset Service
- Token Validation Service
- Database
- Audit Logging Service
- Email Service

---

# Trigger

The user clicks the password reset link received via email.

---

# Preconditions

- User previously requested password reset.
- Password reset token exists.
- Password reset token is valid.
- Password reset token has not expired.
- User account exists.
- Database is available.

---

# Assumptions

- User has access to the registered email account.
- Password reset link is opened within the expiration period.
- Internet connection is available.

---

# Main Success Scenario

1. User clicks the password reset link.
2. System validates the reset token.
3. System displays the Reset Password page.
4. User enters a new password.
5. User enters the Confirm Password.
6. User clicks **Reset Password**.
7. Client-side validation is performed.
8. Request is sent to the backend.
9. Backend validates the request.
10. System validates the reset token.
11. System verifies that the token has not expired.
12. System verifies that the token has not already been used.
13. New password is securely hashed.
14. User password is updated.
15. Reset token is marked as used.
16. All existing refresh tokens are revoked.
17. Password reset activity is recorded.
18. Confirmation email is sent (optional but recommended).
19. Success response is returned.
20. User is redirected to the Login page.

---

# Alternative Flows

## A1 — Passwords Do Not Match

1. User enters different passwords.
2. Validation fails.
3. Error message displayed.

---

## A2 — Weak Password

1. User enters a weak password.
2. Validation fails.
3. Password policy is displayed.

---

## A3 — Expired Token

1. User opens an expired reset link.
2. Token validation fails.
3. User is redirected to Forgot Password page.
4. User is prompted to request a new reset link.

---

## A4 — Invalid Token

1. User opens a modified or invalid link.
2. Token validation fails.
3. Reset operation is cancelled.
4. Generic error message displayed.

---

## A5 — Already Used Token

1. User attempts to reuse the same reset link.
2. System rejects the request.
3. User is asked to request a new reset link.

---

# Exception Flows

## E1 — Database Failure

- Password update fails.
- Error is logged.
- User receives a generic error message.

---

## E2 — Token Validation Service Failure

- Reset operation is cancelled.
- User is informed to try again later.

---

## E3 — Unexpected Server Error

- HTTP 500 returned.
- Error logged.
- Generic message displayed.

---

# Postconditions

## Success

- User password is updated.
- Reset token is invalidated.
- Existing refresh tokens are revoked.
- Audit log is created.
- User can log in using the new password.

## Failure

- Password remains unchanged.
- Existing credentials remain valid.
- Token state remains unchanged unless expired.

---

# Functional Requirements

The system shall:

- Validate password reset token.
- Validate password policy.
- Update password securely.
- Invalidate reset token after successful use.
- Revoke all active sessions.
- Record audit logs.
- Return standardized API responses.

---

# Non-Functional Requirements

## Security

- Reset token must be single-use.
- Token must expire automatically.
- Password must be securely hashed.
- HTTPS is mandatory.

---

## Performance

- Password reset response should complete within 2 seconds.

---

## Availability

- Password reset service available 24×7.

---

## Scalability

- Support multiple concurrent password reset requests.

---

# Validation Rules

## Reset Token

- Required
- Valid
- Not expired
- Single-use

---

## Password

- Required
- Minimum 8 characters
- Maximum 100 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one numeric digit
- At least one special character

---

## Confirm Password

- Required
- Must exactly match Password

---

# Business Rules

- Reset tokens expire after 15 minutes.
- Reset tokens can only be used once.
- Previous passwords cannot be reused (optional enhancement).
- Password is stored using secure hashing.
- Existing refresh tokens are revoked after password change.
- Password reset event must be logged.

---

# Security Requirements

- ASP.NET Identity PasswordHasher.
- Secure random reset tokens.
- HTTPS only.
- Token expiration enforcement.
- Brute-force protection.
- Rate limiting.
- Audit logging.
- CSRF protection (if applicable).

---

# API Information

## Endpoint

```
POST /api/v1/auth/reset-password
```

---

## Request Body

```json
{
  "token": "reset_token",
  "password": "Password@123",
  "confirmPassword": "Password@123"
}
```

---

## Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Password has been reset successfully.",
  "data": null,
  "errors": null,
  "timestamp": "2026-07-21T12:00:00Z"
}
```

---

## Error Responses

### HTTP 400 Bad Request

Validation failed.

### HTTP 401 Unauthorized

Invalid or expired token.

### HTTP 409 Conflict

Token has already been used.

### HTTP 500 Internal Server Error

Unexpected server error.

---

# Database Changes

### User

- Update PasswordHash.
- Update PasswordChangedAt.
- Update UpdatedAt.

---

### PasswordResetToken

- Mark token as used.
- Store UsedAt timestamp.
- Invalidate remaining active reset tokens.

---

### RefreshToken

- Revoke all active refresh tokens for the user.

---

### AuditLog

Insert password reset activity.

---

# UI Components

- Reset Password Page
- New Password Input
- Confirm Password Input
- Show/Hide Password Toggle
- Password Strength Indicator
- Reset Password Button
- Validation Messages
- Success Message
- Loading Spinner

---

# Backend Components

- AuthController
- ResetPasswordCommand
- ResetPasswordCommandValidator
- ResetPasswordCommandHandler
- PasswordResetService
- TokenValidationService
- PasswordHasher
- RefreshTokenService
- AuditLogService
- Entity Framework Core
- Mapster

---

# Dependencies

- User Module
- Forgot Password Module
- Email Service
- Refresh Token Service
- Audit Logging
- PostgreSQL
- Entity Framework Core

---

# Acceptance Criteria

- Reset Password page loads successfully.
- Token validation works correctly.
- Expired tokens are rejected.
- Invalid tokens are rejected.
- Password policy is enforced.
- Password is securely hashed.
- Reset token becomes invalid after use.
- Existing refresh tokens are revoked.
- Audit log is created.
- Confirmation email is sent (if enabled).
- User can log in using the new password.

---

# Test Cases

- Reset password using valid token.
- Reset password using expired token.
- Reset password using invalid token.
- Reset password using previously used token.
- Submit weak password.
- Submit mismatched passwords.
- Verify password hashing.
- Verify refresh token revocation.
- Verify audit logging.
- Verify confirmation email.
- Verify password cannot be reset twice with the same token.
- Verify server error handling.

---

# Definition of Done

- Reset Password API implemented.
- Reset Password UI completed.
- Token validation implemented.
- Password hashing implemented.
- Refresh token revocation completed.
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

- Software Requirements Specification (SRS)
- Functional Requirements Specification (FRS)
- Software Design Specification (SDS)
- API Specification
- Database Design
- Use Case UC-AUTH-004
- AUTH-002 — User Login
- AUTH-003 — Forgot Password
- AUTH-005 — User Logout