<?php
/**
 * @var string $panel_id
 */
?>
<div id="<?= $panel_id; ?>" class="panel woocommerce_options_panel">
	<?php
	woocommerce_wp_text_input( array(
		'type'          => 'number',
        'id'            => '_minimum_amount',
        'wrapper_class' => '',
        'label'         => __( 'Minimum Amount Purchased', 'cater_waiter' ),
        //'description'   => __( 'Is this product grouped by amount? For example 1/2 dozen or 1 dozen', 'cater_waiter' ),
        'default'       => '1',
        'desc_tip'      => false
    ) );

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

	woocommerce_wp_checkbox( array(
		'id'            => '_product_grouped_allow_single',
		'label'         => __( 'Allow Single', 'cater_waiter' ),
		'description'   => __( 'If grouped, can a single item be purchased?', 'cater_waiter' ),
		'default'       => '0',
		'desc_tip'      => false,
	) );

	woocommerce_wp_text_input( array(
		'id'            => '_product_custom_price_label',
		'label'         => __( 'Custom Price Label', 'cater_waiter' ),
		'description'   => __( 'Override default display price with custom label.', 'cater_waiter' ),
		'default'       => '0',
		'desc_tip'      => false,
	) );

	woocommerce_wp_checkbox( array(
		'id'            => '_product_display_product_short_description',
		'label'         => __( 'Product Short Description', 'cater_waiter' ),
		'description'   => __( 'Display the field "Product Short Description" when a customer is adding the item to cart.', 'cater_waiter' ),
		'default'       => '0',
		'desc_tip'      => false,
	) );
	?>
</div>