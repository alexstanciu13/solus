<?php
/**
 * ============================================
 * SOLUS STORIES - SINGLE PAGE SOLUTION
 * ============================================
 *
 * Complete stories/blog system in ONE file
 * - Stories listing + Individual story view
 * - All PHP, HTML, CSS, and JavaScript combined
 * - Romanian UI
 * - Luxury editorial design
 *
 * INSTALLATION:
 * 1. Copy this entire file content to your Astra child theme functions.php
 * 2. Create a page in WordPress
 * 3. Edit with Elementor, add Shortcode widget
 * 4. Insert shortcode: [solus_stories]
 * 5. Set page to Full Width layout
 *
 * FEATURES:
 * - Stories grid with hover effects
 * - Individual story article view
 * - No page navigation (JavaScript toggles views)
 * - Responsive design
 * - Luxury editorial aesthetic
 *
 * ============================================
 */

// ============================================
// STORIES DATA CONFIGURATION
// ============================================

function solus_get_stories_data() {
    return [
        'arta-limitata' => [
            'id' => 'arta-limitata',
            'title' => 'Arta Limitării',
            'title_en' => 'The Art of Limited',
            'subtitle' => 'De ce menținem Solus rar și semnificativ',
            'image' => 'https://images.unsplash.com/photo-1689525665283-1937ca14f051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
            'content' => [
                'Într-o lume a producției de masă, alegem reținerea. Fiecare piesă Solus este limitată în mod deliberat, nu ca o tactică de marketing, ci ca un angajament față de excelență și exclusivitate.',
                'Filozofia noastră este simplă: adevăratul lux nu poate fi replicat. Când porți o piesă Solus, porți ceva care există în cantități limitate, realizat meticulos pentru cei care înțeleg că raritatea are o valoare inerentă.',
                'Producem în loturi mici, adesea nu mai mult de o duzină de piese per design. Acest lucru permite meșterilor noștri să acorde o atenție fără compromisuri fiecărui detaliu, asigurându-se că fiecare inel, brățară și lanț îndeplinește standardele noastre exigente.',
                'Raritatea nu este creată—este câștigată prin dedicare față de meșteșug. Aceasta este calea Solus.',
            ],
        ],
        'intalnire-cu-meșterul' => [
            'id' => 'intalnire-cu-meșterul',
            'title' => 'Întâlnire cu Meșterul',
            'title_en' => 'Meet the Craftsman',
            'subtitle' => 'În studioul nostru cu meșteri artizani',
            'image' => 'https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBoYW5kcyUyMHdvcmtpbmclMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
            'content' => [
                'În spatele fiecărei piese Solus se află un meșter cu zeci de ani de experiență. Mâinile lor au modelat aur, au montat pietre și au dat viață designurilor cu o precizie pe care mașinile nu o pot replica.',
                'În atelierul nostru, timpul se mișcă diferit. Un singur inel poate dura zile pentru a fi perfecționat, cu fiecare curbă examinată, fiecare suprafață lustruită până la finisaj oglindă, fiecare detaliu analizat sub ochi experți.',
                'Lucrăm cu artizani care și-au învățat meșteșugul prin ani de ucenicie, onorând tradițiile transmise din generație în generație, îmbrățișând în același timp tehnicile moderne acolo unde îmbunătățesc calitatea.',
                'Aceasta nu este modă rapidă. Aceasta este bijuterie de moștenire, creată pentru cei care apreciază atingerea umană și abilitatea de neînlocuit a adevăratei măiestrii.',
            ],
        ],
        'dincolo-de-broderie' => [
            'id' => 'dincolo-de-broderie',
            'title' => 'Dincolo de Broderie',
            'title_en' => 'Behind the Embroidery',
            'subtitle' => 'Procesul meticulos al personalizării',
            'image' => 'https://images.unsplash.com/photo-1761724794734-4ee4148a621b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbWJyb2lkZXJ5JTIwZGV0YWlsfGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
            'content' => [
                'Serviciul nostru de broderie personalizată reprezintă vârful personalizării. Fiecare piesă este realizată individual, transformând bijuteria ta într-o moștenire unică.',
                'Folosind tehnici rafinate de secole, specialiștii noștri în broderie lucrează cu fire de mătase și fibre de metal prețios pentru a crea designuri care vor dura generații. Procesul este minuțios, necesitând mâini stabile și o concentrare neclintită.',
                'De la consultația de design inițială până la ultimul punct, fiecare piesă personalizată primește peste 20 de ore de atenție dedicată. Credem că articolele care poartă marca ta personală merită nimic mai puțin decât perfecțiunea.',
                'Aceasta este bijuterie care îți spune povestea, realizată cu reverență atât pentru tradiție, cât și pentru individ.',
            ],
        ],
    ];
}

// ============================================
// MAIN SHORTCODE
// ============================================

add_shortcode('solus_stories', function($atts) {
    $stories_data = solus_get_stories_data();

    ob_start();
    ?>

<!-- ============================================
     INLINE CSS - THEME-ISOLATED STYLES
     ============================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* Reset all children to prevent theme interference */
.solus-stories-app,
.solus-stories-app * {
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
}

.solus-stories-app {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    background: #faf8f5 !important;
    background-color: #faf8f5 !important;
    min-height: 100vh;
    color: #2a2a2a !important;
    line-height: 1.5 !important;
}

/* Reset theme link styles */
.solus-stories-app a,
.solus-stories-app a:visited,
.solus-stories-app a:hover,
.solus-stories-app a:active {
    text-decoration: none !important;
    color: inherit !important;
}

/* Reset theme heading styles */
.solus-stories-app h1,
.solus-stories-app h2,
.solus-stories-app h3,
.solus-stories-app h4,
.solus-stories-app h5,
.solus-stories-app h6 {
    font-weight: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Reset theme paragraph styles */
.solus-stories-app p {
    margin: 0 !important;
    padding: 0 !important;
    color: inherit !important;
    line-height: inherit !important;
}

/* Reset theme button/input styles */
.solus-stories-app button,
.solus-stories-app input {
    background: none !important;
    border: none !important;
    outline: none !important;
    font-family: inherit !important;
}

.font-playfair {
    font-family: 'Playfair Display', serif !important;
}

/* ============================================
   STORIES LISTING VIEW
   ============================================ */
.solus-stories-app .solus-stories-listing {
    display: block !important;
}

.solus-stories-app .solus-stories-listing.hidden {
    display: none !important;
}

.solus-stories-app .solus-stories-hero {
    padding: 128px 32px 80px !important;
    text-align: center !important;
}

.solus-stories-app .solus-stories-hero h1 {
    font-family: 'Playfair Display', serif !important;
    font-size: clamp(36px, 8vw, 64px) !important;
    font-weight: 700 !important;
    color: #000 !important;
    letter-spacing: 0.05em !important;
    margin: 0 0 16px 0 !important;
    line-height: 1.1 !important;
}

.solus-stories-app .solus-stories-hero p {
    font-size: 15px !important;
    font-weight: 300 !important;
    color: #2a2a2a !important;
    line-height: 1.8 !important;
    max-width: 768px !important;
    margin: 0 auto !important;
}

.solus-stories-app .solus-stories-grid {
    padding: 0 32px 128px !important;
    max-width: 1800px !important;
    margin: 0 auto !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 48px !important;
}

@media (min-width: 768px) {
    .solus-stories-app .solus-stories-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        padding: 0 64px 128px !important;
        gap: 64px !important;
    }
}

.solus-stories-app .solus-story-card {
    cursor: pointer !important;
    transition: transform 0.3s ease !important;
}

.solus-stories-app .solus-story-card:hover {
    transform: translateY(-4px) !important;
}

.solus-stories-app .solus-story-image {
    position: relative !important;
    aspect-ratio: 3/4 !important;
    overflow: hidden !important;
    margin-bottom: 24px !important;
}

.solus-stories-app .solus-story-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    transition: transform 0.7s ease !important;
}

.solus-stories-app .solus-story-card:hover .solus-story-image img {
    transform: scale(1.05) !important;
}

.solus-stories-app .solus-story-overlay {
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent) !important;
}

.solus-stories-app .solus-story-info {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    padding: 32px !important;
    color: white !important;
}

.solus-stories-app .solus-story-title {
    font-family: 'Playfair Display', serif !important;
    font-size: 24px !important;
    font-weight: 600 !important;
    margin-bottom: 8px !important;
    color: white !important;
}

.solus-stories-app .solus-story-caption {
    font-size: 13px !important;
    font-weight: 300 !important;
    color: #c9a66b !important;
    line-height: 1.6 !important;
}

.solus-stories-app .solus-story-cta {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
}

.solus-stories-app .solus-story-card:hover .solus-story-cta {
    opacity: 1 !important;
}

.solus-stories-app .solus-story-cta-text {
    font-size: 12px !important;
    font-weight: 500 !important;
    color: #c9a66b !important;
    letter-spacing: 0.1em !important;
}

.solus-stories-app .solus-story-cta svg {
    color: #c9a66b !important;
    stroke: currentColor !important;
}

/* ============================================
   INDIVIDUAL STORY VIEW
   ============================================ */
.solus-stories-app .solus-story-view {
    display: none !important;
}

.solus-stories-app .solus-story-view.active {
    display: block !important;
}

.solus-stories-app .solus-story-back {
    position: fixed !important;
    top: 128px !important;
    left: 32px !important;
    z-index: 10 !important;
}

@media (min-width: 1024px) {
    .solus-stories-app .solus-story-back {
        left: 64px !important;
    }
}

.solus-stories-app .solus-story-back-btn {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    color: #2a2a2a !important;
    text-decoration: none !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.08em !important;
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    transition: color 0.3s !important;
    font-family: 'Montserrat', sans-serif !important;
}

.solus-stories-app .solus-story-back-btn:hover {
    color: #c9a66b !important;
}

.solus-stories-app .solus-story-back-btn svg {
    stroke: currentColor !important;
}

.solus-stories-app .solus-story-hero-image {
    position: relative !important;
    height: 70vh !important;
    overflow: hidden !important;
}

.solus-stories-app .solus-story-hero-image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
}

.solus-stories-app .solus-story-hero-overlay {
    position: absolute !important;
    inset: 0 !important;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), #faf8f5) !important;
}

.solus-stories-app .solus-story-content {
    position: relative !important;
    margin-top: -128px !important;
    z-index: 10 !important;
}

.solus-stories-app .solus-story-inner {
    max-width: 700px !important;
    margin: 0 auto !important;
    padding: 0 32px !important;
}

.solus-stories-app .solus-story-body {
    background: #faf8f5 !important;
    background-color: #faf8f5 !important;
    padding: 64px 0 128px !important;
}

.solus-stories-app .solus-story-header {
    text-align: center !important;
    margin-bottom: 64px !important;
}

.solus-stories-app .solus-story-header h1 {
    font-family: 'Playfair Display', serif !important;
    font-size: clamp(36px, 8vw, 56px) !important;
    font-weight: 700 !important;
    color: #000 !important;
    letter-spacing: 0.03em !important;
    margin: 0 0 16px 0 !important;
    line-height: 1.2 !important;
}

.solus-stories-app .solus-story-header p {
    font-size: 14px !important;
    font-weight: 300 !important;
    color: #c9a66b !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
}

.solus-stories-app .solus-story-article {
    display: flex !important;
    flex-direction: column !important;
    gap: 32px !important;
}

.solus-stories-app .solus-story-paragraph {
    font-size: 16px !important;
    font-weight: 300 !important;
    color: #2a2a2a !important;
    line-height: 2 !important;
    text-align: justify !important;
}

.solus-stories-app .solus-story-cta-section {
    margin-top: 80px !important;
    text-align: center !important;
}

.solus-stories-app .solus-story-cta-btn {
    display: inline-block !important;
    border: 2px solid #000 !important;
    padding: 16px 48px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 0.12em !important;
    text-decoration: none !important;
    color: #000 !important;
    background: transparent !important;
    background-color: transparent !important;
    cursor: pointer !important;
    transition: all 0.3s !important;
    font-family: 'Montserrat', sans-serif !important;
}

.solus-stories-app .solus-story-cta-btn:hover {
    background: #000 !important;
    background-color: #000 !important;
    color: #fff !important;
}

.solus-stories-app .solus-story-brand {
    border-top: 1px solid rgba(0,0,0,0.1) !important;
    padding: 48px 0 !important;
    background: #fff !important;
    background-color: #fff !important;
    text-align: center !important;
}

.solus-stories-app .solus-story-brand-mark {
    display: inline-block !important;
    padding: 8px 24px !important;
    border: 1px solid rgba(201, 166, 107, 0.3) !important;
}

.solus-stories-app .solus-story-brand-text {
    font-family: 'Playfair Display', serif !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #c9a66b !important;
}
</style>

<!-- ============================================
     HTML STRUCTURE
     ============================================ -->
<div class="solus-stories-app">
    <!-- STORIES LISTING VIEW -->
    <div class="solus-stories-listing" id="storiesListing">
        <!-- Hero -->
        <div class="solus-stories-hero">
            <h1>Povești Solus</h1>
            <p>Perspective editoriale în lumea noastră de meșteșug în ediție limitată, tehnici de moștenire și filozofia din spatele fiecărei piese pe care o creăm.</p>
        </div>

        <!-- Stories Grid -->
        <div class="solus-stories-grid">
            <?php foreach ($stories_data as $slug => $story): ?>
            <div class="solus-story-card" data-story="<?php echo esc_attr($slug); ?>">
                <div class="solus-story-image">
                    <img src="<?php echo esc_url($story['image']); ?>" alt="<?php echo esc_attr($story['title']); ?>" />
                    <div class="solus-story-overlay"></div>
                    <div class="solus-story-info">
                        <h3 class="solus-story-title"><?php echo esc_html($story['title']); ?></h3>
                        <p class="solus-story-caption"><?php echo esc_html($story['subtitle']); ?></p>
                    </div>
                </div>
                <div class="solus-story-cta">
                    <span class="solus-story-cta-text">CITEȘTE MAI MULT</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- INDIVIDUAL STORY VIEW -->
    <div class="solus-story-view" id="storyView">
        <div class="solus-story-back">
            <button class="solus-story-back-btn" id="backToStories">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M10 3L5 8L10 13"/>
                </svg>
                ÎNAPOI
            </button>
        </div>

        <div class="solus-story-hero-image" id="storyHeroImage">
            <img src="" alt="" id="storyHeroImg" />
            <div class="solus-story-hero-overlay"></div>
        </div>

        <div class="solus-story-content">
            <div class="solus-story-inner">
                <div class="solus-story-body">
                    <div class="solus-story-header">
                        <h1 id="storyTitle"></h1>
                        <p id="storySubtitle"></p>
                    </div>

                    <div class="solus-story-article" id="storyArticle">
                        <!-- Paragraphs will be inserted by JavaScript -->
                    </div>

                    <div class="solus-story-cta-section">
                        <button class="solus-story-cta-btn" onclick="window.location.href='<?php echo home_url('/magazin'); ?>'">
                            EXPLOREAZĂ COLECȚIILE
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="solus-story-brand">
            <div class="solus-story-brand-mark">
                <span class="solus-story-brand-text">⬡ SOLUS ⬡</span>
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

    // Stories data from PHP
    const STORIES = <?php echo json_encode($stories_data); ?>;

    // State
    let currentStory = null;

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initStories();
    });

    function initStories() {
        // Attach click handlers to story cards
        const storyCards = document.querySelectorAll('.solus-story-card');
        storyCards.forEach(card => {
            card.addEventListener('click', function() {
                const storySlug = this.dataset.story;
                showStory(storySlug);
            });
        });

        // Back button
        document.getElementById('backToStories').addEventListener('click', showListing);
    }

    function showListing() {
        document.getElementById('storiesListing').classList.remove('hidden');
        document.getElementById('storyView').classList.remove('active');
        window.scrollTo(0, 0);
        currentStory = null;
    }

    function showStory(storySlug) {
        const story = STORIES[storySlug];
        if (!story) return;

        currentStory = story;

        // Hide listing, show story
        document.getElementById('storiesListing').classList.add('hidden');
        document.getElementById('storyView').classList.add('active');

        // Update story content
        document.getElementById('storyHeroImg').src = story.image;
        document.getElementById('storyHeroImg').alt = story.title;
        document.getElementById('storyTitle').textContent = story.title;
        document.getElementById('storySubtitle').textContent = story.subtitle.toUpperCase();

        // Render article content
        const articleContainer = document.getElementById('storyArticle');
        articleContainer.innerHTML = '';

        story.content.forEach(paragraph => {
            const p = document.createElement('p');
            p.className = 'solus-story-paragraph';
            p.textContent = paragraph;
            articleContainer.appendChild(p);
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

})();
</script>

    <?php
    return ob_get_clean();
});
