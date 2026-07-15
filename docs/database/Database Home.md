# Database

## Purpose

This section contains the complete Capsular database domain model.

The database documentation is organized using Domain-Driven Design principles and divided into:

- Core Domain
- Supporting Domain
- Infrastructure Domain
- Enums

The purpose of this documentation is to describe business concepts, entity responsibilities and relationships independently from implementation details.

---

# Core Domain

Core Domain contains the most important business entities.

These entities represent the primary workflow of Capsular.

```txt
User
↓
Wardrobe Item
↓
Outfit
↓
Calendar Entry
↓
Wear Event
```

## Entities

- [[User]]
- [[WardrobeItem]]
- [[Outfit]]
- [[CalendarEntry]]
- [[WearEvent]]

---

# Supporting Domain

Supporting entities enrich the domain with metadata, personalization and categorization.

## Entities

- [[UserProfile]]
- [[Color]]
- [[Material]]
- [[Tag]]

---

# Infrastructure Domain

Infrastructure entities support relationships, integrations and persistence.

## Entities

- [[AuthSession]]
- [[WardrobeItemImage]]
- [[WardrobeItemColor]]
- [[WardrobeItemMaterial]]
- [[OutfitItem]]
- [[OutfitTag]]
- [[UserFavoriteColor]]
- [[WearEventItem]]

---

# Core Flow

See:

[[01 Core Flow]]

---

# Core Relationships

## User

```txt
User
├── UserProfile
├── AuthSession
├── WardrobeItem
├── Outfit
├── CalendarEntry
├── WearEvent
└── Tag
```

---

## Wardrobe

```txt
WardrobeItem
├── WardrobeItemImage
├── WardrobeItemColor
├── WardrobeItemMaterial
├── OutfitItem
└── WearEventItem
```

---

## Outfit Planning

```txt
Outfit
├── OutfitItem
├── OutfitTag
├── CalendarEntry
└── WearEvent
```

---

## Usage Tracking

```txt
WearEvent
└── WearEventItem
```

---

# Domain Hierarchy

## Tier 1 - Core Domain

These entities define the business value of Capsular.

- [[User]]
- [[WardrobeItem]]
- [[Outfit]]
- [[CalendarEntry]]
- [[WearEvent]]

---

## Tier 2 - Supporting Domain

These entities enrich the primary domain.

- [[UserProfile]]
- [[Color]]
- [[Material]]
- [[Tag]]

---

## Tier 3 - Infrastructure Domain

These entities support technical implementation and relationships.

- [[AuthSession]]
- [[WardrobeItemImage]]
- [[WardrobeItemColor]]
- [[WardrobeItemMaterial]]
- [[OutfitItem]]
- [[OutfitTag]]
- [[UserFavoriteColor]]
- [[WearEventItem]]

---

# MVP Scope

## Included

- [[User]]
- [[UserProfile]]
- [[WardrobeItem]]
- [[WardrobeItemImage]]
- [[Outfit]]
- [[OutfitItem]]
- [[CalendarEntry]]
- [[WearEvent]]

---

## Optional

- [[Tag]]
- [[OutfitTag]]
- [[UserFavoriteColor]]

---

# Future Capabilities

The current schema already supports:

- Outfit Planning
- Wardrobe Tracking
- Usage Analytics
- Cost Per Wear
- Wardrobe Utilization
- Capsule Wardrobe Metrics
- Recommendation Systems
- AI Wardrobe Advisor
- Purchase Simulator

---

# Related Documents

- [[01 Core Flow]]
