<?php
/**
 * @var string $panel_id
 */
?>
<div id="<?= $panel_id; ?>" class="panel woocommerce_options_panel">
    <?php
    woocommerce_wp_checkbox( array(
        'id'            => '_catered_product',
        'wrapper_class' => 'show_if_simple',
        'label'         => __( 'Catered Product', 'cater_waiter' ),
        'description'   => __( 'Show this product on the catering menu?', 'cater_waiter' ),
        'default'       => '0',
        'desc_tip'      => false,
    ) );
    ?>
</div>