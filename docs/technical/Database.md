#technical 

## User

- id
- email
- passwordHash
- createdAt

## ClothingItem

- id
- userId
- name
- category
- color
- season
- imageUrl
- status

## Outfit

- id
- userId
- name

## OutfitItem

- outfitId
- clothingItemId

## CalendarEntry

- id
- date
- outfitId

## ClothingUsage

- clothingItemId
- wornAt