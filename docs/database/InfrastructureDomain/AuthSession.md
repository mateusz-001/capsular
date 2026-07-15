# AuthSession

## Purpose

Represents an authenticated user session.

Used to manage login state, device tracking and account security.

---

## Business Responsibilities

- Session Management
- User Authentication
- Device Tracking
- Security Auditing

---

## Properties

- id
- userId
- tokenHash
- expiresAt
- revokedAt
- lastUsedAt
- userAgent
- ipAddress
- createdAt

---

## Relationships

### Owner

- [[User]]

---

## Used By

- Authentication Module
- Authorization Middleware

---

## Example

```txt
Mateusz
↓
Logs in from Chrome
↓
Creates AuthSession
```

---

## Domain Classification

Infrastructure Domain
