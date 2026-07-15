# Capsular Database Domain Model

## Overview

The Capsular database is designed around a simple business flow:

```txt
User
↓
Wardrobe Items
↓
Outfits
↓
Calendar Planning
↓
Wear Events
↓
Analytics & Recommendations
```

The primary goal of the system is not to store clothing items, but to track wardrobe usage and support clothing-related decision making.

The database is designed to support both the MVP and future roadmap features such as:

- Wardrobe Analytics
- AI Recommendations
- Purchase Simulator
- Wardrobe Gap Analysis
- Style Personalization

---

# User Domain

## User

Represents a registered application account.

### Responsibilities

- Authentication
- Authorization
- Ownership of all user-related resources

### Properties

```txt
id
email
passwordHash
status
emailVerifiedAt
createdAt
updatedAt
```

### Relationships

```txt
User
├── UserProfile
├── AuthSessions
├── WardrobeItems
├── Outfits
├── CalendarEntries
├── WearEvents
├── Tags
└── FavoriteColors
```

---

## UserProfile

Stores optional profile information used for personalization and future recommendation features.

### Responsibilities

- Personal Information
- Style Preferences
- Shopping Preferences
- Capsule Wardrobe Metadata

### Properties

```txt
userId

firstName
lastName

dateOfBirth

countryCode
city
timeZone

unitSystem

heightCm
weightKg
bodyType

preferredStyles

typicalOccasions

shoppingFrequency
priceSensitivity

goals

capsuleStatus

createdAt
updatedAt
```

### Future Usage

- AI Wardrobe Advisor
- Purchase Simulator
- Personalized Recommendations
- Style Analysis

---

## AuthSession

Represents a login session for a specific device.

### Responsibilities

- Session Management
- Login Tracking
- Security

### Properties

```txt
id
userId

tokenHash

expiresAt
revokedAt
lastUsedAt

userAgent
ipAddress

createdAt
```

---

# Preference Domain

## Color

Represents an available color in the system.

### Responsibilities

- Standardized color catalog
- Wardrobe item color assignment
- User preference tracking

### Properties

```txt
id

name

slug

hex

sortOrder
```

### Examples

```txt
Black
White
Navy
Olive
Beige
```

---

## Material

Represents a fabric or material.

### Responsibilities

- Standardized material catalog

### Properties

```txt
id

name

slug
```

### Examples

```txt
Cotton
Wool
Linen
Leather
Denim
```

---

## UserFavoriteColor

Represents user's preferred colors.

### Responsibilities

- Style preference tracking

### Properties

```txt
userId
colorId
```

---

# Wardrobe Domain

## WardrobeItem

Represents a clothing item owned by the user.

### Responsibilities

- Store clothing metadata
- Track availability
- Store purchase information
- Support analytics

### Properties

```txt
id

userId

name
description

category
subcategory

brand
size

availability

availabilityChangedAt
availableFrom
unavailableReason

isFavorite

seasons
occasions

warmthLevel

waterResistance
isWindResistant

purchaseDate
purchasePrice
currencyCode

wearCountBeforeTracking
lastWornBeforeTracking

archivedAt

createdAt
updatedAt
```

### Examples

```txt
White Oxford Shirt
Raw Denim Jeans
Chelsea Boots
Wool Overcoat
```

### Relationships

```txt
WardrobeItem
├── Images
├── Colors
├── Materials
├── OutfitItems
└── WearEventItems
```

---

## WardrobeItemImage

Stores images assigned to wardrobe items.

### Responsibilities

- Image storage metadata
- Cloudinary integration

### Properties

```txt
id

wardrobeItemId

cloudinaryPublicId

secureUrl

version
format

width
height

altText

position

createdAt
```

---

## WardrobeItemColor

Assigns colors to wardrobe items.

### Responsibilities

- Primary color assignment
- Secondary color assignment
- Accent color assignment

### Properties

```txt
wardrobeItemId

colorId

role

position
```

### Color Roles

```txt
PRIMARY

SECONDARY

ACCENT
```

---

## WardrobeItemMaterial

Assigns materials to wardrobe items.

### Responsibilities

- Material composition tracking

### Properties

```txt
wardrobeItemId

materialId

percentage
```

### Examples

```txt
80% Wool
20% Nylon
```

---

# Outfit Domain

## Outfit

Represents a complete clothing combination.

### Responsibilities

- Store reusable outfit configurations
- Support planning
- Support recommendations

### Properties

```txt
id

userId

name
description

status

isFavorite

occasions
seasons

warmthOverride

archivedAt

createdAt
updatedAt
```

### Examples

```txt
Business Casual

Nordic Minimalist

Weekend Ease

Travel Outfit
```

### Relationships

```txt
Outfit
├── OutfitItems
├── OutfitTags
├── CalendarEntries
└── WearEvents
```

---

## OutfitItem

Connects wardrobe items to outfits.

### Responsibilities

- Outfit composition
- Slot assignment
- Layer management

### Properties

```txt
id

outfitId

wardrobeItemId

slot

layerOrder

createdAt
```

### Supported Slots

```txt
TOP
BOTTOM
SHOES
OUTERWEAR
ACCESSORY
```

### Layer Example

```txt
TOP
├── T-Shirt
└── Overshirt

OUTERWEAR
└── Wool Coat
```

---

## Tag

Custom user-defined tag.

### Responsibilities

- Outfit categorization
- Search and filtering

### Properties

```txt
id

userId

name

slug

createdAt
```

### Examples

```txt
Work
Meeting
Travel
Autumn
```

---

## OutfitTag

Connects outfits with tags.

### Responsibilities

- Many-to-many relationship between tags and outfits

### Properties

```txt
outfitId
tagId
```

---

# Planning Domain

## CalendarEntry

Represents an outfit assigned to a specific date.

### Responsibilities

- Outfit planning
- Weekly planning
- Monthly planning

### Properties

```txt
id

userId

outfitId

plannedDate

contextLabel

note

createdAt
updatedAt
```

### Examples

```txt
Client Meeting

Business Trip

Wedding

Conference
```

### Relationships

```txt
CalendarEntry
└── Outfit
```

---

# Usage Tracking Domain

## WearEvent

Represents an actual outfit usage event.

### Responsibilities

- Track outfit usage
- Generate analytics
- Power recommendation systems

### Properties

```txt
id

userId

outfitId

calendarEntryId

wornAt

source

note

createdAt
```

### Wear Sources

```txt
DASHBOARD

CALENDAR

OUTFIT_PAGE

MANUAL
```

### Importance

WearEvent is the most important analytical entity in the system.

It enables:

- Times Worn
- Last Worn
- Wardrobe Utilization
- Cost Per Wear
- Recommendation Engines
- AI Features

---

## WearEventItem

Stores a historical snapshot of clothing items used during a wear event.

### Responsibilities

- Preserve historical data
- Prevent future outfit modifications from changing past records

### Properties

```txt
wearEventId

wardrobeItemId

slotSnapshot

layerOrderSnapshot

itemNameSnapshot

categorySnapshot
```

### Example

```txt
Wear Event

2026-10-15

Business Casual

Snapshot:

White Oxford Shirt
Navy Chinos
Chelsea Boots
Wool Overcoat
```

Even if the original outfit changes later, this record remains unchanged.

---

# Core Relationships

```txt
User
│
├── UserProfile
├── AuthSession
├── WardrobeItem
│      ├── WardrobeItemImage
│      ├── WardrobeItemColor
│      └── WardrobeItemMaterial
│
├── Outfit
│      ├── OutfitItem
│      └── OutfitTag
│
├── CalendarEntry
│
└── WearEvent
       └── WearEventItem

Color
├── WardrobeItemColor
└── UserFavoriteColor

Material
└── WardrobeItemMaterial

Tag
└── OutfitTag
```

---

# Core Business Flow

```txt
User
↓
Creates Wardrobe Items
↓
Creates Outfit
↓
Assigns Outfit To Calendar
↓
Wears Outfit
↓
Creates Wear Event
↓
Generates Analytics
↓
Drives Future Recommendations
```

---

# Domain Hierarchy

## Tier 1 - Core Business Entities

```txt
User
WardrobeItem
Outfit
CalendarEntry
WearEvent
```

---

## Tier 2 - Supporting Entities

```txt
UserProfile
Tag
Color
Material
```

---

## Tier 3 - Infrastructure Entities

```txt
AuthSession
WardrobeItemImage
WardrobeItemColor
WardrobeItemMaterial
OutfitTag
UserFavoriteColor
WearEventItem
```
