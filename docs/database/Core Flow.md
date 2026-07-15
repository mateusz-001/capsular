# Core Flow

## Purpose

The Core Flow describes the primary business process of Capsular.

The goal of the application is not to store clothing.

The goal is to help users make better clothing decisions and track wardrobe usage.

---

# High Level Flow

```txt
User
↓
Creates Wardrobe Items
↓
Creates Outfit
↓
Plans Outfit
↓
Wears Outfit
↓
Generates Wear Event
↓
Produces Analytics
```

---

# Detailed Flow

## 1. User

Entity:

[[User]]

The user owns all application resources.

The user is the root of the domain model.

---

## 2. Wardrobe Management

Entity:

[[WardrobeItem]]

The user builds a digital representation of a real wardrobe.

Examples:

```txt
White Oxford Shirt

Chelsea Boots

Raw Denim

Wool Coat
```

Supporting entities:

- [[WardrobeItemImage]]
- [[WardrobeItemColor]]
- [[WardrobeItemMaterial]]

---

## 3. Outfit Creation

Entity:

[[Outfit]]

The user creates reusable clothing combinations.

Examples:

```txt
Business Casual

Nordic Minimalist

Weekend Ease
```

Supporting entity:

- [[OutfitItem]]

---

## 4. Outfit Organization

Entities:

- [[Tag]]
- [[OutfitTag]]

Outfits can be grouped and categorized.

Examples:

```txt
Work

Travel

Meeting

Autumn
```

---

## 5. Planning

Entity:

[[CalendarEntry]]

The user assigns outfits to specific days.

Example:

```txt
Monday
↓
Business Casual

Thursday
↓
Travel Outfit
```

Important:

Calendar entries reference an outfit.

Calendar entries do not reference wardrobe items directly.

---

## 6. Wearing

Entity:

[[WearEvent]]

When the user wears an outfit, a wear event is created.

This is one of the most important events in the entire system.

Example:

```txt
October 15

Business Casual

Worn
```

---

## 7. Snapshot Creation

Entity:

[[WearEventItem]]

A snapshot of the actual clothing pieces is stored.

This ensures historical accuracy even if outfits change later.

---

## 8. Analytics

Generated from:

- [[WearEvent]]
- [[WearEventItem]]

Examples:

```txt
Times Worn

Last Worn

Wardrobe Utilization

Cost Per Wear
```

---

# Domain Flow Diagram

```txt
User
 │
 ▼
WardrobeItem
 │
 ▼
Outfit
 │
 ▼
CalendarEntry
 │
 ▼
WearEvent
 │
 ▼
WearEventItem
 │
 ▼
Analytics
```

---

# Why This Flow Matters

Capsular is not centered around wardrobe items.

Capsular is centered around wear events.

The ultimate purpose of every entity is to support better clothing decisions and record actual clothing usage.

This means:

```txt
WardrobeItem
is not the destination.

WearEvent
is the destination.
```

---

# Related Documents

## Core Domain

- [[User]]
- [[WardrobeItem]]
- [[Outfit]]
- [[CalendarEntry]]
- [[WearEvent]]

## Supporting Domain

- [[UserProfile]]
- [[Color]]
- [[Material]]
- [[Tag]]

## Infrastructure Domain

- [[AuthSession]]
- [[WardrobeItemImage]]
- [[WardrobeItemColor]]
- [[WardrobeItemMaterial]]
- [[OutfitItem]]
- [[OutfitTag]]
- [[UserFavoriteColor]]
- [[WearEventItem]]
