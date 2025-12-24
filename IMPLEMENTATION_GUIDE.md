# Implementation Guide - Step by Step

## Phase 1: Critical SEO (Do First - 1-2 hours)

### Step 1: Add Missing Meta Tags
**File**: `index.html` (in `<head>` section)

Add after line 29 (after existing Open Graph tags).

### Step 2: Add Structured Data
**File**: `index.html` (before closing `</head>` tag)

Add JSON-LD scripts for Person, WebSite, and Portfolio schemas.

### Step 3: Create robots.txt
**File**: `robots.txt` (in root directory)

### Step 4: Create sitemap.xml
**File**: `sitemap.xml` (in root directory)

## Phase 2: Image Optimization (30 minutes)

### Step 1: Add Alt Text
- Go through all `<img>` tags
- Add descriptive `alt` attributes
- Add `loading="lazy"` to non-critical images
- Add `width` and `height` attributes

### Step 2: Create OG Image
- Create 1200x630px image with your name/title
- Save as `assets/og-image.jpg`
- Reference in meta tags

## Phase 3: Performance (1 hour)

### Step 1: Optimize Font Loading
**File**: `css/style.css`
- Add `font-display: swap` to font declarations

### Step 2: Add Preload Links
**File**: `index.html`
- Preload critical fonts
- Preload critical CSS

### Step 3: Lazy Load Non-Critical Resources
- Defer AOS CSS
- Lazy load images below fold

## Phase 4: Accessibility (1 hour)

### Step 1: Add ARIA Labels
- Navigation links
- Icon buttons
- Form inputs

### Step 2: Improve Color Contrast
- Test all text/background combinations
- Ensure WCAG AA compliance

### Step 3: Add Skip Link
- Add "Skip to main content" link

## Phase 5: Analytics Setup (30 minutes)

### Step 1: Google Search Console
1. Go to https://search.google.com/search-console
2. Add property (your domain)
3. Verify ownership
4. Submit sitemap

### Step 2: Google Analytics
1. Create GA4 property
2. Add tracking code to `<head>`
3. Set up events

## Phase 6: Testing (1 hour)

### Step 1: SEO Testing Tools
- Google Rich Results Test
- PageSpeed Insights
- Mobile-Friendly Test
- W3C Validator

### Step 2: Manual Testing
- Test on real mobile devices
- Test social media sharing
- Test all links
- Test form submission

## Priority Order

1. **Week 1**: Phase 1 (Critical SEO)
2. **Week 1**: Phase 2 (Image Optimization)
3. **Week 2**: Phase 3 (Performance)
4. **Week 2**: Phase 4 (Accessibility)
5. **Week 3**: Phase 5 (Analytics)
6. **Week 3**: Phase 6 (Testing)

## Tools You'll Need

- **SEO**: Google Search Console, Google Analytics
- **Testing**: PageSpeed Insights, Lighthouse
- **Image**: TinyPNG, Squoosh
- **Validation**: W3C Validator, Schema.org Validator
- **Accessibility**: WAVE, axe DevTools


