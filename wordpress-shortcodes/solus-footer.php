<?php
/**
 * ============================================
 * SOLUS FOOTER - SINGLE FILE SOLUTION
 * ============================================
 *
 * Complete footer component in ONE file
 * - Newsletter signup section
 * - Brand, navigation, contact columns
 * - Copyright and legal links
 * - All PHP, HTML, CSS, and JavaScript combined
 * - Romanian UI
 * - Theme-isolated styling
 *
 * INSTALLATION:
 * 1. Copy this entire file content to your Astra child theme functions.php
 * 2. Add to footer.php or any template: <?php echo do_shortcode('[solus_footer]'); ?>
 * 3. Or use in Elementor with Shortcode widget: [solus_footer]
 *
 * FEATURES:
 * - Newsletter email capture
 * - Social media links
 * - Navigation to key pages
 * - Responsive design
 * - Black background with gold accents
 *
 * ============================================
 */

// ============================================
// NEWSLETTER HANDLER (AJAX)
// ============================================

add_action('wp_ajax_solus_newsletter_signup', 'solus_newsletter_signup_handler');
add_action('wp_ajax_nopriv_solus_newsletter_signup', 'solus_newsletter_signup_handler');

function solus_newsletter_signup_handler() {
    // Verify nonce
    check_ajax_referer('solus_newsletter_nonce', 'nonce');

    $email = sanitize_email($_POST['email']);

    if (!is_email($email)) {
        wp_send_json_error(['message' => 'Email invalid.']);
        return;
    }

    // TODO: Integrate with your email service (Mailchimp, SendGrid, etc.)
    // For now, we'll just store in WordPress options or custom table

    // Store in WordPress options as a simple solution
    $subscribers = get_option('solus_newsletter_subscribers', []);

    if (in_array($email, $subscribers)) {
        wp_send_json_error(['message' => 'Acest email este deja înregistrat.']);
        return;
    }

    $subscribers[] = $email;
    update_option('solus_newsletter_subscribers', $subscribers);

    // Send confirmation email (optional)
    $subject = 'Bine ai venit în Solus Circle';
    $message = 'Mulțumim pentru înregistrare! Vei primi actualizări exclusive despre colecțiile noastre limitate.';
    wp_mail($email, $subject, $message);

    wp_send_json_success(['message' => 'Mulțumim pentru înscriere!']);
}

// ============================================
// MAIN SHORTCODE
// ============================================

add_shortcode('solus_footer', function($atts) {
    // Get WordPress URLs
    $home_url = home_url('/');
    $shop_url = home_url('/magazin');
    $embroidery_url = home_url('/broderie-personalizata');
    $gift_sets_url = home_url('/seturi-cadou');
    $stories_url = home_url('/povesti');
    $privacy_url = home_url('/politica-confidentialitate');
    $terms_url = home_url('/termeni-si-conditii');

    // Contact info
    $email = 'contact@solus.ro';
    $instagram = 'https://instagram.com/solus.ro';

    // Generate nonce for AJAX
    $nonce = wp_create_nonce('solus_newsletter_nonce');

    ob_start();
    ?>

<!-- ============================================
     INLINE CSS - THEME-ISOLATED STYLES
     ============================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* Reset all children to prevent theme interference */
.solus-footer-app,
.solus-footer-app * {
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
}

.solus-footer-app {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    background: #000 !important;
    background-color: #000 !important;
    color: #faf8f5 !important;
    line-height: 1.5 !important;
    margin-top: 128px !important;
}

/* Reset theme link styles */
.solus-footer-app a,
.solus-footer-app a:visited,
.solus-footer-app a:hover,
.solus-footer-app a:active {
    text-decoration: none !important;
    color: inherit !important;
}

/* Reset theme heading styles */
.solus-footer-app h1,
.solus-footer-app h2,
.solus-footer-app h3,
.solus-footer-app h4,
.solus-footer-app h5,
.solus-footer-app h6 {
    font-weight: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Reset theme paragraph styles */
.solus-footer-app p {
    margin: 0 !important;
    padding: 0 !important;
    color: inherit !important;
    line-height: inherit !important;
}

/* Reset theme button/input styles */
.solus-footer-app button,
.solus-footer-app input {
    background: none !important;
    border: none !important;
    outline: none !important;
    font-family: inherit !important;
}

/* Reset theme form styles */
.solus-footer-app form {
    margin: 0 !important;
    padding: 0 !important;
}

/* ============================================
   NEWSLETTER SECTION
   ============================================ */
.solus-footer-app .solus-footer-newsletter {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.solus-footer-app .solus-footer-newsletter-inner {
    max-width: 1800px !important;
    margin: 0 auto !important;
    padding: 80px 32px !important;
}

@media (min-width: 1024px) {
    .solus-footer-app .solus-footer-newsletter-inner {
        padding: 80px 64px !important;
    }
}

.solus-footer-app .solus-footer-newsletter-content {
    max-width: 640px !important;
    margin: 0 auto !important;
    text-align: center !important;
}

.solus-footer-app .solus-footer-newsletter-title {
    font-family: 'Playfair Display', serif !important;
    font-size: 32px !important;
    font-weight: 600 !important;
    color: #faf8f5 !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 16px !important;
}

.solus-footer-app .solus-footer-newsletter-subtitle {
    font-size: 14px !important;
    font-weight: 300 !important;
    color: #c9a66b !important;
    margin-bottom: 32px !important;
    line-height: 1.6 !important;
}

.solus-footer-app .solus-footer-newsletter-form {
    display: flex !important;
    gap: 16px !important;
    max-width: 448px !important;
    margin: 0 auto !important;
}

@media (max-width: 640px) {
    .solus-footer-app .solus-footer-newsletter-form {
        flex-direction: column !important;
        gap: 12px !important;
    }
}

.solus-footer-app .solus-footer-newsletter-input {
    flex: 1 !important;
    background: transparent !important;
    background-color: transparent !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    font-weight: 300 !important;
    color: #faf8f5 !important;
    font-family: 'Montserrat', sans-serif !important;
    transition: border-color 0.3s !important;
}

.solus-footer-app .solus-footer-newsletter-input::placeholder {
    color: rgba(250, 248, 245, 0.5) !important;
}

.solus-footer-app .solus-footer-newsletter-input:focus {
    border-color: #c9a66b !important;
    outline: none !important;
}

.solus-footer-app .solus-footer-newsletter-button {
    background: #c9a66b !important;
    background-color: #c9a66b !important;
    color: #000 !important;
    padding: 12px 32px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.08em !important;
    cursor: pointer !important;
    transition: background-color 0.3s !important;
    font-family: 'Montserrat', sans-serif !important;
}

.solus-footer-app .solus-footer-newsletter-button:hover {
    background: #b89559 !important;
    background-color: #b89559 !important;
}

.solus-footer-app .solus-footer-newsletter-message {
    margin-top: 16px !important;
    font-size: 13px !important;
    font-weight: 400 !important;
    padding: 8px !important;
}

.solus-footer-app .solus-footer-newsletter-message.success {
    color: #c9a66b !important;
}

.solus-footer-app .solus-footer-newsletter-message.error {
    color: #ff6b6b !important;
}

/* ============================================
   MAIN FOOTER CONTENT
   ============================================ */
.solus-footer-app .solus-footer-main {
    max-width: 1800px !important;
    margin: 0 auto !important;
    padding: 64px 32px !important;
}

@media (min-width: 1024px) {
    .solus-footer-app .solus-footer-main {
        padding: 64px 64px !important;
    }
}

.solus-footer-app .solus-footer-grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 48px !important;
    margin-bottom: 64px !important;
}

@media (min-width: 768px) {
    .solus-footer-app .solus-footer-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 48px !important;
    }
}

/* Brand Column */
.solus-footer-app .solus-footer-brand h4 {
    font-family: 'Playfair Display', serif !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    color: #faf8f5 !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 16px !important;
}

.solus-footer-app .solus-footer-brand p {
    font-size: 13px !important;
    font-weight: 300 !important;
    line-height: 1.8 !important;
    color: #c9a66b !important;
}

/* Links Columns */
.solus-footer-app .solus-footer-section h5 {
    font-size: 12px !important;
    font-weight: 600 !important;
    letter-spacing: 0.1em !important;
    color: #faf8f5 !important;
    margin-bottom: 16px !important;
    text-transform: uppercase !important;
}

.solus-footer-app .solus-footer-links {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
}

.solus-footer-app .solus-footer-link {
    font-size: 13px !important;
    font-weight: 300 !important;
    color: #faf8f5 !important;
    cursor: pointer !important;
    transition: color 0.3s !important;
    text-align: left !important;
}

.solus-footer-app .solus-footer-link:hover {
    color: #c9a66b !important;
}

/* Contact Links */
.solus-footer-app .solus-footer-contact-link {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    font-size: 13px !important;
    font-weight: 300 !important;
    color: #faf8f5 !important;
    transition: color 0.3s !important;
}

.solus-footer-app .solus-footer-contact-link:hover {
    color: #c9a66b !important;
}

.solus-footer-app .solus-footer-contact-link svg {
    width: 16px !important;
    height: 16px !important;
    stroke: currentColor !important;
}

/* ============================================
   COPYRIGHT SECTION
   ============================================ */
.solus-footer-app .solus-footer-copyright {
    padding-top: 32px !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 16px !important;
}

@media (min-width: 768px) {
    .solus-footer-app .solus-footer-copyright {
        flex-direction: row !important;
        justify-content: space-between !important;
    }
}

.solus-footer-app .solus-footer-copyright-text {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #c9a66b !important;
}

.solus-footer-app .solus-footer-legal {
    display: flex !important;
    gap: 24px !important;
}

.solus-footer-app .solus-footer-legal-link {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #faf8f5 !important;
    cursor: pointer !important;
    transition: color 0.3s !important;
}

.solus-footer-app .solus-footer-legal-link:hover {
    color: #c9a66b !important;
}

/* ============================================
   BRAND MARK SECTION
   ============================================ */
.solus-footer-app .solus-footer-brand-mark-section {
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 24px 0 !important;
}

.solus-footer-app .solus-footer-brand-mark-inner {
    max-width: 1800px !important;
    margin: 0 auto !important;
    padding: 0 32px !important;
    text-align: center !important;
}

@media (min-width: 1024px) {
    .solus-footer-app .solus-footer-brand-mark-inner {
        padding: 0 64px !important;
    }
}

.solus-footer-app .solus-footer-brand-mark {
    display: inline-block !important;
    padding: 8px 24px !important;
    border: 1px solid rgba(201, 166, 107, 0.3) !important;
}

.solus-footer-app .solus-footer-brand-mark-text {
    font-family: 'Playfair Display', serif !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #c9a66b !important;
    letter-spacing: 0.05em !important;
}
</style>

<!-- ============================================
     HTML STRUCTURE
     ============================================ -->
<footer class="solus-footer-app">
    <!-- Newsletter Section -->
    <div class="solus-footer-newsletter">
        <div class="solus-footer-newsletter-inner">
            <div class="solus-footer-newsletter-content">
                <h3 class="solus-footer-newsletter-title">Alătură-te Solus Circle</h3>
                <p class="solus-footer-newsletter-subtitle">
                    Acces exclusiv la lansări limitate și povești din culise
                </p>
                <form class="solus-footer-newsletter-form" id="solusNewsletterForm">
                    <input
                        type="email"
                        class="solus-footer-newsletter-input"
                        placeholder="Adresa ta de email"
                        required
                        id="solusNewsletterEmail"
                    />
                    <button type="submit" class="solus-footer-newsletter-button">
                        ÎNSCRIE-TE
                    </button>
                </form>
                <div class="solus-footer-newsletter-message" id="solusNewsletterMessage"></div>
            </div>
        </div>
    </div>

    <!-- Main Footer Content -->
    <div class="solus-footer-main">
        <div class="solus-footer-grid">
            <!-- Brand Column -->
            <div class="solus-footer-brand">
                <h4>SOLUS</h4>
                <p>
                    Bijuterii în ediție limitată pentru bărbatul exigent. Meticulos realizate, disponibile exclusiv.
                </p>
            </div>

            <!-- Explore Column -->
            <div class="solus-footer-section">
                <h5>Explorează</h5>
                <div class="solus-footer-links">
                    <a href="<?php echo esc_url($shop_url); ?>" class="solus-footer-link">
                        Colecții
                    </a>
                    <a href="<?php echo esc_url($embroidery_url); ?>" class="solus-footer-link">
                        Broderie Personalizată
                    </a>
                    <a href="<?php echo esc_url($gift_sets_url); ?>" class="solus-footer-link">
                        Seturi Cadou
                    </a>
                    <a href="<?php echo esc_url($stories_url); ?>" class="solus-footer-link">
                        Povești Solus
                    </a>
                </div>
            </div>

            <!-- Connect Column -->
            <div class="solus-footer-section">
                <h5>Conectează-te</h5>
                <div class="solus-footer-links">
                    <a href="mailto:<?php echo esc_attr($email); ?>" class="solus-footer-contact-link">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <?php echo esc_html($email); ?>
                    </a>
                    <a href="<?php echo esc_url($instagram); ?>" target="_blank" rel="noopener noreferrer" class="solus-footer-contact-link">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                        @solus.ro
                    </a>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="solus-footer-copyright">
            <p class="solus-footer-copyright-text">
                © 2025 Solus. Toate drepturile rezervate.
            </p>
            <div class="solus-footer-legal">
                <a href="<?php echo esc_url($privacy_url); ?>" class="solus-footer-legal-link">
                    Politica de Confidențialitate
                </a>
                <a href="<?php echo esc_url($terms_url); ?>" class="solus-footer-legal-link">
                    Termeni și Condiții
                </a>
            </div>
        </div>
    </div>

    <!-- Brand Mark -->
    <div class="solus-footer-brand-mark-section">
        <div class="solus-footer-brand-mark-inner">
            <div class="solus-footer-brand-mark">
                <span class="solus-footer-brand-mark-text">⬡ SOLUS ⬡</span>
            </div>
        </div>
    </div>
</footer>

<!-- ============================================
     INLINE JAVASCRIPT
     ============================================ -->
<script>
(function() {
    'use strict';

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initNewsletter();
    });

    function initNewsletter() {
        const form = document.getElementById('solusNewsletterForm');
        const emailInput = document.getElementById('solusNewsletterEmail');
        const messageDiv = document.getElementById('solusNewsletterMessage');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = emailInput.value.trim();

            if (!email) {
                showMessage('Te rugăm să introduci un email valid.', 'error');
                return;
            }

            // Send AJAX request
            const formData = new FormData();
            formData.append('action', 'solus_newsletter_signup');
            formData.append('email', email);
            formData.append('nonce', '<?php echo $nonce; ?>');

            fetch('<?php echo admin_url('admin-ajax.php'); ?>', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(data.data.message, 'success');
                    emailInput.value = '';
                } else {
                    showMessage(data.data.message, 'error');
                }
            })
            .catch(error => {
                showMessage('A apărut o eroare. Te rugăm să încerci din nou.', 'error');
                console.error('Newsletter error:', error);
            });
        });

        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = 'solus-footer-newsletter-message ' + type;

            // Clear message after 5 seconds
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = 'solus-footer-newsletter-message';
            }, 5000);
        }
    }

})();
</script>

    <?php
    return ob_get_clean();
});
