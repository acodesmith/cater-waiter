<?php

use CaterWaiter\Core\Load;

/**
 * Default state of the Online Order Cater Waiter React application.
 */
return [
    'labels'    => Load::config( 'labels.php' ),
    'settings'  => Load::config( 'settings.php' ),
    'request'   => [
        'api'   => [
            'baseurl' => '/wp-json/' . \CaterWaiter\API\Bootstrap::ENDPOINT_NAMESPACE,
        ],
        'ajax'  => [
            'baseurl' => admin_url( 'admin-ajax.php' ),
        ],
        'loading' => false,
    ],
    'view'      => [
        'current'   => 'select_order_type',
        'history'   => [],
        'pathway'   => [
            'delivery'  => [
                'select_order_type',
                'delivery_address',
                'schedule_order',
                'cart',
                'checkout',
                'confirm',
                'complete'
            ],
            'pickup'    => [
                'select_order_type',
                'select_location',
                'schedule_order',
                'cart',
                'checkout',
                'confirm',
                'complete'
            ]
        ]
    ],
    'data'  => Load::config( 'data.php' ),
    'order' => [
        'order_type'        => null,
        'order_location'    => null,
        'order_pickup_time' => null
    ]
];