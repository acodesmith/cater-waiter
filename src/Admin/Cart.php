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
		$data = json_decode( stripslashes( file_get_contents("php://input") ) );
		$item = (array) reset( $data );
	    $remove = ['product_id', 'quantity', 'variation_id'];
	    $variations = array_diff_key( (array) $item, array_flip( $remove ) );

    	$result = \WC()->cart->add_to_cart( $item['product_id'], $item['quantity'], $item['variation_id'], $variations, $cart_item_data = array() );

    	wp_send_json( $result );
	    wp_die();
    }
}