# 🎨 Solus Custom Embroidery — WordPress Shortcodes

**Complete WooCommerce integration for custom embroidery personalization**

Transforms your Figma Make design into a fully functional WordPress custom embroidery system with live preview, WooCommerce integration, and Romanian UI.

---

## 📦 What's Included

This package contains **4 files** for a complete custom embroidery solution:

| File | Purpose | Size |
|------|---------|------|
| `custom-embroidery-functions.php` | WordPress shortcodes, WooCommerce integration, AJAX handlers | ~800 lines |
| `solus-embroidery.css` | Complete styling matching Figma design tokens | ~1,200 lines |
| `solus-embroidery.js` | Interactive customization interface with live preview | ~600 lines |
| `IMPLEMENTATION-GUIDE.md` | Step-by-step installation and usage documentation | Comprehensive |

---

## ✨ Features

### 🛍️ Product Catalog
- Luxury grid layout with 6 embroidery products
- Responsive design (mobile, tablet, desktop)
- Product images from WooCommerce
- Romanian UI labels
- Hero section with branding
- Trust indicators section

### 🎨 Customization Interface
- **Step-by-step configuration:**
  1. Size & color selection with live preview
  2. Embroidery type selection (text, design, custom)
  3. Detailed customization options

- **Text Embroidery:**
  - Custom text input (max 20 characters)
  - 4 font styles (Script, Modern, Classic, Bold)
  - 8 thread colors
  - 4+ placement options per garment type
  - Real-time text preview overlay

- **Design Embroidery:**
  - Design description textarea
  - Image upload (max 5MB, JPG/PNG/PDF)
  - Color options: unicolor, multi-color (+25 LEI), custom
  - Placement selector
  - Live design preview

- **Custom Design Consultation:**
  - Reference image upload
  - Design brief textarea
  - WhatsApp integration for designer contact
  - Phone number collection

### 🎯 Live Preview
- Product image with color overlay (multiply blend mode)
- Real-time embroidery preview at selected placement
- Text preview with correct font, color, positioning
- Design/image preview with upload support
- Responsive preview on mobile

### 🛒 WooCommerce Integration
- Add to cart with custom configuration data
- Price calculation (base + embroidery fees)
- Custom data displayed in cart
- Custom data preserved through checkout
- Order metadata for production team

### 📱 Fully Responsive
- Mobile-first design
- Tablet optimization
- Desktop sticky preview
- Touch-friendly controls

---

## 🚀 Quick Start

### 1. Upload Files
```bash
# Upload to your Astra child theme
wp-content/themes/astra-child/assets/
├── solus-embroidery.css
└── solus-embroidery.js
```

### 2. Add PHP Code
Copy contents of `custom-embroidery-functions.php` into:
```
wp-content/themes/astra-child/functions.php
```

### 3. Configure Products
Verify your WooCommerce products match these IDs:
- **Hanorac** → ID 182
- **Pulover** → ID 183
- **Beanie** → ID 184
- **Șapcă** → ID 185
- **Cămașă** → ID 186
- **Pantaloni** → ID 187

### 4. Create Pages
**Page 1: Catalog**
- Create page → Add Elementor Shortcode widget
- Shortcode: `[solus_embroidery_catalog]`
- Set to Full Width layout

**Page 2: Customization**
- Create page → Add Elementor Shortcode widget
- Shortcode: `[solus_embroidery_product]`
- Set to Full Width layout

### 5. Update WhatsApp Number
In `functions.php`, change:
```php
'whatsappNumber' => '40700000000', // ← Your WhatsApp (country code, no +)
```

---

## 🎨 Design Tokens

Matches your Figma design exactly:

```css
/* Colors */
--solus-gold: #c9a66b;        /* Luxury accent */
--solus-black: #000000;       /* Primary text */
--solus-off-white: #faf8f5;   /* Background */
--solus-charcoal: #2a2a2a;    /* Secondary text */

/* Typography */
Headings: Playfair Display (serif)
Body: Montserrat (sans-serif)

/* Spacing */
Container: 1400px max-width
Border radius: 10px
Breakpoints: 768px, 1024px
```

---

## 📋 User Flow

```
┌─────────────────────┐
│  Catalog Page       │  User sees 6 products with hero section
│  [Shortcode widget] │
└──────────┬──────────┘
           │ Click "PERSONALIZEAZĂ"
           ▼
┌─────────────────────┐
│  Customization Page │  ?product=hanorac
│  [Shortcode widget] │
└──────────┬──────────┘
           │
           ├─► Step 1: Select size & color (live preview updates)
           │
           ├─► Step 2: Choose embroidery type
           │   ├─► Text: Enter text, font, thread color, placement
           │   ├─► Design: Upload/describe design, colors, placement
           │   └─► Custom: Upload reference, enter brief & phone
           │
           ├─► Live Preview: See embroidery on product image
           │
           ├─► Summary: View configuration & price
           │
           └─► Add to Cart → WooCommerce checkout
```

---

## 🎯 What Works Out of the Box

✅ **Complete UI in Romanian**
✅ **Responsive on all devices**
✅ **Live preview with embroidery overlays**
✅ **WooCommerce cart integration**
✅ **Price calculations (base + embroidery)**
✅ **Size guide with measurements**
✅ **Image upload with validation**
✅ **WhatsApp designer consultation**
✅ **AJAX add to cart**
✅ **Security (nonces, sanitization, escaping)**
✅ **Custom data in cart & checkout**
✅ **Production-ready code**

---

## 🔧 Customization

All customization options are documented in `IMPLEMENTATION-GUIDE.md`:

- Change embroidery prices
- Add/remove product sizes
- Modify color palette
- Update placement options
- Adjust preview overlay positions
- Change WhatsApp message template
- Customize Romanian translations

---

## 📱 Mobile Experience

The design is **mobile-first** with these optimizations:

- Single column layout on small screens
- Touch-friendly button sizes (48px+)
- Preview shown before summary on mobile
- Collapsible size guide
- Optimized font sizes (clamp)
- No horizontal scrolling

---

## 🐛 Troubleshooting

**Styles not loading?**
→ Check file paths in functions.php

**JavaScript not working?**
→ Check browser console for errors (F12)

**Product not found?**
→ Verify product IDs in `solus_get_embroidery_products()`

**Add to cart fails?**
→ Check AJAX URL and nonce in browser console

**Full troubleshooting guide:** See `IMPLEMENTATION-GUIDE.md`

---

## 📚 Documentation

- **`IMPLEMENTATION-GUIDE.md`** — Complete installation, testing, troubleshooting
- **Inline comments** — Every function documented in code
- **Security notes** — All sanitization/escaping explained

---

## 🎉 What This Delivers

1. **For Your Customers:**
   - Intuitive customization interface
   - Live preview of their design
   - Clear pricing
   - Mobile-friendly experience

2. **For Your Business:**
   - All custom data captured in orders
   - Designer consultation via WhatsApp
   - Production-ready specifications
   - Professional luxury aesthetic

3. **For Your Developers:**
   - Clean, documented code
   - Modular architecture
   - Easy to customize
   - WordPress/WooCommerce best practices

---

## 📞 Need Help?

1. **Check:** `IMPLEMENTATION-GUIDE.md` for detailed instructions
2. **Review:** Inline code comments in each file
3. **Test:** Use the testing checklist in the guide
4. **Debug:** Check browser console (F12) for JavaScript errors

---

## 📊 Technical Specs

- **WordPress:** 5.8+
- **WooCommerce:** 5.0+
- **Theme:** Astra (child theme)
- **Page Builder:** Elementor 3.0+
- **PHP:** 7.4+
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Support:** iOS Safari, Chrome Mobile

---

## 🔐 Security

✅ AJAX nonce verification
✅ Input sanitization
✅ Output escaping
✅ File upload validation
✅ SQL injection prevention (WC APIs)
✅ XSS protection

---

## 📦 File Structure

```
wordpress-shortcodes/
├── README.md                           ← You are here
├── IMPLEMENTATION-GUIDE.md             ← Full installation guide
├── custom-embroidery-functions.php     ← Add to functions.php
├── solus-embroidery.css                → Upload to /assets/
└── solus-embroidery.js                 → Upload to /assets/
```

---

## 🎨 Design Fidelity

This code faithfully recreates your Figma design:

- ✅ Exact color palette
- ✅ Playfair Display + Montserrat fonts
- ✅ Luxury spacing and proportions
- ✅ Gold accent colors
- ✅ Clean, minimal aesthetic
- ✅ Responsive breakpoints
- ✅ Hover states and transitions

---

## 🚀 Performance

- **Lightweight:** No external dependencies (except jQuery, included in WordPress)
- **Optimized:** CSS variables for efficient rendering
- **Fast:** Minimal DOM manipulation
- **Cached:** Google Fonts preconnect
- **Lazy:** Preview only updates when needed

---

## ✨ Next Steps

1. ✅ Upload files to Astra child theme
2. ✅ Add PHP code to functions.php
3. ✅ Create two pages with shortcodes
4. ✅ Test all features (use checklist in guide)
5. ✅ Customize WhatsApp number
6. ✅ Add real product images to WooCommerce
7. ✅ Test on mobile devices
8. ✅ Go live! 🎉

---

**Questions?** Check `IMPLEMENTATION-GUIDE.md` for comprehensive documentation.

**Ready to launch?** Follow the Quick Start guide above.

---

*Built with ❤️ for Solus — Luxury Custom Embroidery*

**Version:** 1.0.0
**Date:** 2025-01-12
**Romanian UI** | **Figma Match** | **WooCommerce Ready** | **Mobile Optimized**
