# Capsular App Context

## What This Is

Capsular is a personal wardrobe operating system for minimalists.
It is a decision-support product for managing a capsule wardrobe, not a fashion app.

Core promise: less decisions, better style.

## Target User

Primary persona: Mateusz, a 24-year-old software engineer who values practicality, minimalism, and productivity.

He wants to:

- decide what to wear quickly
- plan outfits ahead of time
- see what clothes are available
- track what is in laundry
- understand wardrobe usage
- identify wardrobe gaps
- make more conscious purchases

## Problems To Solve

Capsular exists to reduce these recurring problems:

- I do not know what to wear tomorrow.
- I do not know which clothes are currently available.
- I do not know which clothes are being overused.
- I do not know what is missing in my wardrobe.
- I do not know whether buying a specific item makes sense.
- I am not using the full potential of my capsule wardrobe.

## MVP Scope

The first version focuses on value without AI.

Included:

- authentication
- wardrobe management
- outfit creation and editing
- calendar-based outfit planning
- usage tracking such as times worn and last worn

Explicitly out of scope for the MVP:

- AI wardrobe advisor
- weather integration
- purchase simulator
- mobile application

## Roadmap Direction

Planned growth is staged:

- V1: wardrobe, outfit builder, calendar, usage tracking
- V2: clothing statuses, laundry workflow, weather integration
- V3: wardrobe analytics
- V4: AI categorization from photos to metadata
- V5: AI wardrobe advisor and wardrobe gap analysis
- V6: purchase simulator for projected impact of new purchases

## Product Principles

The product should stay aligned to these principles:

- reduce decisions
- maximize wardrobe utilization
- support conscious consumerism
- keep the experience simple, practical, and efficient

## Technical Direction

Current architecture decisions:

- monorepo for shared documentation and shared types
- PostgreSQL because the domain is highly relational
- Next.js for the frontend and future marketing site

Preferred stack:

- frontend: Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand, React Hook Form, Zod
- backend: Node.js, Express, TypeScript, Prisma, PostgreSQL
- storage: Cloudinary
- deployment: Vercel for frontend, Railway or Render for backend, Neon PostgreSQL for the database

## Domain Model

The core entities are:

- User
- ClothingItem
- Outfit
- OutfitItem
- CalendarEntry
- ClothingUsage

## Source Docs

- [[Vision]]
- [[Mission]]
- [[Positioning]]
- [[Product]]
- [[MVP]]
- [[Roadmap]]
- [[User Stories]]
- [[User flows]]
- [[Architecture]]
- [[Database]]
- [[Stack]]

# Product Principles

## Principle 1

Reduce Decisions

Every feature should reduce cognitive load.

---

## Principle 2

Quality Over Quantity

Focus on wardrobe optimization, not wardrobe expansion.

---

## Principle 3

Simple Beats Smart

Simple solutions are preferred over complex ones.

---

## Principle 4

AI Is An Assistant

AI supports the product but is not the product itself.

---

## Principle 5

Every Feature Solves A Real Problem

Features must be tied directly to user pain points.

---

# Product Vision

Capsular should evolve into a complete wardrobe operating system that helps users:

- plan

- organize

- track

- optimize

their clothing decisions.

---

# MVP Scope

## Authentication

### Features

- Register

- Login

- Logout

---

## Wardrobe

### Features

- Add clothing item

- Edit clothing item

- Delete clothing item

- Browse wardrobe

---

## Outfit Builder

### Features

- Create outfit

- Edit outfit

- Delete outfit

---

## Calendar

### Features

- Assign outfit to day

- View planned outfits

---

## Usage Tracking

### Features

- Times Worn

- Last Worn

---

# MVP Exclusions

The following are intentionally excluded from MVP:

- AI recommendations

- Weather integration

- Purchase simulator

- Mobile application

- Social features

- Marketplace

---

# Roadmap

## V1

### Core MVP

- Wardrobe

- Outfit Builder

- Calendar

- Usage Tracking

---

## V2

### Organization

- Clothing Statuses

- Laundry Workflow

- Weekly Planning

- Weather Integration

---

## V3

### Analytics

- Most Worn Items

- Least Worn Items

- Wardrobe Utilization

- Cost Per Wear

---

## V4

### AI Categorization

Photo analysis:

- category

- color

- season

- style

---

## V5

### AI Wardrobe Advisor

Wardrobe gap analysis.

Example:

"You own 5 black t-shirts and no light shirts."

---

## V6

### Purchase Simulator

Example:

White Oxford Shirt

Result:

- +12 outfit combinations

- +18% wardrobe diversity

- projected cost per outfit

---

# Figma Make Review

## Strong Areas

### Wardrobe

Rating: 9/10

Strengths:

- excellent filtering

- strong layout

- clear navigation

- intuitive browsing

---

### Calendar

Rating: 9/10

Strengths:

- simple visual planning

- easy weekly overview

- strong UX

---

### Add Item

Rating: 9/10

Strengths:

- clean flow

- minimal friction

- simple form structure

---

# UX Issues Identified

## Dashboard

Current Rating: 7/10

### Problem

Tomorrow Outfit card is too image-focused.

When outfit photos are missing or insufficient, layout becomes weak.

### Proposed Improvement

Display clothing as structured list:

- thumbnail

- clothing name

- color

Example:

White Oxford Shirt

Color: White

Navy Chinos

Color: Navy

Brown Loafers

Color: Brown

Add:

- Edit Outfit

- Change Outfit

- Ready To Wear Status

---

### Missing Features

- weather

- clothing availability

- quick actions

- wardrobe insights

---

## Weekly Planner

Current Rating: 7/10

### Problem

Outfits are difficult to recognize from a single thumbnail.

### Proposed Improvement

Display:

- outfit name

- outfit category

- multiple garment thumbnails

Example:

Business Casual

👔 👖 👞

---

## Outfit Builder

Current Rating: 5/10

### Problems

#### Images Are Too Large

Feels more like Pinterest than wardrobe management.

#### Missing Metadata

Each clothing card should display:

- Name

- Color

- Status

- Times Worn

#### Missing Outfit Structure

Current behavior:

Select any clothing pieces.

Proposed structure:

Top ✅

Bottom ✅

Shoes ❌

Outerwear ❌

#### Missing Favorites

Add:

- Favorite Clothes

- Favorite Outfits

---

# Next Figma Iteration Goal

Transform Capsular from:

Wardrobe Gallery

into:

Wardrobe Decision System

---

## Dashboard Requirements

Make Tomorrow's Outfit the primary focus.

Include:

- weather

- outfit readiness

- clothing availability

- quick actions

- wardrobe insights

---

## Weekly Planner Requirements

Improve outfit recognition.

Display:

- outfit labels

- outfit categories

- multiple thumbnails

---

## Outfit Builder Requirements

Use predefined outfit slots:

- Top

- Bottom

- Shoes

- Outerwear

Display:

- favorites

- metadata

- availability

- usage information

Reduce image dominance.

---

# Technology Stack

## Frontend

- Next.js

- TypeScript

- Tailwind CSS

- shadcn/ui

- TanStack Query

- Zustand

- React Hook Form

- Zod

### Planned Next.js Features

- App Router

- Server Components

- Streaming

- Suspense

- Route Groups

- Intercepting Routes

- Partial Prerendering

### Explicitly Avoiding

- Server Actions

Reason:

Business logic will live inside Express API.

---

## Backend

- Node.js

- Express

- TypeScript

- Prisma

- Zod

---

## Database

- PostgreSQL

---

## Authentication

### MVP

- Email

- Password

### Future

- Google OAuth

---

## Storage

### MVP

- Cloudinary

### Future

- AWS S3

---

## AI

### Future

- OpenAI API

---

# Repository Structure

Monorepo

```txt

Capsular/



docs/

frontend/

backend/

marketing-website/

```

---

# Marketing Website

Separate project.

Future CMS:

- Storyblok

Purpose:

- marketing

- blog

- SEO

- product positioning

---

# Documentation

Stored in Obsidian.

Structure:

```txt

docs/



vision/

discovery/

product/

technical/

adr/

wireframes/

```

---

# Current Project Status

## Completed

✅ Product Idea

✅ Name

✅ Vision

✅ Mission

✅ Persona

✅ Problem Definition

✅ MVP Scope

✅ Roadmap

✅ Stack Selection

✅ Repository Setup

✅ GitHub Setup

✅ SSH Configuration

✅ Obsidian Setup

✅ Figma Make v1

---

# Next Steps

1. Figma Make v2

2. Refined Wireframes

3. Design System

4. Database Design

5. API Design

6. Frontend Architecture

7. Development

---

# Current Assessment

Capsular is no longer just an idea.

It already has:

- vision

- user persona

- product strategy

- roadmap

- repository

- documentation

- stack

- first mockups

The project is currently in the transition phase between Product Discovery and Product Design.
