# WardrobeItem

## Purpose

Represents a clothing item owned by the user.

This is the primary inventory entity in Capsular.

---

## Business Responsibilities

- Clothing Management
- Availability Tracking
- Usage Tracking
- Purchase Tracking

---

## Properties

- id
- userId
- name
- description
- category
- subcategory
- brand
- size
- availability
- availabilityChangedAt
- availableFrom
- unavailableReason
- isFavorite
- seasons
- occasions
- warmthLevel
- waterResistance
- isWindResistant
- purchaseDate
- purchasePrice
- currencyCode
- wearCountBeforeTracking
- lastWornBeforeTracking
- archivedAt
- createdAt
- updatedAt

---

## Uses Enums

- [[WardrobeCategory]]
- [[AvailabilityStatus]]
- [[Season]]
- [[Occasion]]
- [[WaterResistance]]

---

## Relationships

### Owner

- [[User]]

### Images

- [[WardrobeItemImage]]

### Colors

- [[WardrobeItemColor]]

### Materials

- [[WardrobeItemMaterial]]

### Outfit Usage

- [[OutfitItem]]

### Historical Usage

- [[WearEventItem]]

---

## Examples

```txt
White Oxford Shirt

Chelsea Boots

Raw Denim

Wool Overcoat
```

---

## Used By

- Wardrobe
- Outfit Builder
- Calendar
- Dashboard

---

## Domain Classification

Core Domain
