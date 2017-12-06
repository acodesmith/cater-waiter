<?php

$product_data = \CaterWaiter\Module\WooCommerce\ProductData::get();


return [
	'loading'               => false,
	'loading_message'       => null,
	'modal_loading'         => false,
	'modal_loading_message' => null,
    'locations'             => [],
    'location'              => null,
    'products'              => $product_data['products'],
	'grouped_products'      => $product_data['grouped_products'],
	'catering_categories'   => $product_data['catering_categories'],
	'show_product_options'  => null,
    'dates'     => [
        'today'         => date( 'Y-m-d', time() ),
        'timestamp'     => time()
    ]
];