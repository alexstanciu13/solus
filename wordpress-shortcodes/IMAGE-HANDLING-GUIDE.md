# 📸 SOLUS CUSTOM EMBROIDERY — IMAGE HANDLING GUIDE

**How uploaded images are processed and where you can review them**

---

## 🔄 **HOW IT WORKS NOW** (Before Enhancement)

### Current Flow:

```
1. User uploads image (design or reference)
   ↓
2. JavaScript converts to base64 string
   ↓
3. Base64 sent to server via AJAX
   ↓
4. Stored in cart session as text
   ↓
5. ❌ PROBLEM: Images are NOT permanently saved
```

### Issues:
- ❌ Images lost after cart expires
- ❌ No way to view images easily
- ❌ Base64 strings are huge (database issues)
- ❌ Can't download images for production
- ❌ Not included in order emails

---

## ✅ **ENHANCED SOLUTION** (Recommended)

I've created `solus-embroidery-image-handling.php` which provides:

### New Flow:

```
1. User uploads image
   ↓
2. JavaScript converts to base64
   ↓
3. Server receives base64 via AJAX
   ↓
4. ✅ Image saved to WordPress Media Library
   ↓
5. ✅ Image ID & URL stored in cart
   ↓
6. ✅ Image attached to order on checkout
   ↓
7. ✅ Visible in admin order view
   ↓
8. ✅ Download links in emails
   ↓
9. ✅ Central dashboard to review all orders
```

---

## 📦 **INSTALLATION**

### Option A: Add to functions.php (Recommended)

1. Open `solus-embroidery-image-handling.php`
2. Copy the entire file contents
3. Paste into your `functions.php` **AFTER** the main shortcode code
4. Save

### Option B: As Separate Plugin

1. Create folder: `wp-content/plugins/solus-embroidery-images/`
2. Add plugin header to the file:
   ```php
   <?php
   /*
   Plugin Name: Solus Custom Embroidery - Image Handling
   Description: Enhanced image handling for custom embroidery orders
   Version: 1.0.0
   */
   ```
3. Upload file to that folder
4. Activate plugin in WordPress admin

---

## 🎯 **WHERE TO FIND UPLOADED IMAGES**

### 1. WordPress Media Library

**Location:** `Media → Library`

- All uploaded embroidery images are saved here
- Filenames: `design-[timestamp]-[unique-id].jpg`
- Easy to search, download, or manage
- Includes thumbnails for quick preview

### 2. Order Edit Page (Admin)

**Location:** `WooCommerce → Orders → [Click Order]`

When viewing an order with custom embroidery:

```
Order #1234
├─ Customer Details
├─ Order Items
│   └─ Hanorac
│       └─ 📝 Broderie Personalizată
│           ├─ Mărime: M
│           ├─ Culoare: Negru
│           ├─ Text: "ALEX"
│           ├─ Plasament: Piept stânga
│           └─ 📎 Design încărcat:
│               [Thumbnail preview]
│               [Download link]
└─ Order Notes
```

**Features:**
- ✅ See image thumbnail inline
- ✅ Click to view full size
- ✅ Download original file
- ✅ All embroidery details in one place

### 3. Order Emails

**What you receive:**

```
Subject: Comandă nouă #1234

Produs: Hanorac
Broderie Personalizată:
  Mărime: M
  Culoare: Negru
  Text: "ALEX"
  Plasament: Piept stânga
  📎 Design: [Download link]
```

**Customer receives:**
- Basic order confirmation
- NO image links (for privacy)

**You receive:**
- Full embroidery details
- Direct download links to images
- All in processing/completed order emails

### 4. Custom Admin Dashboard

**Location:** `WooCommerce → Broderii Personalizate`

A dedicated page showing all embroidery orders:

| Comandă | Data | Client | Produs | Tip Broderie | Imagini | Status |
|---------|------|--------|--------|--------------|---------|--------|
| #1234 | 12.01.2025 | John Doe | Hanorac | ✏️ Text: "ALEX" | 📎 Design | Processing |
| #1235 | 12.01.2025 | Jane Smith | Pulover | 🎨 Design | 📎 Design 📎 Ref | Completed |
| #1236 | 11.01.2025 | Bob Martin | Beanie | 👤 Personalizat | 📎 Ref | Pending |

**Features:**
- ✅ See all embroidery orders at a glance
- ✅ Quick access to images
- ✅ Filter by status
- ✅ One-click download

---

## 📥 **HOW TO DOWNLOAD IMAGES**

### From Order Page:

1. Go to `WooCommerce → Orders`
2. Click order number
3. Scroll to order items
4. Find "Broderie Personalizată" section
5. Click "Descarcă imaginea →" link
6. Image downloads to your computer

### From Media Library:

1. Go to `Media → Library`
2. Search for "design-" or "reference-"
3. Click image
4. Click "Download" or "View Media" button
5. Right-click → Save Image As

### From Email:

1. Open order notification email
2. Find "Broderie Personalizată" section
3. Click image download link
4. Image opens in browser
5. Right-click → Save Image As

---

## 🔍 **VIEWING IMAGE DETAILS**

### What Information is Saved:

For **Text Embroidery:**
- ✅ Text content
- ✅ Font style
- ✅ Thread color
- ✅ Placement location
- ✅ No image (text only)

For **Design Embroidery:**
- ✅ Design description (if provided)
- ✅ Uploaded design image
- ✅ Color type (unicolor/multi/custom)
- ✅ Placement location
- ✅ Image URL (permanent)

For **Custom Consultation:**
- ✅ Reference image (if uploaded)
- ✅ Design brief
- ✅ Customer phone number
- ✅ Image URL (permanent)

---

## 📋 **PRODUCTION WORKFLOW**

### Step-by-Step:

1. **New Order Arrives**
   - Email notification with embroidery details
   - Image download links included

2. **Review Order**
   - Go to `WooCommerce → Orders → [Order]`
   - See all embroidery specifications
   - View/download images

3. **Download Images**
   - Click download link in order page
   - Or go to Media Library
   - Images are high resolution (original upload)

4. **Prepare for Production**
   - Use downloaded images for embroidery machine
   - All details clearly visible in order notes
   - Print order page if needed

5. **Mark Complete**
   - Update order status
   - Customer receives confirmation

---

## 🛠️ **TECHNICAL DETAILS**

### Where Images Are Stored:

**File System:**
```
wp-content/uploads/
└── [year]/
    └── [month]/
        ├── design-1234567890-abc123.jpg
        ├── design-1234567891-def456.png
        └── reference-1234567892-ghi789.jpg
```

**Database:**
- `wp_posts` table (as attachment post type)
- `wp_postmeta` table (attachment metadata)
- `wp_woocommerce_order_itemmeta` table (order item reference)

### Image Formats Supported:
- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ PDF (will be stored, but no thumbnail preview)

### File Size Limit:
- Maximum: 5MB per upload (enforced by JavaScript)
- Can be increased in code if needed

---

## 🔐 **SECURITY & PRIVACY**

### Access Control:
- ✅ Images in Media Library require WordPress login
- ✅ Only admins/shop managers can see orders
- ✅ Customers cannot see other customers' images
- ✅ Direct image URLs are obscured (WordPress GUID)

### Data Retention:
- Images stored permanently in Media Library
- Can be manually deleted if needed
- Consider GDPR compliance for customer data

---

## ⚙️ **CUSTOMIZATION OPTIONS**

### Change Image Storage Location:

```php
// In solus-embroidery-image-handling.php, modify:
$upload_dir = wp_upload_dir();
$upload_path = $upload_dir['path'] . '/embroidery/' . $filename; // Custom subfolder
```

### Increase File Size Limit:

**In JavaScript (solus-embroidery-single-page.php):**
```javascript
if (file.size > 10 * 1024 * 1024) { // Change 5MB to 10MB
    alert('Fișierul trebuie să fie mai mic de 10MB');
```

**In PHP (php.ini or .htaccess):**
```
upload_max_filesize = 10M
post_max_size = 10M
```

### Add Image Compression:

```php
// After saving image, compress it:
$image = wp_get_image_editor($upload_path);
if (!is_wp_error($image)) {
    $image->set_quality(85); // 85% quality
    $image->save($upload_path);
}
```

---

## 📞 **SUPPORT SCENARIOS**

### "I can't find the uploaded image"

**Solution:**
1. Check order items for image attachment
2. Look in Media Library (search "design-" or "reference-")
3. Check order meta data (WooCommerce → Orders → [Order] → Custom Fields)

### "Image is too large to upload"

**Solution:**
1. User sees error: "Fișierul trebuie să fie mai mic de 5MB"
2. Ask them to compress image first
3. Or increase limit (see Customization above)

### "Image quality is poor"

**Solution:**
- Original upload is preserved (no compression by default)
- Check if user uploaded low-quality image
- Ask customer to upload higher resolution

### "I want to delete old embroidery images"

**Solution:**
1. Go to `Media → Library`
2. Filter by "embroidery" or "design-" or "reference-"
3. Bulk select images
4. Click "Delete Permanently"
5. Note: Order will still show other details, just no image

---

## 🎉 **BENEFITS**

### For You (Admin):
- ✅ Easy access to all embroidery images
- ✅ Download production-ready files
- ✅ View details alongside order info
- ✅ Email notifications with image links
- ✅ Central dashboard for all orders

### For Your Customers:
- ✅ Simple upload process
- ✅ See preview before adding to cart
- ✅ Confidence that image was received
- ✅ Professional experience

### For Your Production Team:
- ✅ High-resolution images
- ✅ All specifications in one place
- ✅ Easy to download and use
- ✅ No manual email attachments

---

## 📊 **COMPARISON**

| Feature | Before Enhancement | After Enhancement |
|---------|-------------------|-------------------|
| Image Storage | ❌ Cart session only | ✅ Media Library |
| Permanent Save | ❌ No | ✅ Yes |
| View in Admin | ❌ No | ✅ Yes |
| Download Link | ❌ No | ✅ Yes |
| Email Notification | ❌ No | ✅ Yes |
| Central Dashboard | ❌ No | ✅ Yes |
| High Resolution | ❌ N/A | ✅ Yes |
| Easy Access | ❌ No | ✅ Yes |

---

## 🚀 **NEXT STEPS**

1. ✅ Install enhanced image handling code
2. ✅ Test with sample order
3. ✅ Verify images appear in admin
4. ✅ Check email notifications
5. ✅ Review dashboard at `WooCommerce → Broderii Personalizate`
6. ✅ Download test image
7. ✅ Go live!

---

**Questions?** All code is documented with inline comments in `solus-embroidery-image-handling.php`

**Need help?** Check the code comments for customization options and troubleshooting tips.
