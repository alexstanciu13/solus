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
     INLINE CSS
     ============================================ -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap');

.solus-stories-app * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.solus-stories-app {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #faf8f5;
    min-height: 100vh;
    color: #2a2a2a;
    line-height: 1.5;
}

.font-playfair { font-family: 'Playfair Display', serif; }

/* ============================================
   STORIES LISTING VIEW
   ============================================ */
.solus-stories-listing {
    display: block;
}

.solus-stories-listing.hidden {
    display: none;
}

.solus-stories-hero {
    padding: 128px 32px 80px;
    text-align: center;
}

.solus-stories-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 8vw, 64px);
    font-weight: 700;
    color: #000;
    letter-spacing: 0.05em;
    margin: 0 0 16px;
    line-height: 1.1;
}

.solus-stories-hero p {
    font-size: 15px;
    font-weight: 300;
    color: #2a2a2a;
    line-height: 1.8;
    max-width: 768px;
    margin: 0 auto;
}

.solus-stories-grid {
    padding: 0 32px 128px;
    max-width: 1800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
}

@media (min-width: 768px) {
    .solus-stories-grid {
        grid-template-columns: repeat(3, 1fr);
        padding: 0 64px 128px;
        gap: 64px;
    }
}

.solus-story-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.solus-story-card:hover {
    transform: translateY(-4px);
}

.solus-story-image {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    margin-bottom: 24px;
}

.solus-story-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}

.solus-story-card:hover .solus-story-image img {
    transform: scale(1.05);
}

.solus-story-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent);
}

.solus-story-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px;
    color: white;
}

.solus-story-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
}

.solus-story-caption {
    font-size: 13px;
    font-weight: 300;
    color: #c9a66b;
    line-height: 1.6;
}

.solus-story-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.solus-story-card:hover .solus-story-cta {
    opacity: 1;
}

.solus-story-cta-text {
    font-size: 12px;
    font-weight: 500;
    color: #c9a66b;
    letter-spacing: 0.1em;
}

/* ============================================
   INDIVIDUAL STORY VIEW
   ============================================ */
.solus-story-view {
    display: none;
}

.solus-story-view.active {
    display: block;
}

.solus-story-back {
    position: fixed;
    top: 128px;
    left: 32px;
    z-index: 10;
}

@media (min-width: 1024px) {
    .solus-story-back {
        left: 64px;
    }
}

.solus-story-back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #2a2a2a;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    font-family: inherit;
}

.solus-story-back-btn:hover {
    color: #c9a66b;
}

.solus-story-hero-image {
    position: relative;
    height: 70vh;
    overflow: hidden;
}

.solus-story-hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.solus-story-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), #faf8f5);
}

.solus-story-content {
    position: relative;
    margin-top: -128px;
    z-index: 10;
}

.solus-story-inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 32px;
}

.solus-story-body {
    background: #faf8f5;
    padding: 64px 0 128px;
}

.solus-story-header {
    text-align: center;
    margin-bottom: 64px;
}

.solus-story-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 8vw, 56px);
    font-weight: 700;
    color: #000;
    letter-spacing: 0.03em;
    margin: 0 0 16px;
    line-height: 1.2;
}

.solus-story-header p {
    font-size: 14px;
    font-weight: 300;
    color: #c9a66b;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.solus-story-article {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.solus-story-paragraph {
    font-size: 16px;
    font-weight: 300;
    color: #2a2a2a;
    line-height: 2;
    text-align: justify;
}

.solus-story-cta-section {
    margin-top: 80px;
    text-align: center;
}

.solus-story-cta-btn {
    display: inline-block;
    border: 2px solid #000;
    padding: 16px 48px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-decoration: none;
    color: #000;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    font-family: inherit;
}

.solus-story-cta-btn:hover {
    background: #000;
    color: #fff;
}

.solus-story-brand {
    border-top: 1px solid rgba(0,0,0,0.1);
    padding: 48px 0;
    background: #fff;
    text-align: center;
}

.solus-story-brand-mark {
    display: inline-block;
    padding: 8px 24px;
    border: 1px solid rgba(201, 166, 107, 0.3);
}

.solus-story-brand-text {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: #c9a66b;
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
