# AUTH-002 — User Login

---

## Story Information

| Field | Value |
|--------|-------|
| Story ID | AUTH-002 |
| Epic | Authentication |
| Title | User Login |
| Priority | Critical |
| Story Points | 5 |
| Sprint | Sprint 1 |
| Status | Planned |
| Module | Authentication |
| Feature | User Login |
| Created By | Narendra Gore |
| Version | 1.0 |
| Last Updated | YYYY-MM-DD |

---

# User Story

**As a** registered user

**I want** to securely log in using my email and password

**So that** I can access AssetIQ AI according to my assigned role and permissions.

---

# Business Goal

Provide a secure authentication mechanism that validates user credentials, establishes an authenticated session, and grants access to authorized application features.

---

# Business Value

- Ensures secure access to the application.
- Prevents unauthorized users from accessing protected resources.
- Supports Role-Based Access Control (RBAC).
- Enables personalized dashboards and permissions.
- Maintains audit trails for security and compliance.

---

# Actors

## Primary Actor

- Registered User

## Secondary Actors

- Authentication Service
- JWT Token Service
- Refresh Token Service
- Database
- Audit Logging Service

---

# Trigger

The user clicks the **Login** button on the login page.

---

# Preconditions

- User account exists.
- User account is active.
- User account is not locked.
- Email has been verified.
- Authentication service is available.
- Database is available.

---

# Assumptions

- User has valid login credentials.
- User is accessing the application over HTTPS.
- Internet connection is available.

---

# Main Success Scenario

1. User navigates to the Login page.
2. System displays the login form.
3. User enters email address.
4. User enters password.
5. User optionally selects **Remember Me**.
6. User clicks **Login**.
7. Client-side validation checks required fields.
8. Login request is sent to the backend.
9. Backend validates request data.
10. System searches for the user by email.
11. System verifies the password hash.
12. System verifies that the account is active.
13. System verifies that the email is confirmed.
14. System generates a JWT Access Token.
15. System generates a Refresh Token.
16. Refresh token is securely stored.
17. Login event is recorded in the audit log.
18. User profile and permissions are loaded.
19. Authentication response is returned.
20. User is redirected to the Dashboard.
21. Navigation menu is rendered according to the user's role.

---

# Alternative Flows

## A1 — Invalid Email

1. Email does not exist.
2. Authentication fails.
3. System displays:

> Invalid email or password.

---

## A2 — Incorrect Password

1. Password verification fails.
2. Login request is rejected.
3. Failed login attempt is logged.
4. System displays:

> Invalid email or password.

---

## A3 — Email Not Verified

1. User credentials are valid.
2. Email is not verified.
3. Login is denied.
4. System displays:

> Please verify your email before logging in.

5. User may request a new verification email.

---

## A4 — Account Locked

1. User account is locked.
2. Authentication is denied.
3. System displays:

> Your account has been locked. Please contact the administrator.

---

## A5 — Too Many Failed Attempts

1. Maximum failed login attempts reached.
2. Account is temporarily locked.
3. User is informed of the lockout period.

---

# Exception Flows

## E1 — Database Unavailable

- Login request fails.
- Error is logged.
- User receives a generic error message.

---

## E2 — Token Generation Failure

- Authentication process stops.
- No session is created.
- Error is logged.

---

## E3 — Unexpected Server Error

- HTTP 500 is returned.
- User sees:

> Something went wrong. Please try again later.

---

# Postconditions

## Success

- User is authenticated.
- JWT Access Token is issued.
- Refresh Token is issued.
- User session is established.
- Login event is recorded.
- Dashboard is displayed.

## Failure

- User remains unauthenticated.
- No tokens are generated.
- No session is created.

---

# Functional Requirements

The system shall:

- Display the login page.
- Validate email and password.
- Authenticate users.
- Generate JWT Access Token.
- Generate Refresh Token.
- Load user roles and permissions.
- Record login activity.
- Return standardized API responses.

---

# Non-Functional Requirements

## Security

- Passwords must never be exposed.
- Passwords must be verified using secure hashing.
- Tokens must be securely generated.
- HTTPS is mandatory.

---

## Performance

- Login response should complete within 2 seconds under normal load.

---

## Availability

- Authentication service should be available 24×7.

---

## Scalability

- Support thousands of concurrent login requests.

---

# Validation Rules

## Email

- Required
- Valid email format
- Maximum 255 characters

---

## Password

- Required
- Minimum 8 characters
- Maximum 100 characters

---

## Remember Me

- Optional
- Boolean value

---

# Business Rules

- Only active users can log in.
- Email verification is required.
- Passwords must be stored using secure hashing.
- Failed login attempts are tracked.
- Account lockout policy is enforced.
- Refresh token rotation is supported.
- Every successful login must create an audit log.

---

# Security Requirements

- JWT Authentication.
- Refresh Token Authentication.
- Secure password hashing using ASP.NET Identity PasswordHasher.
- Rate limiting for login endpoint.
- Brute-force attack protection.
- Server-side validation.
- Secure token storage.
- Token expiration enforcement.

---

# API Information

## Endpoint

```
POST /api/v1/auth/login
```

---

## Request Body

```json
{
  "email": "narendra@example.com",
  "password": "Password@123",
  "rememberMe": true
}
```

---

## Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "refresh_token",
    "expiresIn": 3600,
    "user": {
      "id": "uuid",
      "firstName": "Narendra",
      "lastName": "Gore",
      "email": "narendra@example.com",
      "role": "Admin"
    }
  },
  "errors": null,
  "timestamp": "2026-07-21T12:00:00Z"
}
```

---

## Error Responses

### HTTP 400 Bad Request

Validation failed.

---

### HTTP 401 Unauthorized

Invalid email or password.

---

### HTTP 403 Forbidden

Account disabled or email not verified.

---

### HTTP 423 Locked

Account temporarily locked.

---

### HTTP 500 Internal Server Error

Unexpected server error.

---

# Database Changes

### User

- Update LastLoginAt.
- Update LastLoginIp (optional).
- Reset FailedLoginAttempts on successful login.

---

### RefreshToken

- Insert new refresh token.
- Expire previous token if rotation is enabled.

---

### AuditLog

Insert a new login activity record.

---

# UI Components

- Login Page
- Login Form
- Email Input
- Password Input
- Show/Hide Password Toggle
- Remember Me Checkbox
- Forgot Password Link
- Login Button
- Validation Messages
- Loading Spinner

---

# Backend Components

- AuthController
- LoginCommand
- LoginCommandValidator
- LoginCommandHandler
- JwtTokenService
- RefreshTokenService
- UserRepository
- AuditLogService
- Mapster
- Entity Framework Core

---

# Dependencies

- User Module
- Role Module
- JWT Service
- Refresh Token Service
- Audit Logging
- PostgreSQL
- Entity Framework Core

---

# Acceptance Criteria

- Login page loads successfully.
- Required field validation works.
- Invalid credentials return HTTP 401.
- Inactive users cannot log in.
- Unverified users cannot log in.
- JWT Access Token is generated.
- Refresh Token is generated.
- User profile is returned.
- Login audit log is created.
- User is redirected to the Dashboard after successful login.

---

# Test Cases

- Login with valid credentials.
- Login with incorrect password.
- Login with unknown email.
- Login with empty email.
- Login with empty password.
- Login with invalid email format.
- Login with locked account.
- Login with inactive account.
- Login with unverified email.
- Login after multiple failed attempts.
- Verify refresh token generation.
- Verify audit log creation.
- Verify Remember Me functionality.
- Verify concurrent login handling.

---

# Definition of Done

- Login API implemented.
- Frontend login page completed.
- JWT authentication implemented.
- Refresh Token implemented.
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
- Use Case UC-AUTH-002
- AUTH-001 — User Registration
- AUTH-003 — Forgot Password
- AUTH-005 — User Logout
```
