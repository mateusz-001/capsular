# WardrobeItemMaterial

## Purpose

Connects wardrobe items with materials.

Supports material composition tracking.

---

## Business Responsibilities

- Material Assignment
- Composition Tracking

---

## Properties

- wardrobeItemId
- materialId
- percentage

---

## Relationships

### Wardrobe Item

- [[WardrobeItem]]

### Material

- [[Material]]

---

## Example

```txt
Merino Sweater

80% Wool

20% Nylon
```

---

## Used By

- Clothing Metadata
- Future Recommendations

---

## Domain Classification

Infrastructure Domain
