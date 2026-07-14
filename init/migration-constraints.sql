CREATE UNIQUE INDEX wardrobe_item_one_primary_color
ON wardrobe_item_colors (wardrobe_item_id)
WHERE role = 'PRIMARY';

ALTER TABLE wardrobe_items
ADD CONSTRAINT wardrobe_items_warmth_check
CHECK (warmth_level IS NULL OR warmth_level BETWEEN 1 AND 5),
ADD CONSTRAINT wardrobe_items_purchase_price_check
CHECK (purchase_price IS NULL OR purchase_price >= 0),
ADD CONSTRAINT wardrobe_items_wear_count_check
CHECK (wear_count_before_tracking >= 0);

ALTER TABLE user_profiles
ADD CONSTRAINT user_profiles_height_check
CHECK (height_cm IS NULL OR height_cm > 0),
ADD CONSTRAINT user_profiles_weight_check
CHECK (weight_kg IS NULL OR weight_kg > 0);

ALTER TABLE outfits
ADD CONSTRAINT outfits_warmth_override_check
CHECK (warmth_override IS NULL OR warmth_override BETWEEN 1 AND 5);

ALTER TABLE outfit_items
ADD CONSTRAINT outfit_items_layer_order_check
CHECK (layer_order >= 0);

ALTER TABLE wardrobe_item_images
ADD CONSTRAINT wardrobe_item_images_position_check
CHECK (position >= 0);

ALTER TABLE wardrobe_item_colors
ADD CONSTRAINT wardrobe_item_colors_position_check
CHECK (position >= 0);

ALTER TABLE wardrobe_item_materials
ADD CONSTRAINT wardrobe_item_materials_percentage_check
CHECK (percentage IS NULL OR percentage BETWEEN 1 AND 100);

ALTER TABLE users
ADD CONSTRAINT users_email_normalized_check
CHECK (email = lower(trim(email)));

ALTER TABLE colors
ADD CONSTRAINT colors_hex_check
CHECK (hex ~ '^#[0-9A-Fa-f]{6}$');
