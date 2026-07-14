# Capsular

  

## Overview

Capsular is a Personal Wardrobe Operating System designed for people who own capsule wardrobes and want to reduce clothing-related decision fatigue.

  

The product focuses on helping users:

  

- decide what to wear

- plan outfits

- manage wardrobe availability

- optimize wardrobe usage

- make more conscious purchasing decisions

  

Capsular is not a fashion application, social network, marketplace or AI stylist.

  

Capsular is a wardrobe management and decision-support platform.

  

Tagline:

  

> Less decisions. Better style.

  

---

  

# Mission

  

Help users get maximum utility from a minimal wardrobe.

  

Capsular should reduce cognitive load associated with clothing decisions and transform clothing planning into a lightweight, organized process.

  

---

  

# Target Audience

  

Primary Persona:

  

Mateusz

  

- Software Engineer

- Uses a capsule wardrobe

- Values quality over quantity

- Interested in productivity and minimalism

- Dislikes repetitive daily decisions

- Wants a practical wardrobe system rather than a fashion app

  

---

  

# Core Problems

  

1. I don't know what to wear tomorrow.

  

2. I don't know which clothes are available.

  

3. I don't know which clothes are currently in laundry.

  

4. I don't know which clothes I wear most frequently.

  

5. I don't know what is missing from my wardrobe.

  

6. I don't know whether buying a new item is worth it.

  

7. I don't fully utilize my wardrobe.

  

---

  

# Product Principles

  

1. Reduce Decisions

  

Every feature should reduce decision fatigue.

  

2. Quality Over Quantity

  

Support intentional wardrobe building.

  

3. Simplicity Over Complexity

  

Avoid unnecessary features.

  

4. AI Is Assistant, Not Product

  

AI supports user decisions but is not the primary value.

  

5. Every Feature Solves A Real User Problem

  

No vanity features.

  

---

  

# Repository Structure

  

Monorepo.

  

```txt

Capsular/

  

docs/

frontend/

backend/

marketing-website/

```

  

---

  

# Documentation

  

Managed through Obsidian.

  

Structure:

  

```txt

docs/

  

vision/

discovery/

product/

design/

technical/

adr/

wireframes/

```

  

---

  

# Product Modules

  

## Dashboard

  

### Goal

  

Help users understand what to wear today in less than 5 seconds.

  

### Responsibilities

  

- Display Today's Outfit

- Display Tomorrow's Outfit

- Show Outfit Readiness

- Surface potential problems

- Provide quick actions

- Show upcoming plans

  

### Key Features

  

#### Wear Today

  

Primary dashboard component.

  

Displays:

  

- outfit name

- list of clothing items

- weather compatibility

- availability status

  

Actions:

  

- Wear Today

- Swap Outfit

  

#### Tomorrow

  

Displays:

  

- tomorrow's planned outfit

- readiness status

  

#### Needs Attention

  

Alerts generated from user plans.

  

Examples:

  

- required item is in laundry

- weather conflicts

- missing outfit pieces

  

#### This Week

  

Compact weekly overview.

  

#### Quick Actions

  

- Build Outfit

- Plan Week

- Mark Laundry Done

  

### MVP

  

Included.

  

---

  

## Wardrobe

  

### Goal

  

Allow users to browse and manage their capsule wardrobe.

  

### Responsibilities

  

- Manage clothing items

- Track clothing usage

- Track clothing availability

  

### Features

  

#### CRUD

  

- Create clothing item

- Edit clothing item

- Delete clothing item

- Browse clothing item

  

#### Search

  

Search by:

  

- name

- category

  

#### Filters

  

Filter by:

  

- category

- color

- availability status

  

#### Availability Status

  

Available

  

Laundry

  

Unavailable

  

#### Metadata

  

For every item:

  

- image

- name

- category

- color

- availability

- times worn

- last worn

- purchase date

  

#### Favorites

  

Mark clothing items as favorites.

  

### MVP

  

Included.

  

---

  

## Outfit Builder

  

### Goal

  

Allow users to compose complete outfits from existing wardrobe items.

  

### Responsibilities

  

- Build outfits

- Validate completeness

- Suggest compatible items

  

### Structure

  

Required:

  

- Top

- Bottom

- Shoes

  

Optional:

  

- Outerwear

  

### Layers

  

Supports layered outfits.

  

Example:

  

```txt

T-Shirt

+

Overshirt

+

Coat

```

  

### Outfit Metadata

  

- occasion

- season

- favorite

- usage count

  

### Smart Suggestions

  

Suggest missing pieces from wardrobe.

  

Example:

  

```txt

Outerwear missing

  

Suggested:

- Wool Coat

- Rain Shell

- Leather Jacket

```

  

### Actions

  

- Save Draft

- Save Outfit

  

### MVP

  

Included.

  

---

  

## Saved Outfits

  

### Goal

  

Provide reusable wardrobe decisions.

  

### Responsibilities

  

- Store outfit combinations

- Enable quick reuse

- Assign outfits to calendar

  

### Features

  

#### Categories

  

- Work

- Casual

- Travel

- Evening

  

#### Metadata

  

- times worn

- last worn

- tags

  

#### Status

  

Ready

  

Laundry Conflict

  

Unavailable

  

#### Actions

  

- Wear Today

- Plan

- Edit

- Delete

  

### MVP

  

Included.

  

---

  

## Calendar

  

### Goal

  

Plan outfits ahead of time.

  

### Responsibilities

  

- Weekly planning

- Monthly planning

- Conflict detection

  

### Primary View

  

Month View

  

### Secondary View

  

Week View

  

### Day Details

  

Displays:

  

- assigned outfit

- weather

- readiness

- alerts

  

### Conflicts

  

Examples:

  

- required item in laundry

- weather mismatch

  

### Quick Assign

  

Assign Saved Outfit directly to day.

  

### Drag & Drop

  

Future enhancement.

  

### MVP

  

Included.

  

---

  

## User Profile

  

### Goal

  

Store user information for future personalization and recommendation systems.

  

### Required Data

  

- Email

- Password

  

### Optional Personal Information

  

- First Name

- Last Name

- Date of Birth

- Country

- City

  

### Optional Body Profile

  

- Height

- Weight

- Body Type

  

### Optional Style Preferences

  

- Preferred Styles

- Favorite Colors

- Typical Occasions

  

### Optional Shopping Preferences

  

- Shopping Frequency

- Price Sensitivity

  

### Optional Goals

  

- Reduce Decisions

- Build Capsule Wardrobe

- Plan Outfits

- Shop Smarter

- Track Usage

  

### Optional Capsule Wardrobe Status

  

- Starting

- Transitioning

- Mostly Capsule

- Fully Capsule

  

### Product Decision

  

Collect data early to enable future AI-powered features.

  

### MVP

  

Included.

  

---

  

# User Flows

  

## Create Outfit And Schedule

  

```txt

Dashboard

↓

Outfit Builder

↓

Save Outfit

↓

Calendar

↓

Assign Outfit To Day

```

  

---

  

## Schedule Existing Outfit

  

```txt

Dashboard

↓

Calendar

↓

Assign Saved Outfit

```

  

---

  

## Wear Outfit

  

```txt

Dashboard

↓

Wear Today

↓

Create Wear Event

↓

Update Times Worn

↓

Recalculate Cost Per Wear

```

  

---

  

# Domain Model

  

## User

  

Owns:

  

- Wardrobe Items

- Outfits

- Calendar Entries

- Wear Events

  

---

  

## Wardrobe Item

  

Represents a clothing item.

  

Examples:

  

- Shirt

- T-Shirt

- Chinos

- Sneakers

- Coat

  

---

  

## Outfit

  

Collection of clothing items.

  

Contains:

  

- Top

- Bottom

- Shoes

- Optional Layers

- Optional Outerwear

  

---

  

## Calendar Entry

  

Represents outfit assignment for a specific day.

  

---

  

## Wear Event

  

Represents a real usage event.

  

Used for:

  

- Times Worn

- Last Worn

- Cost Per Wear

  

---

  

# Future Features

  

## V2

  

### Weather Integration

  

- forecasts

- weather-aware planning

  

### Laundry Workflows

  

- washing queue

- laundry reminders

  

---

  

## V3

  

### Analytics

  

- most worn items

- least worn items

- wardrobe utilization

  

### Capsule Score

  

Calculated wardrobe efficiency.

  

---

  

## V4

  

### AI Categorization

  

Photo analysis:

  

- category

- color

- season

  

---

  

## V5

  

### AI Wardrobe Advisor

  

Suggestions:

  

- wardrobe gaps

- utilization opportunities

  

---

  

## V6

  

### Purchase Simulator

  

Example:

  

```txt

White Oxford Shirt

  

+12 potential outfits

  

+18% wardrobe diversity

```

  

### Personalized Recommendations

  

Based on:

  

- wardrobe contents

- usage history

- profile data

- style preferences

- purchase behavior

  

---

  

# Technical Stack

  

## Frontend

  

- Next.js

- TypeScript

- Tailwind CSS

- shadcn/ui

- TanStack Query

- Zustand

- React Hook Form

- Zod

  

---

  

## Backend

  

- Node.js

- Express

- TypeScript

- Prisma

  

---

  

## Database

  

- PostgreSQL

  

---

  

## Storage

  

- Cloudinary

  

---

  

## AI

  

- OpenAI API

  

---

  

# Current Project Status

  

Completed:

  

✅ Product Idea

  

✅ Vision

  

✅ Mission

  

✅ Persona

  

✅ User Problems

  

✅ MVP Scope

  

✅ Roadmap

  

✅ UX Exploration

  

✅ Figma Iterations

  

✅ Lovable Iterations

  

✅ Product Flows

  

✅ Repository Setup

  

✅ Obsidian Knowledge Base

  

✅ UX Direction

  

In Progress:

  

🟡 UX Freeze

  

🟡 Domain Modeling

  

Next Steps:

  

🔜 Domain Model

  

🔜 ERD

  

🔜 Database Design

  

🔜 API Design

  

🔜 Prisma Schema

  

🔜 Frontend Bootstrap

  

🔜 Backend Bootstrap

  

🔜 Development

`