# Shopify Theme Development

Test project focused on Product Detail Page (PDP) development using Shopify's Dawn theme.

## Requirements

- Node.js: v18.0.0 or higher
- npm: v9.0.0 or higher
- Access to development store: `gabriel-process.myshopify.com`

## Installation

Clone the repository and install dependencies:
```bash
npm install
```

Login to Shopify CLI:
```bash
npx shopify auth login
```

## Commands

**Development** (Vite watch + Shopify theme dev):
```bash
npm run dev
```

**Build assets**:
```bash
npm run build
```

**Build and push to store**:
```bash
npm run build:push
```

## Build Process

Vite automatically detects all `.js` and `.css` files inside `src/` and generates bundles in `assets/`.

## Project Structure
```
src/                    Source code (JS/CSS)
public/                 Static files (copied to assets/)
assets/                 Build output (not versioned)
sections/               Shopify sections
snippets/               Liquid components
templates/              Theme templates
locales/                Translations
config/                 Theme settings
```