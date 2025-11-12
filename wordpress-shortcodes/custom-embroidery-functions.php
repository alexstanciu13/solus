<?php
/**
 * SOLUS CUSTOM EMBROIDERY SHORTCODES
 * WordPress + WooCommerce integration for custom embroidery functionality
 *
 * Installation:
 * 1. Copy this code to your Astra child theme functions.php
 * 2. Upload solus-embroidery.css to wp-content/themes/astra-child/assets/
 * 3. Upload solus-embroidery.js to wp-content/themes/astra-child/assets/
 * 4. Create pages and insert shortcodes via Elementor
 */

// ============================================
// ENQUEUE ASSETS
// ============================================

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('solus-embroidery-style', get_stylesheet_directory_uri() . '/assets/solus-embroidery.css', [], '1.0.0');
    wp_enqueue_script('solus-embroidery-script', get_stylesheet_directory_uri() . '/assets/solus-embroidery.js', ['jquery'], '1.0.0', true);

    // Pass AJAX URL and WooCommerce cart URL to JavaScript
    wp_localize_script('solus-embroidery-script', 'solusEmbroidery', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'cartUrl' => wc_get_cart_url(),
        'whatsappNumber' => '40700000000', // Update with your WhatsApp number
    ]);
});

// ============================================
// PRODUCT MAPPING
// ============================================

function solus_get_embroidery_products() {
    return [
        'hanorac' => [
            'id' => 182,
            'name' => 'Hanorac',
            'name_en' => 'Hoodie',
            'description' => 'Bumbac premium heavyweight',
            'type' => 'clothing',
        ],
        'pulover' => [
            'id' => 183,
            'name' => 'Pulover',
            'name_en' => 'Sweater',
            'description' => 'Lână merino luxoasă',
            'type' => 'clothing',
        ],
        'beanie' => [
            'id' => 184,
            'name' => 'Beanie',
            'name_en' => 'Beanie',
            'description' => 'Amestec cașmir moale',
            'type' => 'hat',
        ],
        'sapca' => [
            'id' => 185,
            'name' => 'Șapcă',
            'name_en' => 'Cap',
            'description' => 'Bumbac twill structurat',
            'type' => 'hat',
        ],
        'camasa' => [
            'id' => 186,
            'name' => 'Cămașă',
            'name_en' => 'Shirt',
            'description' => 'Bumbac poplin italian',
            'type' => 'clothing',
        ],
        'pantaloni' => [
            'id' => 187,
            'name' => 'Pantaloni',
            'name_en' => 'Trousers',
            'description' => 'Amestec lână croială',
            'type' => 'clothing',
        ],
    ];
}

// ============================================
// SHORTCODE: CUSTOM EMBROIDERY CATALOG
// ============================================
// Usage: [solus_embroidery_catalog]

add_shortcode('solus_embroidery_catalog', function($atts) {
    $products_data = solus_get_embroidery_products();

    ob_start();
    ?>
    <div class="solus-embroidery-catalog">
        <!-- Hero Section -->
        <section class="solus-emb-hero">
            <h1 class="solus-emb-hero__title">BRODERIE PERSONALIZATĂ</h1>
            <p class="solus-emb-hero__text">
                Îmbunătățește-ți garderoba cu broderie personalizată. Fiecare piesă devine o expresie unică a identității tale.
            </p>
            <div class="solus-emb-hero__badge">
                5-7 ZILE LUCRU · MEȘTERI ARTIZANI
            </div>
        </section>

        <!-- Product Grid -->
        <section class="solus-emb-grid">
            <div class="solus-emb-grid__inner">
                <?php foreach ($products_data as $slug => $data):
                    $product = wc_get_product($data['id']);
                    if (!$product) continue;

                    $image_id = $product->get_image_id();
                    $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'large') : wc_placeholder_img_src('large');
                    $price = $product->get_price();
                ?>

                <a href="?product=<?php echo esc_attr($slug); ?>"
                   class="solus-emb-card">
                    <!-- Product Image -->
                    <div class="solus-emb-card__media">
                        <img src="<?php echo esc_url($image_url); ?>"
                             alt="<?php echo esc_attr($data['name']); ?>" />
                        <div class="solus-emb-card__overlay"></div>
                    </div>

                    <!-- Product Info -->
                    <div class="solus-emb-card__body">
                        <h3 class="solus-emb-card__title"><?php echo esc_html($data['name']); ?></h3>
                        <p class="solus-emb-card__desc"><?php echo esc_html($data['description']); ?></p>
                        <div class="solus-emb-card__price">
                            <span class="solus-emb-card__price-label">DE LA</span>
                            <span class="solus-emb-card__price-value"><?php echo esc_html($price); ?> LEI</span>
                        </div>
                        <div class="solus-emb-card__cta">
                            <span class="solus-emb-btn-outline">PERSONALIZEAZĂ</span>
                        </div>
                    </div>
                </a>

                <?php endforeach; ?>
            </div>
        </section>

        <!-- Info Section -->
        <section class="solus-emb-info">
            <div class="solus-emb-info__grid">
                <div class="solus-emb-info__item">
                    <h4 class="solus-emb-info__title">LUCRAT ARTIZANAL</h4>
                    <p class="solus-emb-info__text">
                        Fiecare broderie este realizată meticulos de mână de meșteri artizani
                    </p>
                </div>
                <div class="solus-emb-info__item">
                    <h4 class="solus-emb-info__title">MATERIALE PREMIUM</h4>
                    <p class="solus-emb-info__text">
                        Cele mai fine ațe și materiale pentru un lux de durată
                    </p>
                </div>
                <div class="solus-emb-info__item">
                    <h4 class="solus-emb-info__title">CU ADEVĂRAT UNIC</h4>
                    <p class="solus-emb-info__text">
                        Nicio două piese nu sunt la fel - designul tău, povestea ta
                    </p>
                </div>
            </div>
        </section>
    </div>
    <?php
    return ob_get_clean();
});

// ============================================
// SHORTCODE: CUSTOM EMBROIDERY PRODUCT
// ============================================
// Usage: [solus_embroidery_product]
// Detects product from URL parameter ?product=hanorac

add_shortcode('solus_embroidery_product', function($atts) {
    // Get product slug from URL
    $product_slug = isset($_GET['product']) ? sanitize_key($_GET['product']) : '';
    $products_data = solus_get_embroidery_products();

    if (empty($product_slug) || !isset($products_data[$product_slug])) {
        return '<div class="solus-emb-error"><p>Produs negăsit. <a href="javascript:history.back()">Înapoi la catalog</a></p></div>';
    }

    $data = $products_data[$product_slug];
    $product = wc_get_product($data['id']);

    if (!$product) {
        return '<div class="solus-emb-error"><p>Produs indisponibil.</p></div>';
    }

    // Get product data
    $image_id = $product->get_image_id();
    $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : wc_placeholder_img_src('full');
    $price = $product->get_price();
    $attributes = $product->get_attributes();

    // Get available sizes and colors
    $sizes = solus_get_product_sizes($product, $data['type']);
    $colors = solus_get_available_colors();
    $thread_colors = solus_get_thread_colors();
    $placements = solus_get_placements($data['type'], $product_slug);

    ob_start();
    ?>
    <div class="solus-embroidery-product"
         data-product-id="<?php echo esc_attr($data['id']); ?>"
         data-product-slug="<?php echo esc_attr($product_slug); ?>"
         data-base-price="<?php echo esc_attr($price); ?>">

        <!-- Back Button -->
        <div class="solus-emb-back">
            <a href="javascript:history.back()" class="solus-emb-back__link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                ÎNAPOI LA CATALOG
            </a>
        </div>

        <!-- Main Layout: Preview + Customization -->
        <div class="solus-emb-layout">
            <!-- LEFT: Sticky Preview -->
            <div class="solus-emb-preview">
                <div class="solus-emb-preview__container">
                    <img src="<?php echo esc_url($image_url); ?>"
                         alt="<?php echo esc_attr($data['name']); ?>"
                         class="solus-emb-preview__image"
                         id="solus-product-image" />

                    <!-- Color Overlay -->
                    <div class="solus-emb-preview__color-overlay" id="solus-color-overlay"></div>

                    <!-- Embroidery Preview Overlays (generated by JS) -->
                    <div class="solus-emb-preview__embroidery" id="solus-embroidery-preview"></div>
                </div>
            </div>

            <!-- RIGHT: Customization Options -->
            <div class="solus-emb-customize">
                <!-- Product Title -->
                <div class="solus-emb-product-header">
                    <h1 class="solus-emb-product-title"><?php echo esc_html($data['name']); ?></h1>
                    <p class="solus-emb-product-subtitle">PERSONALIZARE BRODERIE</p>
                </div>

                <!-- STEP 1: Size & Color -->
                <div class="solus-emb-step" id="step-1">
                    <h2 class="solus-emb-step__header">
                        <span class="solus-emb-step__number">1</span>
                        SELECTEAZĂ MĂRIME & CULOARE
                    </h2>

                    <!-- Size Selection -->
                    <div class="solus-emb-field">
                        <div class="solus-emb-field__header">
                            <label class="solus-emb-field__label">MĂRIME</label>
                            <?php if ($data['type'] === 'clothing'): ?>
                            <button type="button" class="solus-emb-size-guide-toggle" id="size-guide-toggle">
                                GHID MĂRIMI
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.5"/>
                                </svg>
                            </button>
                            <?php endif; ?>
                        </div>

                        <!-- Size Guide (Collapsible) -->
                        <?php if ($data['type'] === 'clothing'): ?>
                        <div class="solus-emb-size-guide" id="size-guide" style="display:none;">
                            <?php echo solus_render_size_guide($product_slug); ?>
                        </div>
                        <?php endif; ?>

                        <div class="solus-emb-sizes">
                            <?php foreach ($sizes as $size): ?>
                            <button type="button"
                                    class="solus-emb-size-btn"
                                    data-size="<?php echo esc_attr($size); ?>">
                                <?php echo esc_html($size); ?>
                            </button>
                            <?php endforeach; ?>
                        </div>
                        <input type="hidden" name="selected_size" id="selected-size" />
                    </div>

                    <!-- Color Selection -->
                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">CULOARE</label>
                        <div class="solus-emb-colors">
                            <?php foreach ($colors as $color): ?>
                            <button type="button"
                                    class="solus-emb-color-btn"
                                    data-color="<?php echo esc_attr($color['value']); ?>"
                                    data-color-name="<?php echo esc_attr($color['name']); ?>"
                                    style="background-color: <?php echo esc_attr($color['value']); ?>;"
                                    title="<?php echo esc_attr($color['name']); ?>">
                                <svg class="solus-emb-color-check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 10L8 13L15 6" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <?php endforeach; ?>
                        </div>
                        <p class="solus-emb-color-selected" id="color-selected-text"></p>
                        <input type="hidden" name="selected_color" id="selected-color" />
                    </div>
                </div>

                <!-- STEP 2: Embroidery Type (Shown after size & color selected) -->
                <div class="solus-emb-step" id="step-2" style="display:none;">
                    <h2 class="solus-emb-step__header">
                        <span class="solus-emb-step__number">2</span>
                        ALEGE TIPUL DE BRODERIE
                    </h2>

                    <div class="solus-emb-types">
                        <button type="button" class="solus-emb-type-btn" data-type="text">
                            <div class="solus-emb-type-header">
                                <span class="solus-emb-type-label">Broderie Text</span>
                                <span class="solus-emb-type-price">+50 LEI</span>
                            </div>
                            <p class="solus-emb-type-desc">Adaugă text personalizat cu fonturi custom</p>
                        </button>

                        <button type="button" class="solus-emb-type-btn" data-type="design">
                            <div class="solus-emb-type-header">
                                <span class="solus-emb-type-label">Broderie Design</span>
                                <span class="solus-emb-type-price">+75 LEI</span>
                            </div>
                            <p class="solus-emb-type-desc">Încarcă sau descrie ideea ta de design</p>
                        </button>

                        <button type="button" class="solus-emb-type-btn" data-type="custom">
                            <div class="solus-emb-type-header">
                                <span class="solus-emb-type-label">Consultație Design Personalizat</span>
                                <span class="solus-emb-type-price">Ofertă Personalizată</span>
                            </div>
                            <p class="solus-emb-type-desc">Lucrează direct cu un designer Solus</p>
                        </button>
                    </div>
                    <input type="hidden" name="embroidery_type" id="embroidery-type" />
                </div>

                <!-- STEP 3A: Text Embroidery Options -->
                <div class="solus-emb-step" id="step-3-text" style="display:none;">
                    <h2 class="solus-emb-step__header">
                        <span class="solus-emb-step__number">3</span>
                        PERSONALIZEAZĂ TEXTUL
                    </h2>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">TEXTUL TĂU (MAX 20 CARACTERE)</label>
                        <input type="text"
                               class="solus-emb-input"
                               id="custom-text"
                               maxlength="20"
                               placeholder="Introdu textul..." />
                        <p class="solus-emb-char-count"><span id="char-count">0</span> / 20 caractere</p>
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">STILUL FONTULUI</label>
                        <div class="solus-emb-fonts">
                            <button type="button" class="solus-emb-font-btn" data-font="script" data-font-class="font-serif italic">
                                <div class="solus-emb-font-preview font-serif italic">Aa</div>
                                <div class="solus-emb-font-name">Script</div>
                            </button>
                            <button type="button" class="solus-emb-font-btn" data-font="modern" data-font-class="">
                                <div class="solus-emb-font-preview">Aa</div>
                                <div class="solus-emb-font-name">Modern</div>
                            </button>
                            <button type="button" class="solus-emb-font-btn" data-font="classic" data-font-class="font-playfair">
                                <div class="solus-emb-font-preview font-playfair">Aa</div>
                                <div class="solus-emb-font-name">Classic</div>
                            </button>
                            <button type="button" class="solus-emb-font-btn" data-font="bold" data-font-class="font-bold">
                                <div class="solus-emb-font-preview font-bold">Aa</div>
                                <div class="solus-emb-font-name">Bold</div>
                            </button>
                        </div>
                        <input type="hidden" name="selected_font" id="selected-font" value="classic" />
                        <input type="hidden" name="selected_font_class" id="selected-font-class" value="font-playfair" />
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">CULOARE AȚĂ</label>
                        <div class="solus-emb-thread-colors">
                            <?php foreach ($thread_colors as $color): ?>
                            <button type="button"
                                    class="solus-emb-thread-btn"
                                    data-thread="<?php echo esc_attr($color['value']); ?>"
                                    style="background-color: <?php echo esc_attr($color['value']); ?>;"
                                    title="<?php echo esc_attr($color['name']); ?>">
                                <svg class="solus-emb-thread-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 8L6 10L12 4" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <?php endforeach; ?>
                        </div>
                        <input type="hidden" name="thread_color" id="thread-color" value="#000000" />
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">PLASAMENT</label>
                        <select class="solus-emb-select" id="text-placement">
                            <option value="">Selectează plasamentul...</option>
                            <?php foreach ($placements as $place): ?>
                            <option value="<?php echo esc_attr($place); ?>"><?php echo esc_html($place); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>

                <!-- STEP 3B: Design Embroidery Options -->
                <div class="solus-emb-step" id="step-3-design" style="display:none;">
                    <h2 class="solus-emb-step__header">
                        <span class="solus-emb-step__number">3</span>
                        CREEAZĂ DESIGNUL BRODERIE
                    </h2>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">DESCRIE IDEEA TA DE DESIGN</label>
                        <textarea class="solus-emb-textarea"
                                  id="design-description"
                                  rows="4"
                                  placeholder="Descrie forma, stilul, detaliile, atmosfera sau orice referință..."></textarea>
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">SAU ÎNCARCĂ O IMAGINE REFERINȚĂ</label>
                        <div class="solus-emb-upload">
                            <input type="file"
                                   id="design-upload"
                                   accept=".jpg,.jpeg,.png,.pdf"
                                   style="display:none;" />
                            <label for="design-upload" class="solus-emb-upload__label">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 14V6M10 6L7 9M10 6L13 9M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span id="design-upload-text">Alege fișier sau trage aici (Max 5MB)</span>
                            </label>
                            <div id="design-preview" class="solus-emb-upload__preview" style="display:none;">
                                <img id="design-preview-img" src="" alt="Preview" />
                                <button type="button" class="solus-emb-upload__remove" id="design-remove">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <input type="hidden" name="design_image_data" id="design-image-data" />
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">CULORI BRODERIE</label>
                        <div class="solus-emb-color-type">
                            <label class="solus-emb-radio">
                                <input type="radio" name="color_type" value="single" checked />
                                <span>Unicolor (1 culoare)</span>
                            </label>
                            <label class="solus-emb-radio">
                                <input type="radio" name="color_type" value="multi" />
                                <span>Multi-culoare (până la 3 culori, +25 LEI)</span>
                            </label>
                            <label class="solus-emb-radio">
                                <input type="radio" name="color_type" value="custom" />
                                <span>Culori personalizate (discuție cu echipa)</span>
                            </label>
                        </div>

                        <div id="single-color-selector" class="solus-emb-thread-colors" style="margin-top:15px;">
                            <?php foreach ($thread_colors as $color): ?>
                            <button type="button"
                                    class="solus-emb-thread-btn solus-single-color"
                                    data-thread="<?php echo esc_attr($color['value']); ?>"
                                    style="background-color: <?php echo esc_attr($color['value']); ?>;"
                                    title="<?php echo esc_attr($color['name']); ?>">
                                <svg class="solus-emb-thread-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 8L6 10L12 4" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <?php endforeach; ?>
                        </div>
                        <input type="hidden" name="single_color" id="single-color" value="#000000" />

                        <div id="multi-color-selector" style="display:none; margin-top:15px;">
                            <!-- Will be populated by JS -->
                        </div>
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">PLASAMENT</label>
                        <select class="solus-emb-select" id="design-placement">
                            <option value="">Selectează plasamentul...</option>
                            <?php foreach ($placements as $place): ?>
                            <option value="<?php echo esc_attr($place); ?>"><?php echo esc_html($place); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="solus-emb-info-box">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 11V8M8 5V5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        <p>Designurile complexe pot necesita revizie de către echipa noastră. Vom confirma fezabilitatea și vom trimite machete în 24 de ore.</p>
                    </div>
                </div>

                <!-- STEP 3C: Custom Design Consultation -->
                <div class="solus-emb-step" id="step-3-custom" style="display:none;">
                    <h2 class="solus-emb-step__header font-playfair" style="font-size:24px;">
                        <span class="solus-emb-step__number">3</span>
                        Lucrează cu un Designer Solus
                    </h2>
                    <p class="solus-emb-custom-intro">
                        Echipa noastră de design va aduce viziunea ta la viață. Împărtășește-ne ideea ta și vom crea machete împreună până va fi perfectă.
                    </p>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">ÎNCARCĂ REFERINȚĂ SAU INSPIRAȚIE (OPȚIONAL)</label>
                        <div class="solus-emb-upload">
                            <input type="file"
                                   id="custom-upload"
                                   accept=".jpg,.jpeg,.png,.pdf"
                                   style="display:none;" />
                            <label for="custom-upload" class="solus-emb-upload__label">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 14V6M10 6L7 9M10 6L13 9M4 14V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span id="custom-upload-text">Alege fișier sau trage aici (Max 5MB)</span>
                            </label>
                            <div id="custom-preview" class="solus-emb-upload__preview" style="display:none;">
                                <img id="custom-preview-img" src="" alt="Preview" />
                                <button type="button" class="solus-emb-upload__remove" id="custom-remove">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">DESCRIE IDEEA TA (OPȚIONAL)</label>
                        <textarea class="solus-emb-textarea"
                                  id="custom-brief"
                                  rows="4"
                                  placeholder="Spune-ne despre viziunea ta, preferințele de stil sau orice cerințe specifice..."></textarea>
                    </div>

                    <div class="solus-emb-field">
                        <label class="solus-emb-field__label">NUMĂR TELEFON (WHATSAPP) *</label>
                        <input type="tel"
                               class="solus-emb-input"
                               id="phone-number"
                               placeholder="+40 7XX XXX XXX" />
                    </div>

                    <div class="solus-emb-custom-note">
                        <p>
                            Un designer Solus te va contacta în 24 de ore. Vom discuta viziunea ta, vom crea machete și vom finaliza detaliile designului prin WhatsApp. Fără taxe ascunse – prețul va fi discutat în avans.
                        </p>
                    </div>
                </div>

                <!-- Mobile Preview (shown only on mobile before summary) -->
                <div class="solus-emb-mobile-preview" id="mobile-preview" style="display:none;">
                    <div class="solus-emb-preview__container">
                        <img src="<?php echo esc_url($image_url); ?>"
                             alt="<?php echo esc_attr($data['name']); ?>"
                             class="solus-emb-preview__image" />
                        <div class="solus-emb-preview__color-overlay" id="solus-color-overlay-mobile"></div>
                        <div class="solus-emb-preview__embroidery" id="solus-embroidery-preview-mobile"></div>
                    </div>
                </div>

                <!-- FINAL: Configuration Summary & Checkout -->
                <div class="solus-emb-step solus-emb-summary" id="step-summary" style="display:none;">
                    <h2 class="solus-emb-summary__title">Configurația Ta</h2>

                    <div class="solus-emb-summary__list" id="summary-list">
                        <!-- Populated by JS -->
                    </div>

                    <div class="solus-emb-price-summary">
                        <div class="solus-emb-price-row">
                            <span>Preț bază:</span>
                            <span id="base-price-display"><?php echo esc_html($price); ?> LEI</span>
                        </div>
                        <div class="solus-emb-price-row" id="embroidery-price-row" style="display:none;">
                            <span>Broderie:</span>
                            <span id="embroidery-price-display">+0 LEI</span>
                        </div>
                        <div class="solus-emb-price-total">
                            <span>Total:</span>
                            <span id="total-price-display"><?php echo esc_html($price); ?> LEI</span>
                        </div>
                    </div>

                    <button type="button"
                            class="solus-emb-add-to-cart"
                            id="add-to-cart-btn"
                            disabled>
                        ADAUGĂ ÎN COȘ
                    </button>

                    <button type="button"
                            class="solus-emb-whatsapp-btn"
                            id="whatsapp-btn"
                            style="display:none;">
                        CONTACTEAZĂ DESIGNER VIA WHATSAPP
                    </button>

                    <p class="solus-emb-note">
                        Fiecare piesă este brodată meticulos de meșteri artizani. Permite 5-7 zile lucrătoare pentru realizare. Articolele personalizate nu pot fi returnate.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function solus_get_product_sizes($product, $type) {
    if ($type === 'hat') {
        return ['One Size', 'Fitted'];
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
}

function solus_get_available_colors() {
    return [
        ['name' => 'Negru', 'value' => '#000000'],
        ['name' => 'Alb', 'value' => '#FFFFFF'],
        ['name' => 'Gri', 'value' => '#808080'],
        ['name' => 'Navy', 'value' => '#1a365d'],
        ['name' => 'Bej', 'value' => '#d4c5b9'],
        ['name' => 'Verde Închis', 'value' => '#1b3a2d'],
    ];
}

function solus_get_thread_colors() {
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

function solus_get_placements($type, $product_slug) {
    if ($type === 'hat') {
        return ['Față', 'Spate', 'Lateral'];
    }
    if ($product_slug === 'pantaloni') {
        return ['Coapsă stângă', 'Coapsă dreaptă', 'Spate'];
    }
    return ['Piept stânga', 'Piept dreapta', 'Spate', 'Mânecă'];
}

function solus_render_size_guide($product_slug) {
    $is_trousers = ($product_slug === 'pantaloni');

    ob_start();
    ?>
    <div class="solus-emb-size-guide__content">
        <h4 class="solus-emb-size-guide__title">MĂSURĂTORI (CM)</h4>
        <table class="solus-emb-size-table">
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
        <p class="solus-emb-size-guide__note">
            Toate măsurătorile sunt aproximative. Pentru o potrivire perfectă, recomandăm măsurarea unui articol similar pe care îl dețineți.
        </p>
    </div>
    <?php
    return ob_get_clean();
}

// ============================================
// AJAX: ADD TO CART WITH CUSTOM DATA
// ============================================

add_action('wp_ajax_solus_add_custom_embroidery', 'solus_add_custom_embroidery_to_cart');
add_action('wp_ajax_nopriv_solus_add_custom_embroidery', 'solus_add_custom_embroidery_to_cart');

function solus_add_custom_embroidery_to_cart() {
    check_ajax_referer('solus-embroidery-nonce', 'nonce');

    $product_id = intval($_POST['product_id']);
    $config = isset($_POST['config']) ? json_decode(stripslashes($_POST['config']), true) : [];

    if (!$product_id || empty($config)) {
        wp_send_json_error(['message' => 'Date invalide']);
    }

    // Calculate total embroidery price
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

// Display custom embroidery data in cart
add_filter('woocommerce_get_item_data', function($item_data, $cart_item) {
    if (isset($cart_item['solus_embroidery'])) {
        $config = $cart_item['solus_embroidery'];

        $item_data[] = [
            'name' => __('Broderie Personalizată', 'solus'),
            'value' => solus_format_embroidery_summary($config),
        ];
    }
    return $item_data;
}, 10, 2);

function solus_format_embroidery_summary($config) {
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

    return implode('<br>', $summary);
}

// Add nonce for AJAX security
add_action('wp_footer', function() {
    if (has_shortcode(get_the_content(), 'solus_embroidery_product')) {
        ?>
        <script>
            var solusEmbroideryNonce = '<?php echo wp_create_nonce('solus-embroidery-nonce'); ?>';
        </script>
        <?php
    }
});
