<?php

$product_data = \CaterWaiter\Module\WooCommerce\ProductData::get();

return [
	'auth' => ! AUTH_ACTIVE ? null : [
		'user' => 'admin',
		'password' => 'brumit'
	],
	'loading'                 => false,
	'loading_message'         => null,
	'modal_loading'           => false,
	'modal_loading_message'   => null,
	'notifications'           => [],
	'location_posts'          => \CaterWaiter\Admin\Locations::all(),
	'locations'               => [],
	'location'                => null,
	'products'                => $product_data['products'],
	'grouped_products'        => $product_data['grouped_products'],
	'catering_categories'     => $product_data['catering_categories'],
	'show_product_options'    => null,
	'update_grouped_products' => null,
	'dates'                   => [
		'today'     => date( 'Y-m-d', time() ),
		'timestamp' => time()
	],
];