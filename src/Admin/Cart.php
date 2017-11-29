<?php


namespace CaterWaiter\Admin;


class Cart
{
    public function __construct()
    {
        add_action( 'wp_ajax_add_item_to_cart', [ $this, 'add_item_to_cart' ] );
        add_action( 'wp_ajax_nopriv_add_item_to_cart', [ $this, 'add_item_to_cart' ] );
    }

    public function add_item_to_cart()
    {
    	global $woocommerce;

    	var_dump( $woocommerce->cart );

    	//\WC()->cart->add_to_cart( $product_id = 0, $quantity = 1, $variation_id = 0, $variation = array(), $cart_item_data = array() );
    }
}