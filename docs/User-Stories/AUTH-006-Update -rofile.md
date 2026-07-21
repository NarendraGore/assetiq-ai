# AUTH-006 — Update Profile

---

## Story Information

| Field | Value |
|--------|-------|
| Story ID | AUTH-006 |
| Epic | Authentication |
| Title | Update User Profile |
| Priority | High |
| Story Points | 5 |
| Sprint | Sprint 1 |
| Status | Planned |
| Module | Authentication |
| Feature | User Profile Management |
| Created By | Narendra Gore |
| Version | 1.0 |
| Last Updated | YYYY-MM-DD |

---

# User Story

**As an** authenticated user

**I want** to view and update my profile information

**So that** my personal information remains accurate and up to date.

---

# Business Goal

Allow authenticated users to securely manage their personal profile information while preserving account integrity, maintaining audit history, and enforcing validation rules.

---

# Business Value

- Keeps user information accurate.
- Improves communication using updated contact details.
- Enhances user experience.
- Reduces administrative effort.
- Maintains secure user identity information.

---

# Actors

## Primary Actor

- Authenticated User

## Secondary Actors

- Authentication Service
- User Management Service
- File Storage Service (Profile Picture)
- Audit Logging Service
- Database

---

# Trigger

The authenticated user navigates to **Profile Settings** and clicks **Save Changes**.

---

# Preconditions

- User is authenticated.
- User account is active.
- Valid JWT Access Token is available.
- Database is available.

---

# Assumptions

- User has permission to edit only their own profile.
- User provides valid information.
- Profile image upload service is available.

---

# Main Success Scenario

1. User logs into the application.
2. User opens the **Profile** page.
3. System loads the existing profile details.
4. User updates one or more profile fields.
5. User optionally uploads a new profile picture.
6. User clicks **Save Changes**.
7. Client-side validation is performed.
8. Request is sent to the backend.
9. Backend validates the request.
10. System verifies that the user is authorized to update the profile.
11. Updated information is saved.
12. Profile image is uploaded (if applicable).
13. Audit log entry is created.
14. Updated profile information is returned.
15. Success notification is displayed.
16. UI refreshes with the updated information.

---

# Alternative Flows

## A1 — Invalid Mobile Number

1. User enters an invalid phone number.
2. Validation fails.
3. Error message is displayed.

---

## A2 — Invalid Profile Image

1. User uploads an unsupported file type.
2. Upload is rejected.
3. User is prompted to upload a valid image.

---

## A3 — Email Update (Future Enhancement)

1. User changes email address.
2. Verification email is sent.
3. Email remains unchanged until verified.

---

## A4 — No Changes Made

1. User clicks **Save Changes** without modifying any fields.
2. System displays:

> No changes detected.

---

# Exception Flows

## E1 — Database Failure

- Update operation fails.
- Error logged.
- Existing profile remains unchanged.

---

## E2 — File Upload Failure

- Profile information is updated.
- Image upload fails.
- User receives a warning message.

---

## E3 — Unexpected Server Error

- HTTP 500 returned.
- Error logged.
- Generic error message displayed.

---

# Postconditions

## Success

- Profile information updated.
- Profile image updated (if applicable).
- Audit log created.
- Updated profile returned.

## Failure

- Existing profile remains unchanged.
- User is informed about the failure.

---

# Functional Requirements

The system shall:

- Display current profile information.
- Allow editing of permitted fields.
- Validate user input.
- Upload profile image.
- Store profile updates.
- Record audit logs.
- Return standardized API responses.

---

# Non-Functional Requirements

## Security

- Users can update only their own profile.
- JWT authentication required.
- HTTPS communication required.

---

## Performance

- Profile update should complete within **2 seconds**.

---

## Availability

- Profile management available 24×7.

---

## Scalability

- Support concurrent profile update requests.

---

# Editable Fields

- First Name
- Last Name
- Phone Number
- Profile Picture
- Time Zone
- Language Preference
- Theme Preference (Light/Dark/System)

---

# Read-Only Fields

- User ID
- Email Address *(unless email change feature is enabled)*
- Role
- Account Status
- Created Date
- Last Login

---

# Validation Rules

## First Name

- Required
- Minimum 2 characters
- Maximum 50 characters
- Alphabets only

---

## Last Name

- Required
- Minimum 2 characters
- Maximum 50 characters

---

## Phone Number

- Optional
- Valid international format
- Maximum 20 characters

---

## Profile Picture

Allowed Formats

- JPG
- JPEG
- PNG
- WEBP

Maximum Size

- 5 MB

---

# Business Rules

- Users cannot change their role.
- Users cannot update another user's profile.
- Email verification required before email change takes effect.
- Profile updates are recorded in the Audit Log.
- Previous profile picture is replaced after successful upload.

---

# Security Requirements

- JWT Authentication
- Authorization checks
- File type validation
- File size validation
- Secure file storage
- Audit logging
- HTTPS only

---

# API Information

## Get Profile

```
GET /api/v1/profile
```

---

## Update Profile

```
PUT /api/v1/profile
```

---

## Request Body

```json
{
  "firstName": "Narendra",
  "lastName": "Gore",
  "phoneNumber": "+919876543210",
  "timeZone": "Asia/Kolkata",
  "language": "en-IN",
  "theme": "dark"
}
```

---

## Success Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "data": {
    "id": "uuid",
    "firstName": "Narendra",
    "lastName": "Gore",
    "email": "narendra@example.com",
    "phoneNumber": "+919876543210",
    "profileImageUrl": "https://cdn.example.com/profile/user123.jpg",
    "timeZone": "Asia/Kolkata",
    "language": "en-IN",
    "theme": "dark"
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

Authentication required.

---

### HTTP 403 Forbidden

User is not authorized to update this profile.

---

### HTTP 413 Payload Too Large

Uploaded image exceeds maximum size.

---

### HTTP 415 Unsupported Media Type

Invalid image format.

---

### HTTP 500 Internal Server Error

Unexpected server error.

---

# Database Changes

## User

Updated Fields

- FirstName
- LastName
- PhoneNumber
- ProfileImageUrl
- TimeZone
- Language
- Theme
- UpdatedAt

---

## AuditLog

Insert profile update activity.

Example

| Field | Value |
|--------|-------|
| Action | Update Profile |
| UserId | UUID |
| Timestamp | Current UTC |
| IP Address | Client IP |

---

# UI Components

- Profile Page
- User Avatar
- Profile Form
- First Name Input
- Last Name Input
- Phone Number Input
- Profile Image Upload
- Theme Selector
- Language Selector
- Time Zone Selector
- Save Changes Button
- Cancel Button
- Loading Indicator
- Success Notification

---

# Backend Components

- ProfileController
- GetProfileQuery
- UpdateProfileCommand
- UpdateProfileCommandValidator
- UpdateProfileCommandHandler
- UserRepository
- FileStorageService
- AuditLogService
- Entity Framework Core
- Mapster

---

# Dependencies

- Authentication Module
- User Module
- File Storage Service
- Audit Logging
- PostgreSQL
- Entity Framework Core

---

# Acceptance Criteria

- Authenticated users can view their profile.
- Editable fields are updated successfully.
- Read-only fields cannot be modified.
- Uploaded profile image passes validation.
- Invalid image formats are rejected.
- Audit log entry is created.
- Updated profile information is returned.
- Success notification displayed.
- Standard API response returned.

---

# Test Cases

- View profile successfully.
- Update first name.
- Update last name.
- Update phone number.
- Upload valid profile image.
- Upload unsupported image format.
- Upload oversized image.
- Attempt unauthorized profile update.
- Submit invalid phone number.
- Verify audit log creation.
- Verify database update.
- Verify profile refresh after update.

---

# Definition of Done

- Get Profile API implemented.
- Update Profile API implemented.
- Profile UI completed.
- Image upload completed.
- Validation completed.
- Authorization implemented.
- Audit logging completed.
- Unit tests passed.
- Integration tests passed.
- API documented.
- Code reviewed.
- QA approved.
- Documentation updated.

---

# Future Enhancements

- Change Email with Verification
- Change Username
- Profile Completion Percentage
- Social Profile Links
- Two-Factor Authentication Settings
- Notification Preferences
- Privacy Settings
- Connected Devices
- Session Management

---

# Related Documents

- Software Requirements Specification (SRS)
- Functional Requirements Specification (FRS)
- Software Design Specification (SDS)
- API Specification
- Database Design
- Use Case UC-AUTH-006
- AUTH-002 — User Login
- User Management Module