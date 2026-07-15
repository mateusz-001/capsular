# WardrobeItemColor

## Purpose

Connects wardrobe items with colors.

Allows a clothing item to have multiple colors with different roles.

---

## Business Responsibilities

- Color Assignment
- Color Classification

---

## Properties

- wardrobeItemId
- colorId
- role
- position

---

## Uses Enums

- [[ColorRole]]

---

## Relationships

### Wardrobe Item

- [[WardrobeItem]]

### Color

- [[Color]]

---

## Example

```txt
Navy Blazer

PRIMARY
→ Navy

ACCENT
→ Brown
```

---

## Used By

- Wardrobe Filters
- Search
- Future Recommendations

---

## Domain Classification

Infrastructure Domain
