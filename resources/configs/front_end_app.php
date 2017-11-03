<?php

use CaterWaiter\Core\Load;

/**
 * Default state of the Online Order Cater Waiter React application.
 */
return [
    'labels' => Load::config( 'labels.php' ),
    'settings' => Load::config( 'settings.php' ),
    'api'   => [
        'baseurl' => '/wp-json/' . \CaterWaiter\API\Bootstrap::ENDPOINT_NAMESPACE
    ],
    'view'  => [
        'current' => [
            'text' => 'step_one',
        ]
    ]
];