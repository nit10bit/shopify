# Shopify Theme Development Test - Gabriel's Submission

## Design Decisions

### Consistency & Standards
- **Typography & Spacing**: Headers, spacing, button styles, and swatch sizes were standardised throughout the theme to maintain visual consistency
- **Metal Swatch Images**: Metal variant swatch images use a larger scale of the variant image with a slight left-of-centre focus, as specified in the Figma design file
- **Dawn Integration**: Custom blocks were built following Dawn's modern preset and block-driven architecture to ensure seamless integration with the theme

## Metafield/Metaobject Setup

### Variant Metafields
- **Short Name** (variant-level): Provides custom short names for variant swatches display
  - **Namespace and key**: `custom.short_name`
  - **Type**: Single line text
- **Made to Order** (variant-level): Mark variants as made-to-order items
  - **Namespace and key**: `custom.made_to_order`
  - **Type**: Boolean (True/False)
- **Delivery Date** (variant-level): Estimated delivery date for made-to-order variants
  - **Namespace and key**: `custom.delivery_date`
  - **Type**: Date

### Product Metafields
- **Variant Display Options** (product-level): Configure custom swatch display styles by entering the option name and selecting the visualisation style
  - **Namespace and key**: `custom.variant_display_options`
  - **Type**: List of Metaobjects
- **Complementary Products** (product-level): Select related products to display in the complementary products section
  - **Namespace and key**: `custom.complementary_products`
  - **Type**: List of Product References

## Challenges Faced

### Dawn Theme Integration
Adapting custom blocks to Dawn's modern architecture required careful attention to the preset and block system. All customisations followed Shopify's latest theme development standards.

### Variant Selection Bug
A persistent bug occurred with variant swatches when selecting option combinations that became unavailable (e.g., selecting "14k Yellow Gold" + "High Polish", then switching to "Platinum" which only offers "Brushed" finish). The Shopify variant API failed to properly load the JSON data when an option became unavailable.

**Solution**: Implemented a fallback mechanism that verifies the API response and automatically selects the first available option when the requested combination is invalid.

## Testing

### Online environment
- Access the store via: https://gabriel-process.myshopify.com/products/cuff-ring-complete

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- Shopify CLI
- Access to the Shopify development store

### Steps
1. Clone the repository
2. Install Shopify CLI: `npm install -g @shopify/cli @shopify/theme`
3. Install the project modules: `npm install`
4. Connect to the development store: `npm run dev`
5. The theme will be available at the provided localhost URL