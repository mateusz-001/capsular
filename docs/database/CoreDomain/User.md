# User

## Purpose

Represents a registered Capsular account.

The User entity is the root entity of the entire domain model.

Every wardrobe item, outfit, calendar entry and wear event belongs to a specific user.

---

## Business Responsibilities

- Authentication
- Authorization
- Data Ownership
- Personalization

---

## Properties

- id
- email
- passwordHash
- status
- emailVerifiedAt
- createdAt
- updatedAt

---

## Uses Enums

- [[UserStatus]]

---

## Relationships

### One To One

- [[UserProfile]]

### One To Many

- [[AuthSession]]
- [[WardrobeItem]]
- [[Outfit]]
- [[CalendarEntry]]
- [[WearEvent]]
- [[Tag]]
- [[UserFavoriteColor]]

---

## Used By

- Dashboard
- Profile
- Wardrobe
- Outfit Builder
- Calendar

---

## Core Flow

```txt
User
↓
WardrobeItems
↓
Outfits
↓
CalendarEntries
↓
WearEvents
```

---

## Domain Classification

Core Domain
