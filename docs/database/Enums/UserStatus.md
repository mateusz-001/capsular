# UserStatus

## Purpose

Defines the current lifecycle state of a user account.

---

## Values

### ACTIVE

User account is active and can use the application normally.

### SUSPENDED

User account has been temporarily disabled.

### DELETION_PENDING

User has requested account deletion and removal is pending.

---

## Used By

- [[User]]

---

## Prisma Enum

```prisma
enum UserStatus
```
