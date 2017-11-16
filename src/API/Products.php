<?php


namespace CaterWaiter\API;


use CaterWaiter\Module\WooCommerce\ProductTaxonomy;
use CaterWaiter\Module\WooCommerce\RestProductData;

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
        $terms_in_taxonomy = get_terms(ProductTaxonomy::CATERING_CATEGORY_NAMESPACE, [
            'hide_empty' => false,
            'fields' => 'ids',
        ]);

        $query = new \WP_Query([
            'post_type' => 'product',
            'tax_query' => [
                [
                    'taxonomy' => ProductTaxonomy::CATERING_CATEGORY_NAMESPACE,
                    'terms' => $terms_in_taxonomy,
                    'operator' => 'IN',
                ]
            ]
        ]);

        if (!$query->have_posts()) {
            return new \WP_Error('No products found.');
        }

        $ids = array_map( function($post) {
            return $post->ID;
        }, $query->posts );

        $rest_product_data = new RestProductData();

        $products = array_map( function($product) use($rest_product_data) {
            return $rest_product_data->data( $product );
        }, (new \WC_Product_Query( [ 'include' => $ids ] ))->get_products() );

        return $products;
        $product_groups = [];

        foreach( $products as $product ) {

        }
    }
}