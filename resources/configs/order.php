<?php

use CaterWaiter\Admin\Cart;

return [
	'order_type'              => null,
	'order_location'          => null,
	'order_pickup_time'       => null,
	'order_cart'              => Cart::cart_data(),
	'order_checkout_url'      => wc_get_checkout_url(),
	'order_delivery_address'  => [
		'delivery_address_city'     => null,
		'delivery_address_line_one' => null,
		'delivery_address_state'    => null,
		'delivery_address_zip'      => null,
		'delivery_within_range'     => null
	],
];