# WardrobeItemImage

## Purpose

Stores image metadata for wardrobe items.

Allows a clothing item to have multiple images.

---

## Business Responsibilities

- Image Storage Metadata
- Cloudinary Integration
- Image Ordering

---

## Properties

- id
- wardrobeItemId
- cloudinaryPublicId
- secureUrl
- version
- format
- width
- height
- altText
- position
- createdAt

---

## Relationships

### Parent Item

- [[WardrobeItem]]

---

## Example

```txt
Wardrobe Item

White Oxford Shirt

Images

Front View
Back View
Close Up
```

---

## Used By

- Wardrobe
- Outfit Builder

---

## Domain Classification

Infrastructure Domain
