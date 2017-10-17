<?php
/**
 * @var string $panel_id
 */
?>
<div id="<?= $panel_id; ?>" class="panel woocommerce_options_panel">
    <?php
    woocommerce_wp_checkbox( array(
        'id'            => '_my_custom_field',
        'wrapper_class' => 'show_if_simple',
        'label'         => __( 'My Custom Field Label', 'my_text_domain' ),
        'description'   => __( 'My Custom Field Description', 'my_text_domain' ),
        'default'       => '0',
        'desc_tip'      => false,
    ) );
    ?>
</div>