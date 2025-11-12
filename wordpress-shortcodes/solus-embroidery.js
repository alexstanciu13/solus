/**
 * SOLUS CUSTOM EMBROIDERY JAVASCRIPT
 * Interactive functionality for custom embroidery customization
 *
 * Upload to: wp-content/themes/astra-child/assets/solus-embroidery.js
 */

(function($) {
    'use strict';

    // ============================================
    // STATE MANAGEMENT
    // ============================================

    const state = {
        productId: null,
        productSlug: null,
        basePrice: 0,

        // Step 1
        selectedSize: null,
        selectedColor: null,
        selectedColorName: null,

        // Step 2
        embroideryType: null,

        // Step 3 - Text
        customText: '',
        selectedFont: 'classic',
        selectedFontClass: 'font-playfair',
        threadColor: '#000000',
        textPlacement: '',

        // Step 3 - Design
        designDescription: '',
        designImageData: null,
        colorType: 'single',
        singleColor: '#000000',
        multiColors: ['#000000', '', ''],
        designPlacement: '',

        // Step 3 - Custom
        customRefImageData: null,
        customBrief: '',
        phoneNumber: '',
    };

    // ============================================
    // PLACEMENT COORDINATES
    // ============================================

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

    // ============================================
    // INITIALIZATION
    // ============================================

    $(document).ready(function() {
        if ($('.solus-embroidery-product').length) {
            initProduct();
        }
    });

    function initProduct() {
        const $container = $('.solus-embroidery-product');
        state.productId = $container.data('product-id');
        state.productSlug = $container.data('product-slug');
        state.basePrice = parseFloat($container.data('base-price')) || 0;

        // Attach event handlers
        attachSizeColorHandlers();
        attachEmbroideryTypeHandlers();
        attachTextEmbroideryHandlers();
        attachDesignEmbroideryHandlers();
        attachCustomDesignHandlers();
        attachAddToCartHandler();
        attachSizeGuideToggle();
    }

    // ============================================
    // STEP 1: SIZE & COLOR
    // ============================================

    function attachSizeColorHandlers() {
        // Size selection
        $('.solus-emb-size-btn').on('click', function() {
            $('.solus-emb-size-btn').removeClass('active');
            $(this).addClass('active');
            state.selectedSize = $(this).data('size');
            $('#selected-size').val(state.selectedSize);
            checkStep1Complete();
        });

        // Color selection
        $('.solus-emb-color-btn').on('click', function() {
            $('.solus-emb-color-btn').removeClass('active');
            $(this).addClass('active');
            state.selectedColor = $(this).data('color');
            state.selectedColorName = $(this).data('color-name');
            $('#selected-color').val(state.selectedColor);
            $('#color-selected-text').text('Selectat: ' + state.selectedColorName);

            // Update preview overlay
            updateColorOverlay();

            checkStep1Complete();
        });
    }

    function checkStep1Complete() {
        if (state.selectedSize && state.selectedColor) {
            $('#step-2').slideDown(400);
        }
    }

    function updateColorOverlay() {
        const $overlay = $('#solus-color-overlay');
        const $overlayMobile = $('#solus-color-overlay-mobile');

        if (state.selectedColor) {
            $overlay.css('background-color', state.selectedColor).addClass('active');
            $overlayMobile.css('background-color', state.selectedColor).addClass('active');
        } else {
            $overlay.removeClass('active');
            $overlayMobile.removeClass('active');
        }
    }

    // Size Guide Toggle
    function attachSizeGuideToggle() {
        $('#size-guide-toggle').on('click', function() {
            $(this).toggleClass('active');
            $('#size-guide').slideToggle(300);
        });
    }

    // ============================================
    // STEP 2: EMBROIDERY TYPE
    // ============================================

    function attachEmbroideryTypeHandlers() {
        $('.solus-emb-type-btn').on('click', function() {
            $('.solus-emb-type-btn').removeClass('active');
            $(this).addClass('active');
            state.embroideryType = $(this).data('type');
            $('#embroidery-type').val(state.embroideryType);

            // Hide all step 3 variations
            $('#step-3-text, #step-3-design, #step-3-custom').hide();

            // Show appropriate step 3
            if (state.embroideryType === 'text') {
                $('#step-3-text').slideDown(400);
            } else if (state.embroideryType === 'design') {
                $('#step-3-design').slideDown(400);
            } else if (state.embroideryType === 'custom') {
                $('#step-3-custom').slideDown(400);
                showCustomSummary();
            }

            updateEmbroideryPreview();
        });
    }

    // ============================================
    // STEP 3A: TEXT EMBROIDERY
    // ============================================

    function attachTextEmbroideryHandlers() {
        // Text input
        $('#custom-text').on('input', function() {
            state.customText = $(this).val().slice(0, 20);
            $('#char-count').text(state.customText.length);
            updateEmbroideryPreview();
            checkTextComplete();
        });

        // Font selection
        $('.solus-emb-font-btn').on('click', function() {
            $('.solus-emb-font-btn').removeClass('active');
            $(this).addClass('active');
            state.selectedFont = $(this).data('font');
            state.selectedFontClass = $(this).data('font-class');
            $('#selected-font').val(state.selectedFont);
            $('#selected-font-class').val(state.selectedFontClass);
            updateEmbroideryPreview();
        });

        // Thread color
        $('.solus-emb-thread-btn').on('click', function() {
            $('.solus-emb-thread-btn').removeClass('active');
            $(this).addClass('active');
            state.threadColor = $(this).data('thread');
            $('#thread-color').val(state.threadColor);
            updateEmbroideryPreview();
        });

        // Placement
        $('#text-placement').on('change', function() {
            state.textPlacement = $(this).val();
            updateEmbroideryPreview();
            checkTextComplete();
        });
    }

    function checkTextComplete() {
        if (state.customText && state.textPlacement) {
            showSummary();
        }
    }

    // ============================================
    // STEP 3B: DESIGN EMBROIDERY
    // ============================================

    function attachDesignEmbroideryHandlers() {
        // Description
        $('#design-description').on('input', function() {
            state.designDescription = $(this).val();
            checkDesignComplete();
        });

        // File upload
        $('#design-upload').on('change', function(e) {
            handleFileUpload(e.target.files[0], 'design');
        });

        $('#design-remove').on('click', function() {
            state.designImageData = null;
            $('#design-image-data').val('');
            $('#design-preview').hide();
            $('#design-preview-img').attr('src', '');
            $('#design-upload-text').text('Alege fișier sau trage aici (Max 5MB)');
            updateEmbroideryPreview();
        });

        // Color type
        $('input[name="color_type"]').on('change', function() {
            state.colorType = $(this).val();

            $('#single-color-selector').toggle(state.colorType === 'single');

            if (state.colorType === 'multi') {
                renderMultiColorSelector();
                $('#multi-color-selector').show();
            } else {
                $('#multi-color-selector').hide();
            }
        });

        // Single color
        $('.solus-single-color').on('click', function() {
            $('.solus-single-color').removeClass('active');
            $(this).addClass('active');
            state.singleColor = $(this).data('thread');
            $('#single-color').val(state.singleColor);
        });

        // Placement
        $('#design-placement').on('change', function() {
            state.designPlacement = $(this).val();
            updateEmbroideryPreview();
            checkDesignComplete();
        });
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
                $('#design-image-data').val(imageData);
                $('#design-preview-img').attr('src', imageData);
                $('#design-preview').show();
                $('#design-upload-text').text(file.name);
                updateEmbroideryPreview();
                checkDesignComplete();
            } else if (type === 'custom') {
                state.customRefImageData = imageData;
                $('#custom-preview-img').attr('src', imageData);
                $('#custom-preview').show();
                $('#custom-upload-text').text(file.name);
            }
        };
        reader.readAsDataURL(file);
    }

    function renderMultiColorSelector() {
        const threadColors = [
            { name: 'Negru', value: '#000000' },
            { name: 'Alb', value: '#FFFFFF' },
            { name: 'Gri Închis', value: '#4a4a4a' },
            { name: 'Gri Deschis', value: '#a0a0a0' },
            { name: 'Albastru Navy', value: '#1a365d' },
            { name: 'Vin', value: '#7c2d3e' },
            { name: 'Verde Pădure', value: '#1b3a2d' },
            { name: 'Auriu', value: '#c9a66b' },
        ];

        const $container = $('#multi-color-selector');
        $container.empty();

        for (let i = 0; i < 3; i++) {
            const $colorGroup = $('<div style="margin-bottom: 16px;"></div>');
            $colorGroup.append(`<p style="font-size: 11px; color: #666; margin-bottom: 8px;">Culoare ${i + 1}</p>`);

            const $colorButtons = $('<div class="solus-emb-thread-colors"></div>');

            threadColors.forEach(color => {
                const $btn = $(`
                    <button type="button"
                            class="solus-emb-thread-btn solus-multi-color"
                            data-index="${i}"
                            data-thread="${color.value}"
                            style="background-color: ${color.value}; width: 40px; height: 40px;"
                            title="${color.name}">
                        <svg class="solus-emb-thread-check" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7L5 9L11 3" stroke="${color.value === '#FFFFFF' ? '#000' : '#fff'}" stroke-width="2"/>
                        </svg>
                    </button>
                `);

                $btn.on('click', function() {
                    const index = $(this).data('index');
                    const colorValue = $(this).data('thread');

                    $(`.solus-multi-color[data-index="${index}"]`).removeClass('active');
                    $(this).addClass('active');

                    state.multiColors[index] = colorValue;
                });

                $colorButtons.append($btn);
            });

            $colorGroup.append($colorButtons);
            $container.append($colorGroup);
        }
    }

    function checkDesignComplete() {
        if ((state.designDescription || state.designImageData) && state.designPlacement) {
            showSummary();
        }
    }

    // ============================================
    // STEP 3C: CUSTOM DESIGN
    // ============================================

    function attachCustomDesignHandlers() {
        // File upload
        $('#custom-upload').on('change', function(e) {
            handleFileUpload(e.target.files[0], 'custom');
        });

        $('#custom-remove').on('click', function() {
            state.customRefImageData = null;
            $('#custom-preview').hide();
            $('#custom-preview-img').attr('src', '');
            $('#custom-upload-text').text('Alege fișier sau trage aici (Max 5MB)');
        });

        // Brief
        $('#custom-brief').on('input', function() {
            state.customBrief = $(this).val();
        });

        // Phone number
        $('#phone-number').on('input', function() {
            state.phoneNumber = $(this).val();
            checkCustomComplete();
        });
    }

    function checkCustomComplete() {
        if (state.phoneNumber) {
            showCustomSummary();
        }
    }

    function showCustomSummary() {
        $('#mobile-preview').slideDown(400);
        $('#step-summary').slideDown(400);
        $('#add-to-cart-btn').hide();
        $('#whatsapp-btn').show();

        renderSummary();
        updatePriceDisplay();
    }

    // ============================================
    // EMBROIDERY PREVIEW
    // ============================================

    function updateEmbroideryPreview() {
        const $preview = $('#solus-embroidery-preview');
        const $previewMobile = $('#solus-embroidery-preview-mobile');

        $preview.empty();
        $previewMobile.empty();

        if (state.embroideryType === 'text' && state.customText && state.textPlacement) {
            const textPreview = renderTextPreview();
            $preview.append(textPreview);
            $previewMobile.append(textPreview.clone());
        } else if (state.embroideryType === 'design' && state.designPlacement) {
            const designPreview = renderDesignPreview();
            $preview.append(designPreview);
            $previewMobile.append(designPreview.clone());
        } else if (state.embroideryType === 'custom') {
            const customBadge = renderCustomBadge();
            $preview.append(customBadge);
            $previewMobile.append(customBadge.clone());
        }
    }

    function renderTextPreview() {
        const coords = PLACEMENTS[state.textPlacement] || {};
        const checkColor = state.threadColor === '#FFFFFF' ? '#000' : '#fff';

        const style = `
            top: ${coords.top || '30%'};
            ${coords.left ? 'left: ' + coords.left : ''};
            ${coords.right ? 'right: ' + coords.right : ''};
            width: ${coords.width || '40%'};
            ${coords.transform ? 'transform: ' + coords.transform : ''};
        `;

        return $(`
            <div class="solus-emb-text-preview" style="${style}">
                <div class="solus-emb-text-preview__box">
                    <div class="solus-emb-text-preview__text ${state.selectedFontClass}"
                         style="color: ${state.threadColor}">
                        ${escapeHtml(state.customText)}
                    </div>
                </div>
            </div>
        `);
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
            return $(`
                <div class="solus-emb-design-preview" style="${style}">
                    <div class="solus-emb-design-preview__box">
                        <img src="${state.designImageData}" alt="Design preview" />
                    </div>
                </div>
            `);
        } else {
            return $(`
                <div class="solus-emb-design-preview" style="${style}">
                    <div class="solus-emb-design-preview__placeholder">
                        DESIGN
                    </div>
                </div>
            `);
        }
    }

    function renderCustomBadge() {
        return $(`
            <div class="solus-emb-custom-badge">
                <div class="solus-emb-custom-badge__box">
                    <p class="solus-emb-custom-badge__title">DESIGN PERSONALIZAT</p>
                    <p class="solus-emb-custom-badge__text">
                        Plasament & detalii determinate cu designerul
                    </p>
                </div>
            </div>
        `);
    }

    // ============================================
    // SUMMARY & PRICE
    // ============================================

    function showSummary() {
        $('#mobile-preview').slideDown(400);
        $('#step-summary').slideDown(400);
        $('#add-to-cart-btn').show();
        $('#whatsapp-btn').hide();

        renderSummary();
        updatePriceDisplay();

        // Enable add to cart if all required fields filled
        const canAddToCart = validateConfiguration();
        $('#add-to-cart-btn').prop('disabled', !canAddToCart);
    }

    function renderSummary() {
        const $list = $('#summary-list');
        $list.empty();

        // Size
        $list.append(createSummaryItem('Mărime:', state.selectedSize));

        // Color
        const colorSwatch = `<div style="width: 20px; height: 20px; border: 2px solid rgba(0,0,0,0.2); background: ${state.selectedColor}; display: inline-block; vertical-align: middle; margin-left: 8px;"></div>`;
        $list.append(createSummaryItem('Culoare:', state.selectedColorName + colorSwatch));

        // Embroidery type
        let embType = '';
        if (state.embroideryType === 'text') embType = 'Broderie Text';
        if (state.embroideryType === 'design') embType = 'Broderie Design';
        if (state.embroideryType === 'custom') embType = 'Design Personalizat (Consultație)';
        $list.append(createSummaryItem('Tip broderie:', embType));

        // Text embroidery details
        if (state.embroideryType === 'text' && state.customText) {
            $list.append(createSummaryItem(
                'Text:',
                `<span class="${state.selectedFontClass}" style="color: ${state.threadColor}">"${escapeHtml(state.customText)}"</span>`
            ));
        }

        // Placement
        if (state.textPlacement || state.designPlacement) {
            $list.append(createSummaryItem('Plasament:', state.textPlacement || state.designPlacement));
        }
    }

    function createSummaryItem(label, value) {
        return $(`
            <div class="solus-emb-summary-item">
                <span class="solus-emb-summary-item__label">${label}</span>
                <span class="solus-emb-summary-item__value">${value}</span>
            </div>
        `);
    }

    function updatePriceDisplay() {
        const prices = calculatePrice();

        $('#base-price-display').text(prices.base + ' LEI');

        if (prices.embroidery > 0) {
            $('#embroidery-price-row').show();
            $('#embroidery-price-display').text('+' + prices.embroidery + ' LEI');
        } else {
            $('#embroidery-price-row').hide();
        }

        if (state.embroideryType === 'custom') {
            $('#total-price-display').text('De stabilit');
        } else {
            $('#total-price-display').text(prices.total + ' LEI');
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
            base: state.basePrice,
            embroidery: embroideryPrice,
            total: state.basePrice + embroideryPrice,
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

    // ============================================
    // ADD TO CART
    // ============================================

    function attachAddToCartHandler() {
        $('#add-to-cart-btn').on('click', function() {
            if (!validateConfiguration()) {
                alert('Vă rugăm completați toate câmpurile obligatorii.');
                return;
            }

            const $btn = $(this);
            $btn.prop('disabled', true).html('<span class="solus-emb-loading"></span> ADĂUGARE...');

            const config = {
                product_id: state.productId,
                size: state.selectedSize,
                color: state.selectedColor,
                color_name: state.selectedColorName,
                embroidery_type: state.embroideryType,
                text: state.customText,
                font: state.selectedFont,
                font_class: state.selectedFontClass,
                thread_color: state.threadColor,
                placement: state.textPlacement || state.designPlacement,
                design_description: state.designDescription,
                design_image: state.designImageData,
                color_type: state.colorType,
                single_color: state.singleColor,
                multi_colors: state.multiColors,
            };

            $.ajax({
                url: solusEmbroidery.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'solus_add_custom_embroidery',
                    nonce: solusEmbroideryNonce,
                    product_id: state.productId,
                    config: JSON.stringify(config),
                },
                success: function(response) {
                    if (response.success) {
                        $btn.html('✓ ADĂUGAT ÎN COȘ');
                        setTimeout(function() {
                            window.location.href = response.data.cart_url;
                        }, 1000);
                    } else {
                        alert(response.data.message || 'Eroare la adăugare în coș');
                        $btn.prop('disabled', false).text('ADAUGĂ ÎN COȘ');
                    }
                },
                error: function() {
                    alert('Eroare la comunicarea cu serverul');
                    $btn.prop('disabled', false).text('ADAUGĂ ÎN COȘ');
                }
            });
        });

        // WhatsApp button
        $('#whatsapp-btn').on('click', function() {
            if (!state.phoneNumber) {
                alert('Vă rugăm introduceți numărul de telefon.');
                return;
            }

            const productName = $('.solus-emb-product-title').text();
            const message = `Bună ziua Solus! Doresc să lucrez cu un designer pentru broderie personalizată pe ${productName}. ${state.customBrief ? `Iată ideea mea: ${state.customBrief}.` : ''} Mă puteți contacta la ${state.phoneNumber}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${solusEmbroidery.whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

})(jQuery);
