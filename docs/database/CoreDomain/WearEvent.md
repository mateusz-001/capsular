# WearEvent

## Purpose

Represents an actual outfit usage event.

WearEvent is the most important analytical entity in the application.

---

## Business Responsibilities

- Usage Tracking
- Analytics
- Recommendation Data

---

## Properties

- id
- userId
- outfitId
- calendarEntryId
- wornAt
- source
- note
- createdAt

---

## Uses Enums

- [[WearSource]]

---

## Relationships

### Owner

- [[User]]

### Outfit

- [[Outfit]]

### Calendar Entry

- [[CalendarEntry]]

### Snapshot Items

- [[WearEventItem]]

---

## Enables

- Times Worn
- Last Worn
- Wardrobe Analytics
- Cost Per Wear
- Future Recommendations

---

## Core Flow

```txt
Calendar Entry
↓
Wear Today
↓
Wear Event
↓
Analytics
```

---

## Domain Classification

Core Domain
