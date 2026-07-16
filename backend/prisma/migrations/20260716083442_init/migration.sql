-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETION_PENDING');

-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('METRIC', 'IMPERIAL');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('RECTANGLE', 'TRIANGLE', 'INVERTED_TRIANGLE', 'OVAL', 'HOURGLASS');

-- CreateEnum
CREATE TYPE "StylePreference" AS ENUM ('MINIMALIST', 'CLASSIC', 'NORDIC', 'WORKWEAR', 'SPORT', 'TAILORED', 'STREETWEAR');

-- CreateEnum
CREATE TYPE "Occasion" AS ENUM ('WORK', 'CASUAL', 'EVENING', 'TRAVEL', 'FORMAL', 'SPORT');

-- CreateEnum
CREATE TYPE "ShoppingFrequency" AS ENUM ('RARELY', 'FEW_TIMES_YEAR', 'SEASONALLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "PriceSensitivity" AS ENUM ('BUDGET', 'BALANCED', 'PREMIUM', 'INVESTMENT_ONLY');

-- CreateEnum
CREATE TYPE "WardrobeGoal" AS ENUM ('REDUCE_DECISIONS', 'BUILD_CAPSULE_WARDROBE', 'PLAN_OUTFITS', 'SHOP_SMARTER', 'TRACK_USAGE');

-- CreateEnum
CREATE TYPE "CapsuleStatus" AS ENUM ('STARTING', 'TRANSITIONING', 'MOSTLY_CAPSULE', 'FULLY_CAPSULE');

-- CreateEnum
CREATE TYPE "WardrobeCategory" AS ENUM ('TOP', 'BOTTOM', 'OUTERWEAR', 'SHOES', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'LAUNDRY', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER');

-- CreateEnum
CREATE TYPE "WaterResistance" AS ENUM ('NONE', 'WATER_RESISTANT', 'WATERPROOF');

-- CreateEnum
CREATE TYPE "ColorRole" AS ENUM ('PRIMARY', 'SECONDARY', 'ACCENT');

-- CreateEnum
CREATE TYPE "OutfitStatus" AS ENUM ('DRAFT', 'SAVED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OutfitSlot" AS ENUM ('TOP', 'BOTTOM', 'SHOES', 'OUTERWEAR', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "WearSource" AS ENUM ('DASHBOARD', 'CALENDAR', 'OUTFIT_PAGE', 'MANUAL');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "email_verified_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "first_name" VARCHAR(80),
    "last_name" VARCHAR(80),
    "date_of_birth" DATE,
    "country_code" CHAR(2),
    "city" VARCHAR(120),
    "time_zone" VARCHAR(64) NOT NULL DEFAULT 'UTC',
    "unit_system" "UnitSystem" NOT NULL DEFAULT 'METRIC',
    "height_cm" SMALLINT,
    "weight_kg" DECIMAL(5,2),
    "body_type" "BodyType",
    "preferred_styles" "StylePreference"[] DEFAULT ARRAY[]::"StylePreference"[],
    "typical_occasions" "Occasion"[] DEFAULT ARRAY[]::"Occasion"[],
    "shopping_frequency" "ShoppingFrequency",
    "price_sensitivity" "PriceSensitivity",
    "goals" "WardrobeGoal"[] DEFAULT ARRAY[]::"WardrobeGoal"[],
    "capsule_status" "CapsuleStatus",
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "auth_sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "revoked_at" TIMESTAMPTZ(3),
    "last_used_at" TIMESTAMPTZ(3),
    "user_agent" VARCHAR(512),
    "ip_address" INET,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "hex" CHAR(7) NOT NULL,
    "sort_order" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_colors" (
    "user_id" UUID NOT NULL,
    "color_id" UUID NOT NULL,

    CONSTRAINT "user_favorite_colors_pkey" PRIMARY KEY ("user_id","color_id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" UUID NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "slug" VARCHAR(80) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wardrobe_items" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "category" "WardrobeCategory" NOT NULL,
    "subcategory" VARCHAR(80),
    "brand" VARCHAR(100),
    "size" VARCHAR(40),
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "availability_changed_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "available_from" TIMESTAMPTZ(3),
    "unavailable_reason" VARCHAR(160),
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "seasons" "Season"[] DEFAULT ARRAY[]::"Season"[],
    "occasions" "Occasion"[] DEFAULT ARRAY[]::"Occasion"[],
    "warmth_level" SMALLINT,
    "water_resistance" "WaterResistance" NOT NULL DEFAULT 'NONE',
    "is_wind_resistant" BOOLEAN NOT NULL DEFAULT false,
    "purchase_date" DATE,
    "purchase_price" DECIMAL(12,2),
    "currency_code" CHAR(3),
    "wear_count_before_tracking" INTEGER NOT NULL DEFAULT 0,
    "last_worn_before_tracking" TIMESTAMPTZ(3),
    "archived_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "wardrobe_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wardrobe_item_images" (
    "id" UUID NOT NULL,
    "wardrobe_item_id" UUID NOT NULL,
    "cloudinary_public_id" VARCHAR(255) NOT NULL,
    "secure_url" TEXT NOT NULL,
    "version" INTEGER,
    "format" VARCHAR(20),
    "width" INTEGER,
    "height" INTEGER,
    "alt_text" VARCHAR(160),
    "position" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wardrobe_item_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wardrobe_item_colors" (
    "wardrobe_item_id" UUID NOT NULL,
    "color_id" UUID NOT NULL,
    "role" "ColorRole" NOT NULL DEFAULT 'PRIMARY',
    "position" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "wardrobe_item_colors_pkey" PRIMARY KEY ("wardrobe_item_id","color_id")
);

-- CreateTable
CREATE TABLE "wardrobe_item_materials" (
    "wardrobe_item_id" UUID NOT NULL,
    "material_id" UUID NOT NULL,
    "percentage" SMALLINT,

    CONSTRAINT "wardrobe_item_materials_pkey" PRIMARY KEY ("wardrobe_item_id","material_id")
);

-- CreateTable
CREATE TABLE "outfits" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(120),
    "description" TEXT,
    "status" "OutfitStatus" NOT NULL DEFAULT 'DRAFT',
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "occasions" "Occasion"[] DEFAULT ARRAY[]::"Occasion"[],
    "seasons" "Season"[] DEFAULT ARRAY[]::"Season"[],
    "warmth_override" SMALLINT,
    "archived_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "outfits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfit_items" (
    "id" UUID NOT NULL,
    "outfit_id" UUID NOT NULL,
    "wardrobe_item_id" UUID NOT NULL,
    "slot" "OutfitSlot" NOT NULL,
    "layer_order" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outfit_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outfit_tags" (
    "outfit_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "outfit_tags_pkey" PRIMARY KEY ("outfit_id","tag_id")
);

-- CreateTable
CREATE TABLE "calendar_entries" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "outfit_id" UUID NOT NULL,
    "planned_date" DATE NOT NULL,
    "context_label" VARCHAR(120),
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "calendar_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wear_events" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "outfit_id" UUID,
    "calendar_entry_id" UUID,
    "worn_at" TIMESTAMPTZ(3) NOT NULL,
    "source" "WearSource" NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wear_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wear_event_items" (
    "wear_event_id" UUID NOT NULL,
    "wardrobe_item_id" UUID NOT NULL,
    "slot_snapshot" "OutfitSlot" NOT NULL,
    "layer_order_snapshot" SMALLINT NOT NULL DEFAULT 0,
    "item_name_snapshot" VARCHAR(120) NOT NULL,
    "category_snapshot" "WardrobeCategory" NOT NULL,

    CONSTRAINT "wear_event_items_pkey" PRIMARY KEY ("wear_event_id","wardrobe_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_sessions_token_hash_key" ON "auth_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "auth_sessions_user_id_expires_at_idx" ON "auth_sessions"("user_id", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "colors_slug_key" ON "colors"("slug");

-- CreateIndex
CREATE INDEX "user_favorite_colors_color_id_idx" ON "user_favorite_colors"("color_id");

-- CreateIndex
CREATE UNIQUE INDEX "materials_slug_key" ON "materials"("slug");

-- CreateIndex
CREATE INDEX "wardrobe_items_user_id_archived_at_idx" ON "wardrobe_items"("user_id", "archived_at");

-- CreateIndex
CREATE INDEX "wardrobe_items_user_id_category_archived_at_idx" ON "wardrobe_items"("user_id", "category", "archived_at");

-- CreateIndex
CREATE INDEX "wardrobe_items_user_id_availability_archived_at_idx" ON "wardrobe_items"("user_id", "availability", "archived_at");

-- CreateIndex
CREATE INDEX "wardrobe_items_user_id_is_favorite_archived_at_idx" ON "wardrobe_items"("user_id", "is_favorite", "archived_at");

-- CreateIndex
CREATE UNIQUE INDEX "wardrobe_item_images_cloudinary_public_id_key" ON "wardrobe_item_images"("cloudinary_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "wardrobe_item_images_wardrobe_item_id_position_key" ON "wardrobe_item_images"("wardrobe_item_id", "position");

-- CreateIndex
CREATE INDEX "wardrobe_item_colors_color_id_wardrobe_item_id_idx" ON "wardrobe_item_colors"("color_id", "wardrobe_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "wardrobe_item_colors_wardrobe_item_id_role_position_key" ON "wardrobe_item_colors"("wardrobe_item_id", "role", "position");

-- CreateIndex
CREATE INDEX "wardrobe_item_materials_material_id_idx" ON "wardrobe_item_materials"("material_id");

-- CreateIndex
CREATE INDEX "outfits_user_id_status_archived_at_idx" ON "outfits"("user_id", "status", "archived_at");

-- CreateIndex
CREATE INDEX "outfits_user_id_is_favorite_archived_at_idx" ON "outfits"("user_id", "is_favorite", "archived_at");

-- CreateIndex
CREATE INDEX "outfit_items_wardrobe_item_id_idx" ON "outfit_items"("wardrobe_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "outfit_items_outfit_id_wardrobe_item_id_key" ON "outfit_items"("outfit_id", "wardrobe_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "outfit_items_outfit_id_slot_layer_order_key" ON "outfit_items"("outfit_id", "slot", "layer_order");

-- CreateIndex
CREATE UNIQUE INDEX "tags_user_id_slug_key" ON "tags"("user_id", "slug");

-- CreateIndex
CREATE INDEX "outfit_tags_tag_id_idx" ON "outfit_tags"("tag_id");

-- CreateIndex
CREATE INDEX "calendar_entries_outfit_id_planned_date_idx" ON "calendar_entries"("outfit_id", "planned_date");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_entries_user_id_planned_date_key" ON "calendar_entries"("user_id", "planned_date");

-- CreateIndex
CREATE UNIQUE INDEX "wear_events_calendar_entry_id_key" ON "wear_events"("calendar_entry_id");

-- CreateIndex
CREATE INDEX "wear_events_user_id_worn_at_idx" ON "wear_events"("user_id", "worn_at");

-- CreateIndex
CREATE INDEX "wear_events_outfit_id_worn_at_idx" ON "wear_events"("outfit_id", "worn_at");

-- CreateIndex
CREATE INDEX "wear_event_items_wardrobe_item_id_wear_event_id_idx" ON "wear_event_items"("wardrobe_item_id", "wear_event_id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_colors" ADD CONSTRAINT "user_favorite_colors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_colors" ADD CONSTRAINT "user_favorite_colors_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_items" ADD CONSTRAINT "wardrobe_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item_images" ADD CONSTRAINT "wardrobe_item_images_wardrobe_item_id_fkey" FOREIGN KEY ("wardrobe_item_id") REFERENCES "wardrobe_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item_colors" ADD CONSTRAINT "wardrobe_item_colors_wardrobe_item_id_fkey" FOREIGN KEY ("wardrobe_item_id") REFERENCES "wardrobe_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item_colors" ADD CONSTRAINT "wardrobe_item_colors_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item_materials" ADD CONSTRAINT "wardrobe_item_materials_wardrobe_item_id_fkey" FOREIGN KEY ("wardrobe_item_id") REFERENCES "wardrobe_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wardrobe_item_materials" ADD CONSTRAINT "wardrobe_item_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfits" ADD CONSTRAINT "outfits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfit_items" ADD CONSTRAINT "outfit_items_outfit_id_fkey" FOREIGN KEY ("outfit_id") REFERENCES "outfits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfit_items" ADD CONSTRAINT "outfit_items_wardrobe_item_id_fkey" FOREIGN KEY ("wardrobe_item_id") REFERENCES "wardrobe_items"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfit_tags" ADD CONSTRAINT "outfit_tags_outfit_id_fkey" FOREIGN KEY ("outfit_id") REFERENCES "outfits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outfit_tags" ADD CONSTRAINT "outfit_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_entries" ADD CONSTRAINT "calendar_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_entries" ADD CONSTRAINT "calendar_entries_outfit_id_fkey" FOREIGN KEY ("outfit_id") REFERENCES "outfits"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wear_events" ADD CONSTRAINT "wear_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wear_events" ADD CONSTRAINT "wear_events_outfit_id_fkey" FOREIGN KEY ("outfit_id") REFERENCES "outfits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wear_events" ADD CONSTRAINT "wear_events_calendar_entry_id_fkey" FOREIGN KEY ("calendar_entry_id") REFERENCES "calendar_entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wear_event_items" ADD CONSTRAINT "wear_event_items_wear_event_id_fkey" FOREIGN KEY ("wear_event_id") REFERENCES "wear_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wear_event_items" ADD CONSTRAINT "wear_event_items_wardrobe_item_id_fkey" FOREIGN KEY ("wardrobe_item_id") REFERENCES "wardrobe_items"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
