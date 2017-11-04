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
            'baseurl' => '/wp-json/' . \CaterWaiter\API\Bootstrap::ENDPOINT_NAMESPACE
        ],
        'ajax'  => [
            'baseurl' => admin_url( 'admin-ajax.php' )
        ],
        'loading' => false
    ],
    'view'      => [
        'current'   => [
            'text'  => 'step_one',
        ]
    ],
    'data'  => [
        'locations' => false
    ]
];