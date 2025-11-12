<?php
/**
 * ============================================
 * SOLUS CUSTOM EMBROIDERY - SINGLE PAGE SOLUTION
 * ============================================
 *
 * Complete custom embroidery system in ONE file
 * - Catalog view + Customization interface
 * - All PHP, HTML, CSS, and JavaScript combined
 * - WooCommerce integration
 * - Romanian UI
 *
 * INSTALLATION:
 * 1. Copy this entire file content to your Astra child theme functions.php
 * 2. Create a page in WordPress
 * 3. Edit with Elementor, add Shortcode widget
 * 4. Insert shortcode: [solus_custom_embroidery]
 * 5. Set page to Full Width layout
 * 6. Update WhatsApp number in line ~50
 *
 * YOUR PRODUCTS (update IDs if different):
 * - Hanorac: 182
 * - Pulover: 183
 * - Beanie: 184
 * - Șapcă: 185
 * - Cămașă: 186
 * - Pantaloni: 187
 *
 * ============================================
 */

// ============================================
// PRODUCT DATA CONFIGURATION
// ============================================

function solus_emb_get_products() {
    return [
        'hanorac' => [
            'id' => 182,
            'name' => 'Hanorac',
            'description' => 'Bumbac premium heavyweight',
            'type' => 'clothing',
            'fallback_image' => 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        ],
        'pulover' => [
            'id' => 183,
            'name' => 'Pulover',
            'description' => 'Lână merino luxoasă',
            'type' => 'clothing',
            'fallback_image' => 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
        ],
        'beanie' => [
            'id' => 184,
            'name' => 'Beanie',
            'description' => 'Amestec cașmir moale',
            'type' => 'hat',
            'fallback_image' => 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800',
        ],
        'sapca' => [
            'id' => 185,
            'name' => 'Șapcă',
            'description' => 'Bumbac twill structurat',
            'type' => 'hat',
            'fallback_image' => 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
        ],
        'camasa' => [
            'id' => 186,
            'name' => 'Cămașă',
            'description' => 'Bumbac poplin italian',
            'type' => 'clothing',
            'fallback_image' => 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        ],
        'pantaloni' => [
            'id' => 187,
            'name' => 'Pantaloni',
            'description' => 'Amestec lână croială',
            'type' => 'clothing',
            'fallback_image' => 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
        ],
    ];
}

function solus_emb_get_colors() {
    return [
        ['name' => 'Negru', 'value' => '#000000'],
        ['name' => 'Alb', 'value' => '#FFFFFF'],
        ['name' => 'Gri', 'value' => '#808080'],
        ['name' => 'Navy', 'value' => '#1a365d'],
        ['name' => 'Bej', 'value' => '#d4c5b9'],
        ['name' => 'Verde Închis', 'value' => '#1b3a2d'],
    ];
}

function solus_emb_get_thread_colors() {
    return [
        ['name' => 'Negru', 'value' => '#000000'],
        ['name' => 'Alb', 'value' => '#FFFFFF'],
        ['name' => 'Gri Închis', 'value' => '#4a4a4a'],
        ['name' => 'Gri Deschis', 'value' => '#a0a0a0'],
        ['name' => 'Albastru Navy', 'value' => '#1a365d'],
        ['name' => 'Vin', 'value' => '#7c2d3e'],
        ['name' => 'Verde Pădure', 'value' => '#1b3a2d'],
        ['name' => 'Auriu', 'value' => '#c9a66b'],
    ];
}

function solus_emb_get_sizes($type) {
    if ($type === 'hat') {
        return ['One Size', 'Fitted'];
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
}

function solus_emb_get_placements($type, $slug) {
    if ($type === 'hat') {
        return ['Față', 'Spate', 'Lateral'];
    }
    if ($slug === 'pantaloni') {
        return ['Coapsă stângă', 'Coapsă dreaptă', 'Spate'];
    }
    return ['Piept stânga', 'Piept dreapta', 'Spate', 'Mânecă'];
}

function solus_emb_get_size_guide($slug) {
    $is_trousers = ($slug === 'pantaloni');

    ob_start();
    ?>
    <div class="solus-size-guide-content">
        <h4>MĂSURĂTORI (CM)</h4>
        <table class="solus-size-table">
            <thead>
                <tr>
                    <th>Mărime</th>
                    <th><?php echo $is_trousers ? '-' : 'Piept'; ?></th>
                    <th>Lungime</th>
                    <?php if ($is_trousers): ?>
                    <th>Talie</th>
                    <th>Interior picior</th>
                    <?php endif; ?>
                </tr>
            </thead>
            <tbody>
                <?php if ($is_trousers): ?>
                    <tr><td>XS</td><td>-</td><td>98</td><td>74</td><td>76</td></tr>
                    <tr><td>S</td><td>-</td><td>100</td><td>78</td><td>78</td></tr>
                    <tr><td>M</td><td>-</td><td>102</td><td>82</td><td>80</td></tr>
                    <tr><td>L</td><td>-</td><td>104</td><td>86</td><td>82</td></tr>
                    <tr><td>XL</td><td>-</td><td>106</td><td>90</td><td>84</td></tr>
                    <tr><td>XXL</td><td>-</td><td>108</td><td>94</td><td>86</td></tr>
                <?php else: ?>
                    <tr><td>XS</td><td>86-91</td><td>68</td></tr>
                    <tr><td>S</td><td>92-97</td><td>70</td></tr>
                    <tr><td>M</td><td>98-103</td><td>72</td></tr>
                    <tr><td>L</td><td>104-109</td><td>74</td></tr>
                    <tr><td>XL</td><td>110-115</td><td>76</td></tr>
                    <tr><td>XXL</td><td>116-121</td><td>78</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
        <p class="solus-size-note">
            Toate măsurătorile sunt aproximative. Pentru o potrivire perfectă, recomandăm măsurarea unui articol similar pe care îl dețineți.
        </p>
    </div>
    <?php
    return ob_get_clean();
}

// ============================================
// MAIN SHORTCODE
// ============================================

add_shortcode('solus_custom_embroidery', function($atts) {
    $products_data = solus_emb_get_products();
    $colors = solus_emb_get_colors();
    $thread_colors = solus_emb_get_thread_colors();

    // Build products JSON for JavaScript
    $products_json = [];
    foreach ($products_data as $slug => $data) {
        $product = wc_get_product($data['id']);
        if (!$product) continue;

        // Use WooCommerce featured image if set, otherwise use Figma/Unsplash fallback image
        $image_id = $product->get_image_id();
        $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : $data['fallback_image'];

        $products_json[$slug] = [
            'id' => $data['id'],
            'name' => $data['name'],
            'description' => $data['description'],
            'type' => $data['type'],
            'image' => $image_url,
            'price' => floatval($product->get_price()),
            'sizes' => solus_emb_get_sizes($data['type']),
            'placements' => solus_emb_get_placements($data['type'], $slug),
            'sizeGuide' => ($data['type'] === 'clothing') ? solus_emb_get_size_guide($slug) : '',
        ];
    }

    ob_start();
    ?>

<!-- ============================================
     INLINE CSS
     ============================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap');

.solus-embroidery-app * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.solus-embroidery-app {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #faf8f5;
    min-height: 100vh;
    color: #000;
    line-height: 1.5;
}

.font-playfair { font-family: 'Playfair Display', serif; }
.font-bold { font-weight: 700; }

/* ============================================
   CATALOG VIEW
   ============================================ */
.solus-catalog-view {
    display: block;
}

.solus-catalog-view.hidden {
    display: none;
}

.solus-hero {
    padding: 128px 24px 80px;
    text-align: center;
}

.solus-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0 0 24px;
    line-height: 1.1;
}

.solus-hero p {
    max-width: 672px;
    margin: 0 auto 16px;
    font-size: 16px;
    line-height: 1.8;
    color: #666;
}

.solus-hero-badge {
    display: inline-block;
    padding: 8px 24px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: #666;
}

.solus-product-grid {
    padding: 0 24px 80px;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 32px;
}

@media (min-width: 768px) {
    .solus-product-grid {
        padding: 0 48px 80px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .solus-product-grid {
        padding: 0 80px 128px;
        grid-template-columns: repeat(3, 1fr);
    }
}

.solus-product-card {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.5s ease;
}

.solus-product-card:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.solus-product-media {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: #ececf0;
}

.solus-product-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}

.solus-product-card:hover .solus-product-media img {
    transform: scale(1.05);
}

.solus-product-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.5s ease;
}

.solus-product-card:hover .solus-product-overlay {
    background: rgba(0, 0, 0, 0.1);
}

.solus-product-body {
    padding: 24px;
}

.solus-product-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    letter-spacing: 0.05em;
    margin: 0 0 8px;
}

.solus-product-desc {
    font-size: 12px;
    color: #999;
    letter-spacing: 0.05em;
    margin: 0 0 16px;
}

.solus-product-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.solus-product-price-label {
    font-size: 14px;
    color: #666;
}

.solus-product-price-value {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
}

.solus-product-cta {
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.solus-btn-outline {
    display: inline-block;
    padding: 8px 16px;
    border: 1px solid #000;
    color: #000;
    font-size: 11px;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
}

.solus-product-card:hover .solus-btn-outline {
    background: #000;
    color: #fff;
}

.solus-info-section {
    padding: 0 24px 80px;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
}

@media (min-width: 768px) {
    .solus-info-section {
        padding: 0 48px 128px;
        grid-template-columns: repeat(3, 1fr);
    }
}

.solus-info-item {
    padding: 32px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.solus-info-title {
    font-size: 13px;
    letter-spacing: 0.1em;
    margin: 0 0 12px;
    font-weight: 600;
}

.solus-info-text {
    font-size: 12px;
    line-height: 1.8;
    color: #666;
}

/* ============================================
   CUSTOMIZATION VIEW
   ============================================ */
.solus-customize-view {
    display: none;
}

.solus-customize-view.active {
    display: block;
}

.solus-back-btn {
    padding: 96px 24px 24px;
}

@media (min-width: 768px) {
    .solus-back-btn { padding: 96px 48px 24px; }
}

@media (min-width: 1024px) {
    .solus-back-btn { padding: 96px 80px 24px; }
}

.solus-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #000;
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: opacity 0.3s;
    background: none;
    border: none;
    font-family: inherit;
}

.solus-back-link:hover {
    opacity: 0.6;
}

.solus-layout {
    padding: 0 24px 80px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
}

@media (min-width: 768px) {
    .solus-layout { padding: 0 48px 80px; }
}

@media (min-width: 1024px) {
    .solus-layout {
        padding: 0 80px 80px;
        grid-template-columns: 500px 1fr;
    }
}

.solus-preview {
    position: relative;
}

@media (min-width: 1024px) {
    .solus-preview {
        position: sticky;
        top: 96px;
        align-self: start;
    }
}

.solus-preview-container {
    position: relative;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    aspect-ratio: 1;
    overflow: hidden;
}

.solus-preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.solus-preview-color-overlay {
    position: absolute;
    inset: 0;
    mix-blend-mode: multiply;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
}

.solus-preview-color-overlay.active {
    opacity: 0.2;
}

.solus-preview-embroidery {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.solus-customize {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.solus-product-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 6vw, 56px);
    letter-spacing: 0.05em;
    margin: 0 0 12px;
    line-height: 1.1;
}

.solus-product-subtitle {
    font-size: 14px;
    color: #666;
    letter-spacing: 0.05em;
}

.solus-step {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 32px;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.solus-step.hidden {
    display: none;
}

.solus-step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    letter-spacing: 0.08em;
    margin: 0 0 24px;
    font-weight: 600;
}

.solus-step-number {
    width: 32px;
    height: 32px;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
}

.solus-field {
    margin-bottom: 24px;
}

.solus-field:last-child {
    margin-bottom: 0;
}

.solus-field-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.solus-field-label {
    font-size: 12px;
    letter-spacing: 0.05em;
    color: #666;
    font-weight: 500;
    display: block;
}

.solus-size-guide-toggle {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: rgba(0, 0, 0, 0.6);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    font-family: inherit;
}

.solus-size-guide-toggle:hover {
    color: #000;
}

.solus-size-guide {
    display: none;
    margin-bottom: 16px;
    padding: 20px;
    background: #faf8f5;
    border: 1px solid rgba(0, 0, 0, 0.1);
    animation: slideDown 0.3s;
}

.solus-size-guide.active {
    display: block;
}

@keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 500px; }
}

.solus-size-guide-content h4 {
    font-size: 11px;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
    font-weight: 600;
}

.solus-size-table {
    width: 100%;
    font-size: 11px;
    border-collapse: collapse;
}

.solus-size-table th {
    text-align: left;
    padding: 8px 16px 8px 0;
    font-weight: 500;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.solus-size-table td {
    padding: 8px 16px 8px 0;
    color: #666;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.solus-size-note {
    margin-top: 16px;
    font-size: 10px;
    color: #999;
    line-height: 1.6;
}

.solus-sizes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.solus-size-btn {
    padding: 12px 24px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
}

.solus-size-btn:hover {
    border-color: #000;
}

.solus-size-btn.active {
    background: #000;
    color: #fff;
    border-color: #000;
}

.solus-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.solus-color-btn {
    position: relative;
    width: 56px;
    height: 56px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
}

.solus-color-btn:hover {
    border-color: #000;
}

.solus-color-btn.active {
    border-color: #000;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.solus-color-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
}

.solus-color-btn.active .solus-color-check {
    display: block;
}

.solus-color-selected {
    margin-top: 12px;
    font-size: 12px;
    color: #666;
}

.solus-types {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.solus-type-btn {
    width: 100%;
    text-align: left;
    padding: 20px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
}

.solus-type-btn:hover {
    border-color: #000;
}

.solus-type-btn.active {
    background: #000;
    color: #fff;
    border-color: #000;
}

.solus-type-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.solus-type-label {
    font-size: 14px;
    letter-spacing: 0.05em;
    font-weight: 500;
}

.solus-type-price {
    font-size: 12px;
    opacity: 0.8;
}

.solus-type-desc {
    font-size: 12px;
    opacity: 0.7;
}

.solus-input,
.solus-textarea,
.solus-select {
    width: 100%;
    background: #fff;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    font-size: 15px;
    letter-spacing: 0.05em;
    font-family: inherit;
    transition: border-color 0.3s;
}

.solus-input:focus,
.solus-textarea:focus,
.solus-select:focus {
    outline: none;
    border-color: #000;
}

.solus-textarea {
    resize: vertical;
}

.solus-char-count {
    margin-top: 8px;
    font-size: 10px;
    color: #999;
}

.solus-fonts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

@media (min-width: 768px) {
    .solus-fonts {
        grid-template-columns: repeat(4, 1fr);
    }
}

.solus-font-btn {
    padding: 16px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: #fff;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
    font-family: inherit;
}

.solus-font-btn:hover {
    border-color: #000;
}

.solus-font-btn.active {
    border-color: #000;
}

.solus-font-preview {
    font-size: 24px;
    margin-bottom: 8px;
}

.solus-font-name {
    font-size: 10px;
}

.solus-thread-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.solus-thread-btn {
    position: relative;
    width: 48px;
    height: 48px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
}

.solus-thread-btn:hover {
    border-color: #000;
}

.solus-thread-btn.active {
    border-color: #000;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.solus-thread-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
}

.solus-thread-btn.active .solus-thread-check {
    display: block;
}

.solus-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    background: #fff;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    padding: 32px 16px;
    cursor: pointer;
    transition: border-color 0.3s;
    font-size: 13px;
}

.solus-upload-label:hover {
    border-color: #000;
}

.solus-upload-preview {
    display: none;
    margin-top: 16px;
    text-align: center;
}

.solus-upload-preview.active {
    display: block;
}

.solus-upload-preview-wrapper {
    position: relative;
    display: inline-block;
}

.solus-upload-preview img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border: 2px solid rgba(0, 0, 0, 0.2);
}

.solus-upload-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
}

.solus-upload-remove:hover {
    transform: scale(1.1);
}

.solus-radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.solus-radio-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: border-color 0.3s;
}

.solus-radio-label:hover {
    border-color: #000;
}

.solus-radio-label input[type="radio"] {
    width: 16px;
    height: 16px;
    accent-color: #000;
}

.solus-radio-label span {
    font-size: 13px;
}

.solus-info-box {
    background: #f8f8f8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    gap: 12px;
    margin-top: 24px;
}

.solus-info-box svg {
    flex-shrink: 0;
    margin-top: 2px;
}

.solus-info-box p {
    font-size: 11px;
    color: #2a2a2a;
    line-height: 1.7;
}

.solus-custom-intro {
    font-size: 13px;
    line-height: 1.8;
    color: #666;
    margin-bottom: 32px;
}

.solus-custom-note {
    background: #000;
    color: #fff;
    padding: 24px;
    margin-top: 24px;
}

.solus-custom-note p {
    font-size: 12px;
    line-height: 1.7;
}

.solus-summary {
    border: 2px solid #000 !important;
}

.solus-summary-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    margin-bottom: 24px;
}

.solus-summary-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
}

.solus-summary-item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
}

.solus-summary-label {
    color: #666;
}

.solus-summary-value {
    display: flex;
    align-items: center;
    gap: 8px;
}

.solus-price-summary {
    background: #faf8f5;
    padding: 24px;
    margin-bottom: 24px;
}

.solus-price-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
}

.solus-price-row.hidden {
    display: none;
}

.solus-price-row span:first-child {
    color: #666;
}

.solus-price-total {
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 2px solid #000;
}

.solus-price-total span:first-child {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
}

.solus-price-total span:last-child {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
}

.solus-add-to-cart-btn,
.solus-whatsapp-btn {
    width: 100%;
    background: #000;
    color: #fff;
    padding: 20px;
    border: none;
    font-size: 14px;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    font-family: inherit;
}

.solus-add-to-cart-btn:hover:not(:disabled),
.solus-whatsapp-btn:hover {
    background: #2a2a2a;
}

.solus-add-to-cart-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.solus-whatsapp-btn {
    display: none;
    background: #25D366;
    margin-top: 12px;
}

.solus-whatsapp-btn.active {
    display: block;
}

.solus-whatsapp-btn:hover {
    background: #22c55e;
}

.solus-note {
    margin-top: 16px;
    text-align: center;
    font-size: 11px;
    color: #999;
    line-height: 1.6;
}

.solus-mobile-preview {
    display: block;
}

@media (min-width: 1024px) {
    .solus-mobile-preview {
        display: none;
    }
}

/* Embroidery Preview Overlays */
.solus-text-preview,
.solus-design-preview,
.solus-custom-badge {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.solus-text-preview-box {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    padding: 12px 24px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.solus-text-preview-text {
    font-size: clamp(12px, 2vw, 18px);
    letter-spacing: 0.05em;
    text-align: center;
    white-space: nowrap;
}

.solus-design-preview-box {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    padding: 12px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.solus-design-preview-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.solus-design-placeholder {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(4px);
    padding: 12px 20px;
    border: 2px dashed rgba(0, 0, 0, 0.4);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    font-size: clamp(9px, 2vw, 11px);
    color: #666;
    letter-spacing: 0.08em;
}

.solus-custom-badge-box {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(4px);
    padding: 16px 24px;
    border: 2px solid #c9a66b;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    width: 70%;
}

.solus-custom-badge-title {
    font-size: clamp(10px, 2vw, 12px);
    color: #c9a66b;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
}

.solus-custom-badge-text {
    font-size: clamp(8px, 1.5vw, 10px);
    color: white;
    opacity: 0.9;
}
</style>

<!-- ============================================
     HTML STRUCTURE
     ============================================ -->
<div class="solus-embroidery-app">
    <!-- CATALOG VIEW -->
    <div class="solus-catalog-view" id="catalogView">
        <!-- Hero -->
        <div class="solus-hero">
            <h1>BRODERIE PERSONALIZATĂ</h1>
            <p>Îmbunătățește-ți garderoba cu broderie personalizată. Fiecare piesă devine o expresie unică a identității tale.</p>
            <div class="solus-hero-badge">5-7 ZILE LUCRU · MEȘTERI ARTIZANI</div>
        </div>

        <!-- Product Grid -->
        <div class="solus-product-grid">
            <?php foreach ($products_data as $slug => $data):
                $product = wc_get_product($data['id']);
                if (!$product) continue;

                // Use WooCommerce featured image if set, otherwise use Figma/Unsplash fallback image
                $image_id = $product->get_image_id();
                $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'large') : $data['fallback_image'];
                $price = $product->get_price();
            ?>
            <div class="solus-product-card" data-product="<?php echo esc_attr($slug); ?>">
                <div class="solus-product-media">
                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($data['name']); ?>" />
                    <div class="solus-product-overlay"></div>
                </div>
                <div class="solus-product-body">
                    <h3 class="solus-product-title"><?php echo esc_html($data['name']); ?></h3>
                    <p class="solus-product-desc"><?php echo esc_html($data['description']); ?></p>
                    <div class="solus-product-price">
                        <span class="solus-product-price-label">DE LA</span>
                        <span class="solus-product-price-value"><?php echo esc_html($price); ?> LEI</span>
                    </div>
                    <div class="solus-product-cta">
                        <span class="solus-btn-outline">PERSONALIZEAZĂ</span>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>

        <!-- Info Section -->
        <div class="solus-info-section">
            <div class="solus-info-item">
                <h4 class="solus-info-title">LUCRAT ARTIZANAL</h4>
                <p class="solus-info-text">Fiecare broderie este realizată meticulos de mână de meșteri artizani</p>
            </div>
            <div class="solus-info-item">
                <h4 class="solus-info-title">MATERIALE PREMIUM</h4>
                <p class="solus-info-text">Cele mai fine ațe și materiale pentru un lux de durată</p>
            </div>
            <div class="solus-info-item">
                <h4 class="solus-info-title">CU ADEVĂRAT UNIC</h4>
                <p class="solus-info-text">Nicio două piese nu sunt la fel - designul tău, povestea ta</p>
            </div>
        </div>
    </div>

    <!-- CUSTOMIZATION VIEW -->
    <div class="solus-customize-view" id="customizeView">
        <div class="solus-back-btn">
            <button class="solus-back-link" id="backToCatalog">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                ÎNAPOI LA CATALOG
            </button>
        </div>

        <div class="solus-layout">
            <!-- Preview -->
            <div class="solus-preview">
                <div class="solus-preview-container">
                    <img src="" alt="" class="solus-preview-image" id="previewImage" />
                    <div class="solus-preview-color-overlay" id="colorOverlay"></div>
                    <div class="solus-preview-embroidery" id="embroideryPreview"></div>
                </div>
            </div>

            <!-- Customization -->
            <div class="solus-customize" id="customizeContent">
                <!-- Content will be dynamically generated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- ============================================
     INLINE JAVASCRIPT
     ============================================ -->
<script>
(function() {
    'use strict';

    // Configuration
    const WHATSAPP_NUMBER = '40700000000'; // UPDATE THIS WITH YOUR NUMBER
    const AJAX_URL = '<?php echo admin_url('admin-ajax.php'); ?>';
    const NONCE = '<?php echo wp_create_nonce('solus-embroidery-nonce'); ?>';

    // Products data from PHP
    const PRODUCTS = <?php echo json_encode($products_json); ?>;
    const COLORS = <?php echo json_encode($colors); ?>;
    const THREAD_COLORS = <?php echo json_encode($thread_colors); ?>;

    const PLACEMENTS = {
        'Piept stânga': { top: '25%', left: '20%', width: '25%', height: '25%' },
        'Piept dreapta': { top: '25%', right: '20%', width: '25%', height: '25%' },
        'Spate': { top: '30%', left: '50%', width: '50%', height: '40%', transform: 'translateX(-50%)' },
        'Mânecă': { top: '35%', left: '10%', width: '15%', height: '15%' },
        'Față': { top: '40%', left: '50%', width: '40%', height: '30%', transform: 'translateX(-50%)' },
        'Lateral': { top: '40%', left: '15%', width: '20%', height: '20%' },
        'Coapsă stângă': { top: '45%', left: '25%', width: '20%', height: '20%' },
        'Coapsă dreaptă': { top: '45%', right: '25%', width: '20%', height: '20%' },
    };

    // State
    const state = {
        currentProduct: null,
        selectedSize: null,
        selectedColor: null,
        selectedColorName: null,
        embroideryType: null,
        customText: '',
        selectedFont: 'classic',
        selectedFontClass: 'font-playfair',
        threadColor: '#000000',
        textPlacement: '',
        designDescription: '',
        designImageData: null,
        colorType: 'single',
        singleColor: '#000000',
        multiColors: ['#000000', '', ''],
        designPlacement: '',
        customRefImageData: null,
        customBrief: '',
        phoneNumber: '',
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initCatalog();
    });

    function initCatalog() {
        const productCards = document.querySelectorAll('.solus-product-card');
        productCards.forEach(card => {
            card.addEventListener('click', function() {
                const productSlug = this.dataset.product;
                showCustomization(productSlug);
            });
        });

        document.getElementById('backToCatalog').addEventListener('click', showCatalog);
    }

    function showCatalog() {
        document.getElementById('catalogView').classList.remove('hidden');
        document.getElementById('customizeView').classList.remove('active');
        window.scrollTo(0, 0);
        resetState();
    }

    function showCustomization(productSlug) {
        state.currentProduct = PRODUCTS[productSlug];
        if (!state.currentProduct) return;

        document.getElementById('catalogView').classList.add('hidden');
        document.getElementById('customizeView').classList.add('active');

        document.getElementById('previewImage').src = state.currentProduct.image;
        document.getElementById('previewImage').alt = state.currentProduct.name;

        renderCustomization();
        window.scrollTo(0, 0);
    }

    function resetState() {
        state.currentProduct = null;
        state.selectedSize = null;
        state.selectedColor = null;
        state.selectedColorName = null;
        state.embroideryType = null;
        state.customText = '';
        state.selectedFont = 'classic';
        state.selectedFontClass = 'font-playfair';
        state.threadColor = '#000000';
        state.textPlacement = '';
        state.designDescription = '';
        state.designImageData = null;
        state.colorType = 'single';
        state.singleColor = '#000000';
        state.multiColors = ['#000000', '', ''];
        state.designPlacement = '';
        state.customRefImageData = null;
        state.customBrief = '';
        state.phoneNumber = '';
    }

    function renderCustomization() {
        const container = document.getElementById('customizeContent');
        const product = state.currentProduct;

        container.innerHTML = `
            <!-- Product Header -->
            <div class="solus-product-header">
                <h1>${escapeHtml(product.name)}</h1>
                <p class="solus-product-subtitle">PERSONALIZARE BRODERIE</p>
            </div>

            <!-- Step 1: Size & Color -->
            <div class="solus-step" id="step1">
                <h2 class="solus-step-header">
                    <span class="solus-step-number">1</span>
                    SELECTEAZĂ MĂRIME & CULOARE
                </h2>

                <div class="solus-field">
                    <div class="solus-field-header">
                        <label class="solus-field-label">MĂRIME</label>
                        ${product.type === 'clothing' ? '<button type="button" class="solus-size-guide-toggle" id="sizeGuideToggle">GHID MĂRIMI <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.5"/></svg></button>' : ''}
                    </div>
                    ${product.type === 'clothing' ? `<div class="solus-size-guide" id="sizeGuide">${product.sizeGuide}</div>` : ''}
                    <div class="solus-sizes">
                        ${product.sizes.map(size => `<button type="button" class="solus-size-btn" data-size="${size}">${size}</button>`).join('')}
                    </div>
                </div>

                <div class="solus-field">
                    <label class="solus-field-label">CULOARE</label>
                    <div class="solus-colors">
                        ${COLORS.map(color => `
                            <button type="button" class="solus-color-btn" data-color="${color.value}" data-color-name="${color.name}" style="background-color: ${color.value};" title="${color.name}">
                                <svg class="solus-color-check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 10L8 13L15 6" stroke="${color.value === '#FFFFFF' ? '#000' : '#fff'}" stroke-width="2"/>
                                </svg>
                            </button>
                        `).join('')}
                    </div>
                    <p class="solus-color-selected" id="colorSelected"></p>
                </div>
            </div>

            <!-- Step 2: Embroidery Type -->
            <div class="solus-step hidden" id="step2">
                <h2 class="solus-step-header">
                    <span class="solus-step-number">2</span>
                    ALEGE TIPUL DE BRODERIE
                </h2>
                <div class="solus-types">
                    <button type="button" class="solus-type-btn" data-type="text">
                        <div class="solus-type-header">
                            <span class="solus-type-label">Broderie Text</span>
                            <span class="solus-type-price">+50 LEI</span>
                        </div>
                        <p class="solus-type-desc">Adaugă text personalizat cu fonturi custom</p>
                    </button>
                    <button type="button" class="solus-type-btn" data-type="design">
                        <div class="solus-type-header">
                            <span class="solus-type-label">Broderie Design</span>
                            <span class="solus-type-price">+75 LEI</span>
                        </div>
                        <p class="solus-type-desc">Încarcă sau descrie ideea ta de design</p>
                    </button>
                    <button type="button" class="solus-type-btn" data-type="custom">
                        <div class="solus-type-header">
                            <span class="solus-type-label">Consultație Design Personalizat</span>
                            <span class="solus-type-price">Ofertă Personalizată</span>
                        </div>
                        <p class="solus-type-desc">Lucrează direct cu un designer Solus</p>
                    </button>
                </div>
            </div>

            <!-- Step 3 Text -->
            <div class="solus-step hidden" id="step3Text"></div>

            <!-- Step 3 Design -->
            <div class="solus-step hidden" id="step3Design"></div>

            <!-- Step 3 Custom -->
            <div class="solus-step hidden" id="step3Custom"></div>

            <!-- Mobile Preview -->
            <div class="solus-mobile-preview hidden" id="mobilePreview">
                <div class="solus-preview-container">
                    <img src="${product.image}" alt="${product.name}" class="solus-preview-image" />
                    <div class="solus-preview-color-overlay" id="colorOverlayMobile"></div>
                    <div class="solus-preview-embroidery" id="embroideryPreviewMobile"></div>
                </div>
            </div>

            <!-- Summary -->
            <div class="solus-step solus-summary hidden" id="stepSummary">
                <h2 class="solus-summary-title">Configurația Ta</h2>
                <div class="solus-summary-list" id="summaryList"></div>
                <div class="solus-price-summary">
                    <div class="solus-price-row">
                        <span>Preț bază:</span>
                        <span id="basePrice">${product.price} LEI</span>
                    </div>
                    <div class="solus-price-row hidden" id="embroideryPriceRow">
                        <span>Broderie:</span>
                        <span id="embroideryPrice">+0 LEI</span>
                    </div>
                    <div class="solus-price-total">
                        <span>Total:</span>
                        <span id="totalPrice">${product.price} LEI</span>
                    </div>
                </div>
                <button type="button" class="solus-add-to-cart-btn" id="addToCartBtn" disabled>ADAUGĂ ÎN COȘ</button>
                <button type="button" class="solus-whatsapp-btn" id="whatsappBtn">CONTACTEAZĂ DESIGNER VIA WHATSAPP</button>
                <p class="solus-note">Fiecare piesă este brodată meticulos de meșteri artizani. Permite 5-7 zile lucrătoare pentru realizare. Articolele personalizate nu pot fi returnate.</p>
            </div>
        `;

        attachEventHandlers();
    }

    function attachEventHandlers() {
        // Size guide toggle
        const sizeGuideToggle = document.getElementById('sizeGuideToggle');
        if (sizeGuideToggle) {
            sizeGuideToggle.addEventListener('click', function() {
                const guide = document.getElementById('sizeGuide');
                guide.classList.toggle('active');
            });
        }

        // Size selection
        document.querySelectorAll('.solus-size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.solus-size-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.selectedSize = this.dataset.size;
                checkStep1();
            });
        });

        // Color selection
        document.querySelectorAll('.solus-color-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.solus-color-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.selectedColor = this.dataset.color;
                state.selectedColorName = this.dataset.colorName;
                document.getElementById('colorSelected').textContent = 'Selectat: ' + state.selectedColorName;
                updateColorOverlay();
                checkStep1();
            });
        });

        // Embroidery type selection
        document.querySelectorAll('.solus-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.solus-type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.embroideryType = this.dataset.type;

                document.getElementById('step3Text').classList.add('hidden');
                document.getElementById('step3Design').classList.add('hidden');
                document.getElementById('step3Custom').classList.add('hidden');

                if (state.embroideryType === 'text') {
                    renderStep3Text();
                } else if (state.embroideryType === 'design') {
                    renderStep3Design();
                } else if (state.embroideryType === 'custom') {
                    renderStep3Custom();
                }

                updateEmbroideryPreview();
            });
        });

        // Add to cart
        document.getElementById('addToCartBtn').addEventListener('click', handleAddToCart);
        document.getElementById('whatsappBtn').addEventListener('click', handleWhatsApp);
    }

    function checkStep1() {
        if (state.selectedSize && state.selectedColor) {
            document.getElementById('step2').classList.remove('hidden');
        }
    }

    function updateColorOverlay() {
        const overlay = document.getElementById('colorOverlay');
        const overlayMobile = document.getElementById('colorOverlayMobile');

        if (state.selectedColor) {
            overlay.style.backgroundColor = state.selectedColor;
            overlay.classList.add('active');
            overlayMobile.style.backgroundColor = state.selectedColor;
            overlayMobile.classList.add('active');
        }
    }

    function renderStep3Text() {
        const container = document.getElementById('step3Text');
        container.innerHTML = `
            <h2 class="solus-step-header">
                <span class="solus-step-number">3</span>
                PERSONALIZEAZĂ TEXTUL
            </h2>

            <div class="solus-field">
                <label class="solus-field-label">TEXTUL TĂU (MAX 20 CARACTERE)</label>
                <input type="text" class="solus-input" id="customText" maxlength="20" placeholder="Introdu textul..." />
                <p class="solus-char-count"><span id="charCount">0</span> / 20 caractere</p>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">STILUL FONTULUI</label>
                <div class="solus-fonts">
                    <button type="button" class="solus-font-btn active" data-font="classic" data-font-class="font-playfair">
                        <div class="solus-font-preview font-playfair">Aa</div>
                        <div class="solus-font-name">Classic</div>
                    </button>
                    <button type="button" class="solus-font-btn" data-font="script" data-font-class="font-playfair italic">
                        <div class="solus-font-preview font-playfair italic">Aa</div>
                        <div class="solus-font-name">Script</div>
                    </button>
                    <button type="button" class="solus-font-btn" data-font="modern" data-font-class="">
                        <div class="solus-font-preview">Aa</div>
                        <div class="solus-font-name">Modern</div>
                    </button>
                    <button type="button" class="solus-font-btn" data-font="bold" data-font-class="font-bold">
                        <div class="solus-font-preview font-bold">Aa</div>
                        <div class="solus-font-name">Bold</div>
                    </button>
                </div>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">CULOARE AȚĂ</label>
                <div class="solus-thread-colors">
                    ${THREAD_COLORS.map(color => `
                        <button type="button" class="solus-thread-btn ${color.value === '#000000' ? 'active' : ''}" data-thread="${color.value}" style="background-color: ${color.value};" title="${color.name}">
                            <svg class="solus-thread-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 8L6 10L12 4" stroke="${color.value === '#FFFFFF' ? '#000' : '#fff'}" stroke-width="2"/>
                            </svg>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">PLASAMENT</label>
                <select class="solus-select" id="textPlacement">
                    <option value="">Selectează plasamentul...</option>
                    ${state.currentProduct.placements.map(place => `<option value="${place}">${place}</option>`).join('')}
                </select>
            </div>
        `;

        container.classList.remove('hidden');

        // Attach text embroidery handlers
        document.getElementById('customText').addEventListener('input', function() {
            state.customText = this.value.slice(0, 20);
            document.getElementById('charCount').textContent = state.customText.length;
            updateEmbroideryPreview();
            checkTextComplete();
        });

        document.querySelectorAll('.solus-font-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.solus-font-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.selectedFont = this.dataset.font;
                state.selectedFontClass = this.dataset.fontClass;
                updateEmbroideryPreview();
            });
        });

        document.querySelectorAll('.solus-thread-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.solus-thread-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.threadColor = this.dataset.thread;
                updateEmbroideryPreview();
            });
        });

        document.getElementById('textPlacement').addEventListener('change', function() {
            state.textPlacement = this.value;
            updateEmbroideryPreview();
            checkTextComplete();
        });
    }

    function checkTextComplete() {
        if (state.customText && state.textPlacement) {
            showSummary();
        }
    }

    function renderStep3Design() {
        const container = document.getElementById('step3Design');
        container.innerHTML = `
            <h2 class="solus-step-header">
                <span class="solus-step-number">3</span>
                CREEAZĂ DESIGNUL BRODERIE
            </h2>

            <div class="solus-field">
                <label class="solus-field-label">DESCRIE IDEEA TA DE DESIGN</label>
                <textarea class="solus-textarea" id="designDescription" rows="4" placeholder="Descrie forma, stilul, detaliile..."></textarea>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">SAU ÎNCARCĂ O IMAGINE REFERINȚĂ</label>
                <input type="file" id="designUpload" accept=".jpg,.jpeg,.png,.pdf" style="display:none;" />
                <label for="designUpload" class="solus-upload-label">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 14V6M10 6L7 9M10 6L13 9M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    <span id="designUploadText">Alege fișier (Max 5MB)</span>
                </label>
                <div class="solus-upload-preview" id="designPreview">
                    <div class="solus-upload-preview-wrapper">
                        <img id="designPreviewImg" src="" alt="Preview" />
                        <button type="button" class="solus-upload-remove" id="designRemove">×</button>
                    </div>
                </div>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">CULORI BRODERIE</label>
                <div class="solus-radio-group">
                    <label class="solus-radio-label">
                        <input type="radio" name="colorType" value="single" checked />
                        <span>Unicolor (1 culoare)</span>
                    </label>
                    <label class="solus-radio-label">
                        <input type="radio" name="colorType" value="multi" />
                        <span>Multi-culoare (până la 3 culori, +25 LEI)</span>
                    </label>
                    <label class="solus-radio-label">
                        <input type="radio" name="colorType" value="custom" />
                        <span>Culori personalizate (discuție cu echipa)</span>
                    </label>
                </div>
                <div class="solus-thread-colors" id="singleColorSelector" style="margin-top:15px;">
                    ${THREAD_COLORS.map(color => `
                        <button type="button" class="solus-thread-btn ${color.value === '#000000' ? 'active' : ''}" data-thread="${color.value}" style="background-color: ${color.value};" title="${color.name}">
                            <svg class="solus-thread-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 8L6 10L12 4" stroke="${color.value === '#FFFFFF' ? '#000' : '#fff'}" stroke-width="2"/>
                            </svg>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">PLASAMENT</label>
                <select class="solus-select" id="designPlacement">
                    <option value="">Selectează plasamentul...</option>
                    ${state.currentProduct.placements.map(place => `<option value="${place}">${place}</option>`).join('')}
                </select>
            </div>

            <div class="solus-info-box">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M8 11V8M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <p>Designurile complexe pot necesita revizie de către echipa noastră. Vom confirma fezabilitatea și vom trimite machete în 24 de ore.</p>
            </div>
        `;

        container.classList.remove('hidden');

        // Attach design embroidery handlers
        document.getElementById('designDescription').addEventListener('input', function() {
            state.designDescription = this.value;
            checkDesignComplete();
        });

        document.getElementById('designUpload').addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'design');
        });

        document.getElementById('designRemove').addEventListener('click', function() {
            state.designImageData = null;
            document.getElementById('designPreview').classList.remove('active');
            document.getElementById('designUploadText').textContent = 'Alege fișier (Max 5MB)';
            updateEmbroideryPreview();
        });

        document.querySelectorAll('input[name="colorType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                state.colorType = this.value;
            });
        });

        document.querySelectorAll('#singleColorSelector .solus-thread-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('#singleColorSelector .solus-thread-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                state.singleColor = this.dataset.thread;
            });
        });

        document.getElementById('designPlacement').addEventListener('change', function() {
            state.designPlacement = this.value;
            updateEmbroideryPreview();
            checkDesignComplete();
        });
    }

    function checkDesignComplete() {
        if ((state.designDescription || state.designImageData) && state.designPlacement) {
            showSummary();
        }
    }

    function renderStep3Custom() {
        const container = document.getElementById('step3Custom');
        container.innerHTML = `
            <h2 class="solus-step-header font-playfair" style="font-size:24px;">
                <span class="solus-step-number" style="font-family:inherit;">3</span>
                Lucrează cu un Designer Solus
            </h2>
            <p class="solus-custom-intro">Echipa noastră de design va aduce viziunea ta la viață. Împărtășește-ne ideea ta și vom crea machete împreună până va fi perfectă.</p>

            <div class="solus-field">
                <label class="solus-field-label">ÎNCARCĂ REFERINȚĂ (OPȚIONAL)</label>
                <input type="file" id="customUpload" accept=".jpg,.jpeg,.png,.pdf" style="display:none;" />
                <label for="customUpload" class="solus-upload-label">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 14V6M10 6L7 9M10 6L13 9M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    <span id="customUploadText">Alege fișier (Max 5MB)</span>
                </label>
                <div class="solus-upload-preview" id="customPreview">
                    <div class="solus-upload-preview-wrapper">
                        <img id="customPreviewImg" src="" alt="Preview" />
                        <button type="button" class="solus-upload-remove" id="customRemove">×</button>
                    </div>
                </div>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">DESCRIE IDEEA TA (OPȚIONAL)</label>
                <textarea class="solus-textarea" id="customBrief" rows="4" placeholder="Spune-ne despre viziunea ta..."></textarea>
            </div>

            <div class="solus-field">
                <label class="solus-field-label">NUMĂR TELEFON (WHATSAPP) *</label>
                <input type="tel" class="solus-input" id="phoneNumber" placeholder="+40 7XX XXX XXX" />
            </div>

            <div class="solus-custom-note">
                <p>Un designer Solus te va contacta în 24 de ore. Vom discuta viziunea ta, vom crea machete și vom finaliza detaliile designului prin WhatsApp. Fără taxe ascunse – prețul va fi discutat în avans.</p>
            </div>
        `;

        container.classList.remove('hidden');

        document.getElementById('customUpload').addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0], 'custom');
        });

        document.getElementById('customRemove').addEventListener('click', function() {
            state.customRefImageData = null;
            document.getElementById('customPreview').classList.remove('active');
            document.getElementById('customUploadText').textContent = 'Alege fișier (Max 5MB)';
        });

        document.getElementById('customBrief').addEventListener('input', function() {
            state.customBrief = this.value;
        });

        document.getElementById('phoneNumber').addEventListener('input', function() {
            state.phoneNumber = this.value;
            checkCustomComplete();
        });

        updateEmbroideryPreview();
        checkCustomComplete();
    }

    function checkCustomComplete() {
        if (state.phoneNumber) {
            showCustomSummary();
        }
    }

    function handleFileUpload(file, type) {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('Fișierul trebuie să fie mai mic de 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;

            if (type === 'design') {
                state.designImageData = imageData;
                document.getElementById('designPreviewImg').src = imageData;
                document.getElementById('designPreview').classList.add('active');
                document.getElementById('designUploadText').textContent = file.name;
                updateEmbroideryPreview();
                checkDesignComplete();
            } else if (type === 'custom') {
                state.customRefImageData = imageData;
                document.getElementById('customPreviewImg').src = imageData;
                document.getElementById('customPreview').classList.add('active');
                document.getElementById('customUploadText').textContent = file.name;
            }
        };
        reader.readAsDataURL(file);
    }

    function updateEmbroideryPreview() {
        const preview = document.getElementById('embroideryPreview');
        const previewMobile = document.getElementById('embroideryPreviewMobile');

        preview.innerHTML = '';
        previewMobile.innerHTML = '';

        if (state.embroideryType === 'text' && state.customText && state.textPlacement) {
            const textPreview = renderTextPreview();
            preview.innerHTML = textPreview;
            previewMobile.innerHTML = textPreview;
        } else if (state.embroideryType === 'design' && state.designPlacement) {
            const designPreview = renderDesignPreview();
            preview.innerHTML = designPreview;
            previewMobile.innerHTML = designPreview;
        } else if (state.embroideryType === 'custom') {
            const customBadge = renderCustomBadge();
            preview.innerHTML = customBadge;
            previewMobile.innerHTML = customBadge;
        }
    }

    function renderTextPreview() {
        const coords = PLACEMENTS[state.textPlacement] || {};
        const style = `
            top: ${coords.top || '30%'};
            ${coords.left ? 'left: ' + coords.left : ''};
            ${coords.right ? 'right: ' + coords.right : ''};
            width: ${coords.width || '40%'};
            ${coords.transform ? 'transform: ' + coords.transform : ''};
        `;

        return `
            <div class="solus-text-preview" style="${style}">
                <div class="solus-text-preview-box">
                    <div class="solus-text-preview-text ${state.selectedFontClass}" style="color: ${state.threadColor}">
                        ${escapeHtml(state.customText)}
                    </div>
                </div>
            </div>
        `;
    }

    function renderDesignPreview() {
        const coords = PLACEMENTS[state.designPlacement] || {};
        const style = `
            top: ${coords.top || '30%'};
            ${coords.left ? 'left: ' + coords.left : ''};
            ${coords.right ? 'right: ' + coords.right : ''};
            width: ${coords.width || '40%'};
            height: ${coords.height || '30%'};
            ${coords.transform ? 'transform: ' + coords.transform : ''};
        `;

        if (state.designImageData) {
            return `
                <div class="solus-design-preview" style="${style}">
                    <div class="solus-design-preview-box">
                        <img src="${state.designImageData}" alt="Design preview" />
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="solus-design-preview" style="${style}">
                    <div class="solus-design-placeholder">DESIGN</div>
                </div>
            `;
        }
    }

    function renderCustomBadge() {
        return `
            <div class="solus-custom-badge" style="position: absolute; top: 30%; left: 50%; transform: translateX(-50%); width: 70%;">
                <div class="solus-custom-badge-box">
                    <p class="solus-custom-badge-title">DESIGN PERSONALIZAT</p>
                    <p class="solus-custom-badge-text">Plasament & detalii determinate cu designerul</p>
                </div>
            </div>
        `;
    }

    function showSummary() {
        document.getElementById('mobilePreview').classList.remove('hidden');
        document.getElementById('stepSummary').classList.remove('hidden');
        document.getElementById('addToCartBtn').style.display = 'block';
        document.getElementById('whatsappBtn').classList.remove('active');

        renderSummary();
        updatePriceDisplay();

        const canAdd = validateConfiguration();
        document.getElementById('addToCartBtn').disabled = !canAdd;
    }

    function showCustomSummary() {
        document.getElementById('mobilePreview').classList.remove('hidden');
        document.getElementById('stepSummary').classList.remove('hidden');
        document.getElementById('addToCartBtn').style.display = 'none';
        document.getElementById('whatsappBtn').classList.add('active');

        renderSummary();
        updatePriceDisplay();
    }

    function renderSummary() {
        const list = document.getElementById('summaryList');
        list.innerHTML = `
            <div class="solus-summary-item">
                <span class="solus-summary-label">Mărime:</span>
                <span class="solus-summary-value">${escapeHtml(state.selectedSize)}</span>
            </div>
            <div class="solus-summary-item">
                <span class="solus-summary-label">Culoare:</span>
                <span class="solus-summary-value">${escapeHtml(state.selectedColorName)} <div style="width: 20px; height: 20px; border: 2px solid rgba(0,0,0,0.2); background: ${state.selectedColor}; display: inline-block; vertical-align: middle; margin-left: 8px;"></div></span>
            </div>
            <div class="solus-summary-item">
                <span class="solus-summary-label">Tip broderie:</span>
                <span class="solus-summary-value">${state.embroideryType === 'text' ? 'Broderie Text' : state.embroideryType === 'design' ? 'Broderie Design' : 'Design Personalizat'}</span>
            </div>
            ${state.embroideryType === 'text' && state.customText ? `
                <div class="solus-summary-item">
                    <span class="solus-summary-label">Text:</span>
                    <span class="solus-summary-value ${state.selectedFontClass}" style="color: ${state.threadColor}">"${escapeHtml(state.customText)}"</span>
                </div>
            ` : ''}
            ${state.textPlacement || state.designPlacement ? `
                <div class="solus-summary-item">
                    <span class="solus-summary-label">Plasament:</span>
                    <span class="solus-summary-value">${escapeHtml(state.textPlacement || state.designPlacement)}</span>
                </div>
            ` : ''}
        `;
    }

    function updatePriceDisplay() {
        const prices = calculatePrice();

        document.getElementById('basePrice').textContent = prices.base + ' LEI';

        if (prices.embroidery > 0) {
            document.getElementById('embroideryPriceRow').classList.remove('hidden');
            document.getElementById('embroideryPrice').textContent = '+' + prices.embroidery + ' LEI';
        } else {
            document.getElementById('embroideryPriceRow').classList.add('hidden');
        }

        if (state.embroideryType === 'custom') {
            document.getElementById('totalPrice').textContent = 'De stabilit';
        } else {
            document.getElementById('totalPrice').textContent = prices.total + ' LEI';
        }
    }

    function calculatePrice() {
        let embroideryPrice = 0;

        if (state.embroideryType === 'text' && state.customText) {
            embroideryPrice = 50;
        } else if (state.embroideryType === 'design') {
            embroideryPrice = 75;
            if (state.colorType === 'multi' && state.multiColors.filter(c => c).length >= 3) {
                embroideryPrice += 25;
            }
        }

        return {
            base: state.currentProduct.price,
            embroidery: embroideryPrice,
            total: state.currentProduct.price + embroideryPrice,
        };
    }

    function validateConfiguration() {
        if (!state.selectedSize || !state.selectedColor || !state.embroideryType) {
            return false;
        }

        if (state.embroideryType === 'text') {
            return state.customText && state.textPlacement;
        }

        if (state.embroideryType === 'design') {
            return (state.designDescription || state.designImageData) && state.designPlacement;
        }

        return false;
    }

    function handleAddToCart() {
        if (!validateConfiguration()) {
            alert('Vă rugăm completați toate câmpurile obligatorii.');
            return;
        }

        const btn = document.getElementById('addToCartBtn');
        btn.disabled = true;
        btn.textContent = 'ADĂUGARE...';

        const config = {
            product_id: state.currentProduct.id,
            size: state.selectedSize,
            color: state.selectedColor,
            color_name: state.selectedColorName,
            embroidery_type: state.embroideryType,
            text: state.customText,
            font: state.selectedFont,
            thread_color: state.threadColor,
            placement: state.textPlacement || state.designPlacement,
            design_description: state.designDescription,
            design_image: state.designImageData,
            color_type: state.colorType,
            single_color: state.singleColor,
        };

        // AJAX Add to Cart
        fetch(AJAX_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'solus_add_custom_embroidery',
                nonce: NONCE,
                product_id: state.currentProduct.id,
                config: JSON.stringify(config),
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                btn.textContent = '✓ ADĂUGAT ÎN COȘ';
                setTimeout(() => {
                    window.location.href = data.data.cart_url;
                }, 1000);
            } else {
                alert(data.data.message || 'Eroare la adăugare în coș');
                btn.disabled = false;
                btn.textContent = 'ADAUGĂ ÎN COȘ';
            }
        })
        .catch(error => {
            alert('Eroare la comunicarea cu serverul');
            btn.disabled = false;
            btn.textContent = 'ADAUGĂ ÎN COȘ';
        });
    }

    function handleWhatsApp() {
        if (!state.phoneNumber) {
            alert('Vă rugăm introduceți numărul de telefon.');
            return;
        }

        const productName = state.currentProduct.name;
        const message = `Bună ziua Solus! Doresc să lucrez cu un designer pentru broderie personalizată pe ${productName}. ${state.customBrief ? `Iată ideea mea: ${state.customBrief}.` : ''} Mă puteți contacta la ${state.phoneNumber}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

})();
</script>

    <?php
    return ob_get_clean();
});

// ============================================
// AJAX: ADD TO CART
// ============================================

add_action('wp_ajax_solus_add_custom_embroidery', 'solus_emb_add_to_cart');
add_action('wp_ajax_nopriv_solus_add_custom_embroidery', 'solus_emb_add_to_cart');

function solus_emb_add_to_cart() {
    check_ajax_referer('solus-embroidery-nonce', 'nonce');

    $product_id = intval($_POST['product_id']);
    $config = isset($_POST['config']) ? json_decode(stripslashes($_POST['config']), true) : [];

    if (!$product_id || empty($config)) {
        wp_send_json_error(['message' => 'Date invalide']);
    }

    // Calculate embroidery price
    $embroidery_price = 0;
    if ($config['embroidery_type'] === 'text') {
        $embroidery_price = 50;
    } elseif ($config['embroidery_type'] === 'design') {
        $embroidery_price = 75;
        if (isset($config['color_type']) && $config['color_type'] === 'multi') {
            $embroidery_price += 25;
        }
    }

    // Add to cart with custom data
    $cart_item_data = [
        'solus_embroidery' => $config,
        'solus_embroidery_price' => $embroidery_price,
    ];

    $cart_item_key = WC()->cart->add_to_cart($product_id, 1, 0, [], $cart_item_data);

    if ($cart_item_key) {
        wp_send_json_success([
            'message' => 'Produs adăugat în coș!',
            'cart_url' => wc_get_cart_url(),
        ]);
    } else {
        wp_send_json_error(['message' => 'Eroare la adăugare în coș']);
    }
}

// Modify cart item price
add_action('woocommerce_before_calculate_totals', function($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;

    foreach ($cart->get_cart() as $cart_item) {
        if (isset($cart_item['solus_embroidery_price'])) {
            $price = floatval($cart_item['data']->get_price());
            $new_price = $price + floatval($cart_item['solus_embroidery_price']);
            $cart_item['data']->set_price($new_price);
        }
    }
});

// Display custom data in cart
add_filter('woocommerce_get_item_data', function($item_data, $cart_item) {
    if (isset($cart_item['solus_embroidery'])) {
        $config = $cart_item['solus_embroidery'];

        $summary = [];
        $summary[] = 'Mărime: ' . esc_html($config['size']);
        $summary[] = 'Culoare: ' . esc_html($config['color_name']);

        if ($config['embroidery_type'] === 'text') {
            $summary[] = 'Tip: Broderie Text';
            $summary[] = 'Text: "' . esc_html($config['text']) . '"';
            $summary[] = 'Plasament: ' . esc_html($config['placement']);
        } elseif ($config['embroidery_type'] === 'design') {
            $summary[] = 'Tip: Broderie Design';
            $summary[] = 'Plasament: ' . esc_html($config['placement']);
        } elseif ($config['embroidery_type'] === 'custom') {
            $summary[] = 'Tip: Design Personalizat (Consultație)';
        }

        $item_data[] = [
            'name' => 'Broderie Personalizată',
            'value' => implode('<br>', $summary),
        ];
    }
    return $item_data;
}, 10, 2);
