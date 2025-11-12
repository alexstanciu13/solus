<?php
/**
 * ============================================
 * SOLUS CUSTOM EMBROIDERY - PROPER IMAGE HANDLING
 * ============================================
 *
 * This file provides enhanced image handling for the custom embroidery system.
 * Add this code to your functions.php AFTER the main shortcode code.
 *
 * FEATURES:
 * - Saves uploaded images to WordPress Media Library
 * - Attaches images to WooCommerce orders
 * - Displays images in admin order view
 * - Provides download links for production team
 * - Email notifications with image links
 *
 * ============================================
 */

// ============================================
// IMPROVED AJAX HANDLER - SAVES IMAGES PROPERLY
// ============================================

// Remove the old handler first
remove_action('wp_ajax_solus_add_custom_embroidery', 'solus_emb_add_to_cart');
remove_action('wp_ajax_nopriv_solus_add_custom_embroidery', 'solus_emb_add_to_cart');

// Add new improved handler
add_action('wp_ajax_solus_add_custom_embroidery', 'solus_emb_add_to_cart_improved');
add_action('wp_ajax_nopriv_solus_add_custom_embroidery', 'solus_emb_add_to_cart_improved');

function solus_emb_add_to_cart_improved() {
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

    // Save uploaded images to Media Library
    $saved_images = [];

    // Design image
    if (!empty($config['design_image'])) {
        $image_id = solus_emb_save_base64_image($config['design_image'], 'design-' . time());
        if ($image_id) {
            $saved_images['design_image_id'] = $image_id;
            $saved_images['design_image_url'] = wp_get_attachment_url($image_id);
            // Remove base64 data to save space
            unset($config['design_image']);
        }
    }

    // Custom reference image
    if (!empty($config['custom_ref_image'])) {
        $image_id = solus_emb_save_base64_image($config['custom_ref_image'], 'reference-' . time());
        if ($image_id) {
            $saved_images['custom_ref_image_id'] = $image_id;
            $saved_images['custom_ref_image_url'] = wp_get_attachment_url($image_id);
            // Remove base64 data to save space
            unset($config['custom_ref_image']);
        }
    }

    // Merge saved image data back into config
    $config = array_merge($config, $saved_images);

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

// ============================================
// SAVE BASE64 IMAGE TO MEDIA LIBRARY
// ============================================

function solus_emb_save_base64_image($base64_data, $filename_prefix = 'embroidery') {
    // Extract image data
    if (preg_match('/^data:image\/(\w+);base64,/', $base64_data, $type)) {
        $base64_data = substr($base64_data, strpos($base64_data, ',') + 1);
        $type = strtolower($type[1]); // jpg, png, gif

        // Decode base64
        $image_data = base64_decode($base64_data);

        if ($image_data === false) {
            return false;
        }

        // Generate unique filename
        $filename = sanitize_file_name($filename_prefix . '-' . uniqid() . '.' . $type);

        // WordPress upload directory
        $upload_dir = wp_upload_dir();
        $upload_path = $upload_dir['path'] . '/' . $filename;
        $upload_url = $upload_dir['url'] . '/' . $filename;

        // Save file
        file_put_contents($upload_path, $image_data);

        // Check file type
        $wp_filetype = wp_check_filetype($filename, null);

        // Prepare attachment data
        $attachment = [
            'post_mime_type' => $wp_filetype['type'],
            'post_title'     => sanitize_file_name($filename_prefix),
            'post_content'   => '',
            'post_status'    => 'inherit'
        ];

        // Insert attachment into Media Library
        $attachment_id = wp_insert_attachment($attachment, $upload_path);

        // Generate attachment metadata
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        $attach_data = wp_generate_attachment_metadata($attachment_id, $upload_path);
        wp_update_attachment_metadata($attachment_id, $attach_data);

        return $attachment_id;
    }

    return false;
}

// ============================================
// SAVE IMAGES TO ORDER META (ON CHECKOUT)
// ============================================

add_action('woocommerce_checkout_create_order_line_item', function($item, $cart_item_key, $values, $order) {
    if (isset($values['solus_embroidery'])) {
        $config = $values['solus_embroidery'];

        // Save all embroidery data to order item meta
        $item->update_meta_data('_solus_embroidery_config', $config);

        // Save image IDs separately for easy access
        if (!empty($config['design_image_id'])) {
            $item->update_meta_data('_solus_design_image_id', $config['design_image_id']);
        }
        if (!empty($config['custom_ref_image_id'])) {
            $item->update_meta_data('_solus_reference_image_id', $config['custom_ref_image_id']);
        }
    }
}, 10, 4);

// ============================================
// DISPLAY IMAGES IN ADMIN ORDER VIEW
// ============================================

add_action('woocommerce_after_order_itemmeta', function($item_id, $item, $product) {
    // Get embroidery config
    $config = $item->get_meta('_solus_embroidery_config');

    if (empty($config)) {
        return;
    }

    echo '<div style="margin: 15px 0; padding: 15px; background: #f9f9f9; border: 1px solid #ddd;">';
    echo '<h4 style="margin: 0 0 10px; color: #c9a66b;">📝 Broderie Personalizată</h4>';

    // Display configuration details
    echo '<table style="width: 100%; font-size: 13px; line-height: 1.8;">';
    echo '<tr><td><strong>Mărime:</strong></td><td>' . esc_html($config['size']) . '</td></tr>';
    echo '<tr><td><strong>Culoare:</strong></td><td>' . esc_html($config['color_name']) . '</td></tr>';

    if ($config['embroidery_type'] === 'text') {
        echo '<tr><td><strong>Tip:</strong></td><td>Broderie Text</td></tr>';
        echo '<tr><td><strong>Text:</strong></td><td>"' . esc_html($config['text']) . '"</td></tr>';
        echo '<tr><td><strong>Font:</strong></td><td>' . esc_html($config['font']) . '</td></tr>';
        echo '<tr><td><strong>Culoare ață:</strong></td><td>' . esc_html($config['thread_color']) . '</td></tr>';
        echo '<tr><td><strong>Plasament:</strong></td><td>' . esc_html($config['placement']) . '</td></tr>';
    } elseif ($config['embroidery_type'] === 'design') {
        echo '<tr><td><strong>Tip:</strong></td><td>Broderie Design</td></tr>';

        if (!empty($config['design_description'])) {
            echo '<tr><td><strong>Descriere:</strong></td><td>' . esc_html($config['design_description']) . '</td></tr>';
        }

        echo '<tr><td><strong>Tip culori:</strong></td><td>' . esc_html($config['color_type']) . '</td></tr>';
        echo '<tr><td><strong>Plasament:</strong></td><td>' . esc_html($config['placement']) . '</td></tr>';
    } elseif ($config['embroidery_type'] === 'custom') {
        echo '<tr><td><strong>Tip:</strong></td><td>Design Personalizat (Consultație)</td></tr>';

        if (!empty($config['custom_brief'])) {
            echo '<tr><td><strong>Brief:</strong></td><td>' . esc_html($config['custom_brief']) . '</td></tr>';
        }

        if (!empty($config['phone_number'])) {
            echo '<tr><td><strong>Telefon:</strong></td><td>' . esc_html($config['phone_number']) . '</td></tr>';
        }
    }

    echo '</table>';

    // Display uploaded images
    echo '<div style="margin-top: 15px;">';

    // Design image
    if (!empty($config['design_image_id'])) {
        $image_url = wp_get_attachment_url($config['design_image_id']);
        $image_thumb = wp_get_attachment_image_url($config['design_image_id'], 'thumbnail');

        echo '<div style="margin-bottom: 10px;">';
        echo '<strong>📎 Design încărcat:</strong><br>';
        echo '<a href="' . esc_url($image_url) . '" target="_blank">';
        echo '<img src="' . esc_url($image_thumb) . '" style="max-width: 150px; height: auto; border: 2px solid #c9a66b; margin-top: 5px;" />';
        echo '</a><br>';
        echo '<a href="' . esc_url($image_url) . '" target="_blank" style="color: #c9a66b;">Descarcă imaginea →</a>';
        echo '</div>';
    }

    // Reference image
    if (!empty($config['custom_ref_image_id'])) {
        $image_url = wp_get_attachment_url($config['custom_ref_image_id']);
        $image_thumb = wp_get_attachment_image_url($config['custom_ref_image_id'], 'thumbnail');

        echo '<div style="margin-bottom: 10px;">';
        echo '<strong>📎 Imagine referință:</strong><br>';
        echo '<a href="' . esc_url($image_url) . '" target="_blank">';
        echo '<img src="' . esc_url($image_thumb) . '" style="max-width: 150px; height: auto; border: 2px solid #c9a66b; margin-top: 5px;" />';
        echo '</a><br>';
        echo '<a href="' . esc_url($image_url) . '" target="_blank" style="color: #c9a66b;">Descarcă imaginea →</a>';
        echo '</div>';
    }

    echo '</div>';
    echo '</div>';

}, 10, 3);

// ============================================
// ADD IMAGE LINKS TO ORDER EMAILS
// ============================================

add_action('woocommerce_order_item_meta_end', function($item_id, $item, $order, $plain_text) {
    // Only show in admin emails
    if (!$order->has_status(['processing', 'completed'])) {
        return;
    }

    $config = $item->get_meta('_solus_embroidery_config');

    if (empty($config)) {
        return;
    }

    if ($plain_text) {
        // Plain text email
        echo "\n\n--- Broderie Personalizată ---\n";
        echo "Mărime: " . $config['size'] . "\n";
        echo "Culoare: " . $config['color_name'] . "\n";

        if ($config['embroidery_type'] === 'text') {
            echo "Tip: Broderie Text\n";
            echo "Text: \"" . $config['text'] . "\"\n";
            echo "Plasament: " . $config['placement'] . "\n";
        } elseif ($config['embroidery_type'] === 'design') {
            echo "Tip: Broderie Design\n";
            echo "Plasament: " . $config['placement'] . "\n";

            if (!empty($config['design_image_url'])) {
                echo "Design: " . $config['design_image_url'] . "\n";
            }
        } elseif ($config['embroidery_type'] === 'custom') {
            echo "Tip: Design Personalizat\n";
            echo "Telefon: " . $config['phone_number'] . "\n";

            if (!empty($config['custom_ref_image_url'])) {
                echo "Referință: " . $config['custom_ref_image_url'] . "\n";
            }
        }
    } else {
        // HTML email
        echo '<div style="margin: 15px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #c9a66b;">';
        echo '<h4 style="margin: 0 0 10px; color: #c9a66b;">Broderie Personalizată</h4>';
        echo '<p style="margin: 5px 0;"><strong>Mărime:</strong> ' . esc_html($config['size']) . '</p>';
        echo '<p style="margin: 5px 0;"><strong>Culoare:</strong> ' . esc_html($config['color_name']) . '</p>';

        if ($config['embroidery_type'] === 'text') {
            echo '<p style="margin: 5px 0;"><strong>Text:</strong> "' . esc_html($config['text']) . '"</p>';
            echo '<p style="margin: 5px 0;"><strong>Plasament:</strong> ' . esc_html($config['placement']) . '</p>';
        } elseif ($config['embroidery_type'] === 'design') {
            echo '<p style="margin: 5px 0;"><strong>Plasament:</strong> ' . esc_html($config['placement']) . '</p>';

            if (!empty($config['design_image_url'])) {
                echo '<p style="margin: 10px 0;"><strong>Design:</strong><br>';
                echo '<a href="' . esc_url($config['design_image_url']) . '" style="color: #c9a66b;">Descarcă imaginea →</a></p>';
            }
        } elseif ($config['embroidery_type'] === 'custom') {
            echo '<p style="margin: 5px 0;"><strong>Telefon:</strong> ' . esc_html($config['phone_number']) . '</p>';

            if (!empty($config['custom_ref_image_url'])) {
                echo '<p style="margin: 10px 0;"><strong>Referință:</strong><br>';
                echo '<a href="' . esc_url($config['custom_ref_image_url']) . '" style="color: #c9a66b;">Descarcă imaginea →</a></p>';
            }
        }

        echo '</div>';
    }
}, 10, 4);

// ============================================
// BULK DOWNLOAD ALL EMBROIDERY IMAGES
// ============================================

add_action('admin_menu', function() {
    add_submenu_page(
        'woocommerce',
        'Broderii Personalizate',
        'Broderii Personalizate',
        'manage_woocommerce',
        'solus-embroidery-orders',
        'solus_emb_admin_page'
    );
});

function solus_emb_admin_page() {
    ?>
    <div class="wrap">
        <h1>📝 Comenzi cu Broderie Personalizată</h1>

        <?php
        // Get all orders with custom embroidery
        $orders = wc_get_orders([
            'limit' => -1,
            'status' => ['processing', 'completed', 'pending'],
            'meta_key' => '_solus_has_embroidery',
            'orderby' => 'date',
            'order' => 'DESC',
        ]);

        if (empty($orders)) {
            echo '<p>Nu există comenzi cu broderie personalizată încă.</p>';
            return;
        }
        ?>

        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Comandă</th>
                    <th>Data</th>
                    <th>Client</th>
                    <th>Produs</th>
                    <th>Tip Broderie</th>
                    <th>Imagini</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($orders as $order): ?>
                    <?php foreach ($order->get_items() as $item): ?>
                        <?php
                        $config = $item->get_meta('_solus_embroidery_config');
                        if (empty($config)) continue;
                        ?>
                        <tr>
                            <td>
                                <a href="<?php echo esc_url(admin_url('post.php?post=' . $order->get_id() . '&action=edit')); ?>">
                                    #<?php echo $order->get_order_number(); ?>
                                </a>
                            </td>
                            <td><?php echo $order->get_date_created()->date('d.m.Y H:i'); ?></td>
                            <td><?php echo esc_html($order->get_billing_first_name() . ' ' . $order->get_billing_last_name()); ?></td>
                            <td><?php echo esc_html($item->get_name()); ?></td>
                            <td>
                                <?php
                                if ($config['embroidery_type'] === 'text') {
                                    echo '✏️ Text: "' . esc_html($config['text']) . '"';
                                } elseif ($config['embroidery_type'] === 'design') {
                                    echo '🎨 Design';
                                } elseif ($config['embroidery_type'] === 'custom') {
                                    echo '👤 Personalizat';
                                }
                                ?>
                            </td>
                            <td>
                                <?php if (!empty($config['design_image_id'])): ?>
                                    <a href="<?php echo wp_get_attachment_url($config['design_image_id']); ?>" target="_blank" class="button button-small">
                                        📎 Design
                                    </a>
                                <?php endif; ?>
                                <?php if (!empty($config['custom_ref_image_id'])): ?>
                                    <a href="<?php echo wp_get_attachment_url($config['custom_ref_image_id']); ?>" target="_blank" class="button button-small">
                                        📎 Referință
                                    </a>
                                <?php endif; ?>
                                <?php if (empty($config['design_image_id']) && empty($config['custom_ref_image_id'])): ?>
                                    —
                                <?php endif; ?>
                            </td>
                            <td><?php echo esc_html(wc_get_order_status_name($order->get_status())); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}

// Mark orders with embroidery for easy filtering
add_action('woocommerce_checkout_create_order', function($order, $data) {
    foreach (WC()->cart->get_cart() as $cart_item) {
        if (isset($cart_item['solus_embroidery'])) {
            $order->update_meta_data('_solus_has_embroidery', 'yes');
            break;
        }
    }
}, 10, 2);
