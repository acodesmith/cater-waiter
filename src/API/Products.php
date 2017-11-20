<?php


namespace CaterWaiter\API;


use CaterWaiter\Module\WooCommerce\ProductData;

class Products
{
    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route(Bootstrap::ENDPOINT_NAMESPACE, '/products/', [
                'methods' => 'GET',
                'callback' => [$this, 'index'],
            ]);
        });

        add_action( 'wp_ajax_product_test', [ $this, 'index' ] );
        add_action( 'wp_ajax_nopriv_product_test', [ $this, 'index' ] );
    }

    public function index()
    {
		return ProductData::get();
    }
}