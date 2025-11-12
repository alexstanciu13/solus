# SOLUS CUSTOM EMBROIDERY — IMPLEMENTATION GUIDE

Complete WordPress + WooCommerce shortcode system for custom embroidery functionality.

---

## 📦 PACKAGE CONTENTS

This package includes 3 files to create a full custom embroidery experience:

1. **`custom-embroidery-functions.php`** — PHP shortcode functions
2. **`solus-embroidery.css`** — Complete styling (matches Figma design)
3. **`solus-embroidery.js`** — Interactive functionality

---

## 🚀 INSTALLATION

### Step 1: Upload Files to Your Astra Child Theme

```
wp-content/themes/astra-child/
├── functions.php (edit this)
├── assets/
│   ├── solus-embroidery.css (upload)
│   └── solus-embroidery.js (upload)
```

**Actions:**
1. Upload `solus-embroidery.css` to `wp-content/themes/astra-child/assets/`
2. Upload `solus-embroidery.js` to `wp-content/themes/astra-child/assets/`
3. Copy the contents of `custom-embroidery-functions.php` into your `functions.php`

### Step 2: Verify WooCommerce Products

Ensure your WooCommerce products are created with these IDs:

| Product Name (Romanian) | Product ID | Slug in Code |
|------------------------|------------|--------------|
| Hanorac | 182 | `hanorac` |
| Pulover | 183 | `pulover` |
| Beanie | 184 | `beanie` |
| Șapcă | 185 | `sapca` |
| Cămașă | 186 | `camasa` |
| Pantaloni | 187 | `pantaloni` |

**Note:** If your product IDs are different, update the `solus_get_embroidery_products()` function in `functions.php`.

### Step 3: Configure WhatsApp Number

In `functions.php`, update the WhatsApp number:

```php
wp_localize_script('solus-embroidery-script', 'solusEmbroidery', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
    'cartUrl' => wc_get_cart_url(),
    'whatsappNumber' => '40700000000', // ← Change to your WhatsApp number (with country code, no +)
]);
```

### Step 4: Add Google Fonts

The CSS file already imports required fonts, but ensure they load properly. If needed, add to your theme:

```html
<!-- In wp-content/themes/astra-child/header.php or via theme customizer -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🎨 CREATE PAGES IN WORDPRESS

### Page 1: Catalog Page (Product Listing)

1. **Create new page** in WordPress
   - Title: `Broderie Personalizată` (or any title you prefer)
   - URL slug: `broderie-personalizata`

2. **Edit with Elementor**

3. **Add Shortcode Widget**
   - Drag "Shortcode" widget onto page
   - Enter shortcode: `[solus_embroidery_catalog]`

4. **Page Settings (Elementor)**
   - Set page layout to **Full Width**
   - Remove padding/margins if needed

5. **Publish**

**Result:** This page displays a grid of all 6 products with hero section and info cards.

---

### Page 2: Product Customization Page

1. **Create new page** in WordPress
   - Title: `Personalizare Produs`
   - URL slug: `personalizare-produs`

2. **Edit with Elementor**

3. **Add Shortcode Widget**
   - Drag "Shortcode" widget onto page
   - Enter shortcode: `[solus_embroidery_product]`

4. **Page Settings (Elementor)**
   - Set page layout to **Full Width**
   - Remove padding/margins

5. **Publish**

**Result:** This page detects the product from URL parameter (`?product=hanorac`) and displays the full customization interface.

---

## 📋 HOW IT WORKS

### User Flow

1. **Catalog Page** → User sees all 6 embroidery products
2. **Click "PERSONALIZEAZĂ"** → Navigates to `/personalizare-produs?product=hanorac`
3. **Customization Interface:**
   - **Step 1:** Select size & color (live preview updates)
   - **Step 2:** Choose embroidery type (text, design, or custom consultation)
   - **Step 3:** Configure embroidery details
     - **Text:** Enter text, choose font, thread color, placement
     - **Design:** Describe/upload design, choose colors, placement
     - **Custom:** Upload reference, describe idea, enter phone for WhatsApp consultation
4. **See live preview** of embroidery on product image
5. **View configuration summary** with price calculation
6. **Add to cart** → WooCommerce cart with custom data
7. **Checkout** → Custom embroidery details shown in cart/order

---

## 🔧 CUSTOMIZATION

### Change Product Images

Replace placeholder URLs with your actual product images:

1. Upload product images to WooCommerce products (Product → Edit → Product image)
2. The shortcode automatically pulls the featured image from each WooCommerce product

### Adjust Prices

**Base product prices:** Edit in WooCommerce product settings

**Embroidery prices:**
- Text embroidery: 50 LEI (line 112 in functions.php)
- Design embroidery: 75 LEI (line 114 in functions.php)
- Multi-color surcharge: +25 LEI (line 117 in functions.php)

To change:
```php
// In functions.php, function calculatePrice()
if (embroideryType === 'text' && customText) {
    embroideryPrice = 50; // ← Change here
}
```

### Modify Size Options

Edit the `solus_get_product_sizes()` function:

```php
function solus_get_product_sizes($product, $type) {
    if ($type === 'hat') {
        return ['One Size', 'Fitted']; // ← Hat sizes
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // ← Clothing sizes
}
```

### Update Color Palette

Edit the `solus_get_available_colors()` function:

```php
function solus_get_available_colors() {
    return [
        ['name' => 'Negru', 'value' => '#000000'],
        ['name' => 'Alb', 'value' => '#FFFFFF'],
        // Add more colors...
    ];
}
```

### Change Placement Options

Edit the `solus_get_placements()` function:

```php
function solus_get_placements($type, $product_slug) {
    if ($type === 'hat') {
        return ['Față', 'Spate', 'Lateral'];
    }
    return ['Piept stânga', 'Piept dreapta', 'Spate', 'Mânecă'];
}
```

### Adjust Preview Overlay Positions

In `solus-embroidery.js`, edit the `PLACEMENTS` object:

```javascript
const PLACEMENTS = {
    'Piept stânga': { top: '25%', left: '20%', width: '25%', height: '25%' },
    'Piept dreapta': { top: '25%', right: '20%', width: '25%', height: '25%' },
    // Adjust percentages to match your product images...
};
```

---

## 🎯 TESTING CHECKLIST

After installation, test these scenarios:

### Catalog Page
- ✅ All 6 products display with images
- ✅ Prices show correctly from WooCommerce
- ✅ Clicking "PERSONALIZEAZĂ" navigates to customization page with correct product

### Customization Page
- ✅ Product image loads
- ✅ Size buttons work (activates on click)
- ✅ Color buttons work (shows color name, updates preview overlay)
- ✅ Size guide expands/collapses (for clothing items)
- ✅ Embroidery type buttons reveal correct Step 3

### Text Embroidery
- ✅ Text input shows character count (max 20)
- ✅ Font selection changes preview
- ✅ Thread color selection updates preview
- ✅ Placement dropdown updates preview position
- ✅ Preview shows text with correct font, color, placement

### Design Embroidery
- ✅ Description field works
- ✅ File upload works (max 5MB check)
- ✅ Uploaded image shows in preview
- ✅ Color type radio buttons toggle selectors
- ✅ Single color selector works
- ✅ Multi-color selector renders 3 color rows
- ✅ Placement updates preview

### Custom Design
- ✅ Reference image upload works
- ✅ Brief textarea works
- ✅ Phone number field enables WhatsApp button
- ✅ WhatsApp button opens with pre-filled message

### Summary & Cart
- ✅ Configuration summary displays all selections
- ✅ Price calculation correct (base + embroidery)
- ✅ "Add to Cart" button disabled until all required fields filled
- ✅ Clicking "Add to Cart" adds product with custom data
- ✅ Cart displays custom embroidery details
- ✅ Cart price includes embroidery cost
- ✅ Checkout shows custom data

### Mobile Responsive
- ✅ Catalog grid stacks properly on mobile
- ✅ Customization page shows preview before summary on mobile
- ✅ All buttons/inputs accessible on small screens

---

## 🐛 TROUBLESHOOTING

### Styles not loading
**Check:** File path in functions.php matches actual file location
```php
wp_enqueue_style('solus-embroidery-style', get_stylesheet_directory_uri() . '/assets/solus-embroidery.css', [], '1.0.0');
```

### JavaScript not working
**Check 1:** jQuery is loaded (WordPress includes it by default)
**Check 2:** Look for JavaScript errors in browser console (F12)
**Check 3:** Verify nonce is generated (view page source, search for `solusEmbroideryNonce`)

### Product images not showing
**Check:** Each WooCommerce product has a featured image set

### "Product not found" error
**Check:** URL parameter matches product slug exactly
- Valid: `?product=hanorac`
- Invalid: `?product=Hanorac` (case sensitive)

### Add to Cart not working
**Check 1:** AJAX URL is correct (should be `/wp-admin/admin-ajax.php`)
**Check 2:** Nonce is being passed correctly
**Check 3:** Check PHP error logs for server-side issues

### Preview overlay position wrong
**Solution:** Adjust `PLACEMENTS` coordinates in `solus-embroidery.js` to match your product images

### Cart not showing custom data
**Check:** WooCommerce hooks are registered (search for `woocommerce_before_calculate_totals` in functions.php)

---

## 🎨 DESIGN TOKENS REFERENCE

The CSS uses these Figma design tokens:

```css
--solus-gold: #c9a66b;        /* Brand accent color */
--solus-black: #000000;       /* Primary text/buttons */
--solus-off-white: #faf8f5;   /* Page background */
--solus-charcoal: #2a2a2a;    /* Secondary text */
--solus-navy: #1a365d;        /* Tertiary accent */
```

**Fonts:**
- Headings: `Playfair Display` (serif, luxury)
- Body: `Montserrat` (sans-serif)

**Spacing:**
- Container max-width: 1400px (extra-wide luxury layout)
- Border radius: 10px
- Responsive breakpoints: 768px (tablet), 1024px (desktop)

---

## 📱 MOBILE OPTIMIZATION

The design is **fully responsive** with these breakpoints:

- **Mobile (< 768px):**
  - Single column layout
  - Preview shown before summary
  - Touch-friendly button sizes (48px minimum)

- **Tablet (768px - 1024px):**
  - 2-column product grid in catalog
  - Single column customization

- **Desktop (> 1024px):**
  - 3-column product grid in catalog
  - Sticky preview on left, customization on right
  - Preview stays in viewport while scrolling

---

## 🔒 SECURITY NOTES

✅ **Implemented security measures:**
- AJAX nonce verification (`wp_create_nonce`)
- Input sanitization (`sanitize_key`, `sanitize_text_field`)
- Output escaping (`esc_html`, `esc_url`, `esc_attr`)
- File upload validation (size limit, type check)
- SQL injection prevention (using WooCommerce APIs)

---

## 📞 SUPPORT & DOCUMENTATION

### Elementor Documentation
- [Using Shortcodes in Elementor](https://elementor.com/help/shortcode-widget/)

### WooCommerce Hooks
- [Cart Item Data](https://woocommerce.github.io/code-reference/hooks/woocommerce_get_item_data.html)
- [Before Calculate Totals](https://woocommerce.github.io/code-reference/hooks/woocommerce_before_calculate_totals.html)

### WordPress AJAX
- [AJAX in Plugins](https://developer.wordpress.org/plugins/javascript/ajax/)

---

## 🎉 YOU'RE DONE!

Your Solus Custom Embroidery system is now live. Users can:

1. Browse embroidery products in a luxury catalog
2. Customize products with live preview
3. Choose text, design, or custom consultation
4. Add personalized products to cart
5. Complete checkout with custom data preserved

**Need help?** Check the troubleshooting section above or review the inline code comments in each file.

---

## 📋 QUICK REFERENCE

### Shortcodes
```
[solus_embroidery_catalog]     → Product catalog page
[solus_embroidery_product]     → Customization page (detects ?product=slug from URL)
```

### URL Structure
```
/broderie-personalizata/                        → Catalog
/personalizare-produs?product=hanorac           → Customize Hanorac
/personalizare-produs?product=pulover           → Customize Pulover
/personalizare-produs?product=beanie            → Customize Beanie
/personalizare-produs?product=sapca             → Customize Șapcă
/personalizare-produs?product=camasa            → Customize Cămașă
/personalizare-produs?product=pantaloni         → Customize Pantaloni
```

### Product IDs
```
182 → Hanorac
183 → Pulover
184 → Beanie
185 → Șapcă
186 → Cămașă
187 → Pantaloni
```

---

**Version:** 1.0.0
**Last Updated:** 2025-01-12
**Compatibility:** WordPress 5.8+, WooCommerce 5.0+, Astra Theme, Elementor 3.0+
