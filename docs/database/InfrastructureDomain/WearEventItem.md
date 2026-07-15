# WearEventItem

## Purpose

Stores a historical snapshot of wardrobe items used during a wear event.

This entity preserves history even if outfits or clothing items change later.

---

## Business Responsibilities

- Historical Tracking
- Usage Analytics
- Snapshot Preservation

---

## Properties

- wearEventId
- wardrobeItemId
- slotSnapshot
- layerOrderSnapshot
- itemNameSnapshot
- categorySnapshot

---

## Uses Enums

- [[OutfitSlot]]
- [[WardrobeCategory]]

---

## Relationships

### Wear Event

- [[WearEvent]]

### Wardrobe Item

- [[WardrobeItem]]

---

## Example

```txt
Wear Event

2026-10-15

Business Casual

Snapshot

White Oxford Shirt

Navy Chinos

Chelsea Boots

Wool Coat
```

---

## Why This Exists

Without snapshots:

```txt
Outfit changes
↓
History becomes inaccurate
```

With snapshots:

```txt
History remains unchanged
```

---

## Enables

- Times Worn
- Last Worn
- Cost Per Wear
- Usage Analytics

---

## Domain Classification

Infrastructure Domain
