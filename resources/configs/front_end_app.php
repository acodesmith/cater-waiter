<?php

use CaterWaiter\Core\Load;

/**
 * Default state of the Online Order Cater Waiter React application.
 */
return [
	'data'     => Load::config( 'data.php' ),
	'labels'   => Load::config( 'labels.php' ),
	'order'    => Load::config( 'order.php' ),
	'settings' => Load::config( 'settings.php' ),
	'request'  => [
		'api'     => [
			'baseurl' => '/wp-json/' . \CaterWaiter\API\Bootstrap::ENDPOINT_NAMESPACE,
		],
		'ajax'    => [
			'site_url' => get_site_url(),
			'baseurl'  => admin_url( 'admin-ajax.php' ),
		],
		'loading' => false,
	],
	'view'     => [
		'current' => 'select_order_type',
		'history' => [],
		'pathway' => [
			'delivery' => [
				'select_order_type',
				'delivery_address',
				'schedule_order',
				'cart',
				'confirm',
				'checkout',
				'complete'
			],
			'pickup'   => [
				'select_order_type',
				'select_location',
				'schedule_order',
				'cart',
				'confirm',
				'checkout',
				'complete'
			]
		]
	],
];