# Outfit

## Purpose

Represents a reusable clothing combination.

An Outfit is the primary planning unit within Capsular.

---

## Business Responsibilities

- Outfit Management
- Planning
- Reuse
- Scheduling

---

## Properties

- id
- userId
- name
- description
- status
- isFavorite
- occasions
- seasons
- warmthOverride
- archivedAt
- createdAt
- updatedAt

---

## Uses Enums

- [[OutfitStatus]]
- [[Occasion]]
- [[Season]]

---

## Relationships

### Owner

- [[User]]

### Items

- [[OutfitItem]]

### Tags

- [[OutfitTag]]

### Planning

- [[CalendarEntry]]

### Usage

- [[WearEvent]]

---

## Examples

```txt
Business Casual

Nordic Minimalist

Weekend Ease

Travel Outfit
```

---

## Used By

- Dashboard
- Saved Outfits
- Calendar
- Outfit Builder

---

## Domain Classification

Core Domain
