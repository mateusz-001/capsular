# CalendarEntry

## Purpose

Represents an outfit assigned to a specific date.

CalendarEntry is the main planning entity.

---

## Business Responsibilities

- Weekly Planning
- Monthly Planning
- Future Outfit Scheduling

---

## Properties

- id
- userId
- outfitId
- plannedDate
- contextLabel
- note
- createdAt
- updatedAt

---

## Relationships

### Owner

- [[User]]

### Planned Outfit

- [[Outfit]]

### Resulting Wear Event

- [[WearEvent]]

---

## Examples

```txt
Monday
↓
Business Casual

Thursday
↓
Travel Outfit
```

---

## Used By

- Calendar
- Dashboard

---

## Domain Classification

Core Domain
