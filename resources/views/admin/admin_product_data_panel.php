<?php
/**
 * @var string $panel_id
 */
?>
<div id="<?= $panel_id; ?>" class="panel woocommerce_options_panel">
	<?php
	woocommerce_wp_select( array(
        'id'            => '_product_grouped_by_amount',
        'wrapper_class' => '',
        'label'         => __( 'Grouped By Amount', 'cater_waiter' ),
        'description'   => __( 'Is this product grouped by amount? For example 1/2 dozen or 1 dozen', 'cater_waiter' ),
        'default'       => '0',
        'desc_tip'      => false,
	    'options'       => [
            0   => 'No',
		    6   => '1/2 Dozen',
		    12  => '1 Dozen'
	    ]
    ) );
    ?>
	<?php
	woocommerce_wp_checkbox( array(
		'id'            => '_product_grouped_allow_single',
		'label'         => __( 'Allow Single', 'cater_waiter' ),
		'description'   => __( 'If grouped, can a single item be purchased?', 'cater_waiter' ),
		'default'       => '0',
		'desc_tip'      => false,
	) );
	?>
	<?php
	woocommerce_wp_text_input( array(
		'id'            => '_product_custom_price_label',
		'label'         => __( 'Custom Price Label', 'cater_waiter' ),
		'description'   => __( 'Override default display price with custom label.', 'cater_waiter' ),
		'default'       => '0',
		'desc_tip'      => false,
	) );
	?>
</div>