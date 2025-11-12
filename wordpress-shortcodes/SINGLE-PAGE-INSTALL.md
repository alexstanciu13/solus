# SOLUS CUSTOM EMBROIDERY — SINGLE PAGE INSTALLATION

**Everything in ONE file: PHP, HTML, CSS, JavaScript**

---

## 🚀 SUPER QUICK INSTALL (3 Steps)

### Step 1: Copy PHP Code to Your Theme

1. Open `solus-embroidery-single-page.php`
2. **Copy the ENTIRE file contents**
3. Open your WordPress admin:
   - Go to: **Appearance → Theme File Editor**
   - Select: **Astra Child Theme**
   - Click: **functions.php**
4. **Scroll to the bottom** of functions.php
5. **Paste the entire code** at the end
6. Click **Update File**

### Step 2: Update WhatsApp Number

In the pasted code, find line ~50 and update:

```javascript
const WHATSAPP_NUMBER = '40700000000'; // ← Change to your WhatsApp number (no +)
```

### Step 3: Create Page

1. **WordPress Admin → Pages → Add New**
2. **Title:** "Broderie Personalizată" (or any title)
3. **Edit with Elementor**
4. **Add Shortcode Widget** (drag from left panel)
5. **Enter shortcode:** `[solus_custom_embroidery]`
6. **Page Settings:**
   - Layout: **Full Width**
   - Remove header/footer padding if needed
7. **Publish**

---

## ✅ DONE!

Visit your page. You'll see:

- **Catalog view** with all 6 products
- **Click any product** → customization interface appears
- **Configure embroidery** → live preview updates
- **Add to cart** → WooCommerce checkout

---

## 🎯 What This Single File Includes

✅ **Catalog page** (hero + 6-product grid + info section)
✅ **Customization interface** (size, color, embroidery options)
✅ **Live preview** (embroidery overlays on product image)
✅ **3 embroidery types:**
   - Text embroidery (+50 LEI)
   - Design embroidery (+75 LEI, +25 LEI for multi-color)
   - Custom consultation (WhatsApp contact)
✅ **WooCommerce integration** (add to cart with custom data)
✅ **Romanian UI** (all labels, messages)
✅ **Responsive design** (mobile, tablet, desktop)
✅ **All CSS embedded** (no external files needed)
✅ **All JavaScript embedded** (no external files needed)

---

## 🔧 Your Product IDs

The code is configured for these product IDs:

| Product | WooCommerce ID |
|---------|----------------|
| Hanorac | 182 |
| Pulover | 183 |
| Beanie | 184 |
| Șapcă | 185 |
| Cămașă | 186 |
| Pantaloni | 187 |

**If your IDs are different:**

Find this section in the code (~line 40):

```php
function solus_emb_get_products() {
    return [
        'hanorac' => [
            'id' => 182,  // ← Change these IDs
            ...
        ],
```

---

## 🎨 How It Works

### User Flow:

```
1. Page loads → Catalog view shows
   ├─ Hero section
   ├─ 6 product cards
   └─ Info section

2. User clicks product → JavaScript switches to customization view
   ├─ Product preview (left/top)
   └─ Configuration options (right/bottom)

3. User configures:
   Step 1: Size & color → preview updates
   Step 2: Embroidery type
   Step 3: Details (text, design, or custom)

4. Live preview shows embroidery overlay

5. Summary displays → User adds to cart

6. WooCommerce cart includes custom data → Checkout
```

**No page navigation needed** — everything happens on one page with JavaScript!

---

## 🛒 Cart Integration

When user adds to cart:

- Base product price: from WooCommerce
- Embroidery fee: +50 LEI (text) or +75 LEI (design)
- Custom data stored:
  - Size, color
  - Embroidery type
  - Text/font/thread color/placement
  - Design description/image/placement
  - Phone number (for custom)

Cart displays:
```
Hanorac  —  500 LEI
Broderie Personalizată:
  Mărime: M
  Culoare: Negru
  Tip: Broderie Text
  Text: "ALEX"
  Plasament: Piept stânga
```

---

## 📱 Mobile Experience

- **Catalog:** Single column grid, touch-friendly cards
- **Customization:**
  - Preview on top
  - Options below
  - Mobile preview before summary
  - Easy scrolling

---

## 🎨 Styling

All styles are **embedded in the file** using:

```html
<style>
  /* Complete CSS here */
</style>
```

**Design tokens:**
- Colors: Solus brand palette (#c9a66b gold, #000 black, #faf8f5 off-white)
- Fonts: Playfair Display (serif), Montserrat (sans) from Google Fonts
- Responsive breakpoints: 768px, 1024px

---

## 🔐 Security

✅ AJAX nonce verification
✅ Input sanitization
✅ Output escaping
✅ File upload validation (5MB limit)
✅ WooCommerce API usage (SQL injection protection)

---

## 🐛 Troubleshooting

### Issue: Products not showing
**Fix:** Check product IDs in `solus_emb_get_products()` function

### Issue: JavaScript not working
**Fix:** Check browser console (F12) for errors

### Issue: Styles look broken
**Fix:** Ensure page layout is set to **Full Width** in Elementor

### Issue: Add to cart not working
**Fix:** Verify WooCommerce is active and products exist

### Issue: Preview not updating
**Fix:** Clear browser cache (Ctrl+Shift+R)

---

## ⚙️ Customization Options

### Change Embroidery Prices

Find this section (~line 2850):

```javascript
if (state.embroideryType === 'text' && state.customText) {
    embroideryPrice = 50;  // ← Text embroidery price
} else if (state.embroideryType === 'design') {
    embroideryPrice = 75;  // ← Design embroidery price
    if (state.colorType === 'multi' && state.multiColors.filter(c => c).length >= 3) {
        embroideryPrice += 25;  // ← Multi-color surcharge
    }
}
```

### Add/Remove Colors

Find `solus_emb_get_colors()` function (~line 65):

```php
function solus_emb_get_colors() {
    return [
        ['name' => 'Negru', 'value' => '#000000'],
        ['name' => 'Alb', 'value' => '#FFFFFF'],
        // Add more colors here...
    ];
}
```

### Change Size Options

Find `solus_emb_get_sizes()` function (~line 90):

```php
function solus_emb_get_sizes($type) {
    if ($type === 'hat') {
        return ['One Size', 'Fitted'];  // ← Hat sizes
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];  // ← Clothing sizes
}
```

### Modify Placement Options

Find `solus_emb_get_placements()` function (~line 97):

```php
function solus_emb_get_placements($type, $slug) {
    if ($type === 'hat') {
        return ['Față', 'Spate', 'Lateral'];
    }
    return ['Piept stânga', 'Piept dreapta', 'Spate', 'Mânecă'];
}
```

---

## 📋 Testing Checklist

Before going live:

- ✅ All 6 products display in catalog
- ✅ Clicking product shows customization
- ✅ Back button returns to catalog
- ✅ Size selection works
- ✅ Color selection works and updates preview
- ✅ Size guide expands/collapses
- ✅ Embroidery type buttons work
- ✅ Text embroidery:
  - ✅ Text input counts characters
  - ✅ Font selection changes preview
  - ✅ Thread color updates preview
  - ✅ Placement updates preview position
- ✅ Design embroidery:
  - ✅ File upload works (5MB check)
  - ✅ Preview shows uploaded image
  - ✅ Color type radio buttons work
- ✅ Custom design:
  - ✅ Phone input enables WhatsApp button
  - ✅ WhatsApp button opens with message
- ✅ Summary shows all selections
- ✅ Price calculation correct
- ✅ Add to cart works
- ✅ Cart shows custom data
- ✅ Mobile responsive

---

## 🎉 You're Done!

Your single-page custom embroidery system is live with:

- ✅ **No external CSS file needed**
- ✅ **No external JS file needed**
- ✅ **Everything in ONE file**
- ✅ **Easy to maintain**
- ✅ **Fully functional**

---

## 💡 Tips

1. **Product Images:** Set featured images in WooCommerce → Product Edit
2. **Google Fonts:** Already loaded (Playfair Display + Montserrat)
3. **Backup:** Save a copy of functions.php before making changes
4. **Updates:** If you update the theme, child theme files are preserved

---

## 📞 Quick Reference

**Shortcode:** `[solus_custom_embroidery]`

**WhatsApp Number:** Line ~50 in code

**Product IDs:** Lines 40-70 in `solus_emb_get_products()`

**Prices:** Lines 2850-2860 in JavaScript

**AJAX Action:** `solus_add_custom_embroidery`

---

**That's it!** One file, one shortcode, one page. ✨

**Version:** 2.0.0 (Single File Edition)
**Last Updated:** 2025-01-12
**File Size:** ~95 KB (all-in-one)
