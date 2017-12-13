<?php


namespace CaterWaiter\Admin;


class Cart
{
    public function __construct()
    {
        add_action( 'wp_ajax_add_item_to_cart', [ $this, 'add_item_to_cart' ] );
        add_action( 'wp_ajax_nopriv_add_item_to_cart', [ $this, 'add_item_to_cart' ] );

        add_action( 'wp_ajax_cart', [ $this, 'cart' ] );
        add_action( 'wp_ajax_nopriv_cart', [ $this, 'cart' ] );

        add_action( 'wp_ajax_remove_grouped_product', [ $this, 'remove_grouped_product' ] );
        add_action( 'wp_ajax_remove_grouped_product', [ $this, 'remove_grouped_product' ] );
    }

    public function add_item_to_cart()
    {
		$cart_items = (array) json_decode( stripslashes( file_get_contents("php://input") ) );
		$items_added = 0;


		foreach ( $cart_items as $cart_item ) {
			$cart_item = (array) $cart_item;
			$remove = ['product_id', 'quantity', 'variation_id'];
			$variations = array_diff_key( (array) $cart_item, array_flip( $remove ) );

			if( $success = \WC()->cart->add_to_cart( $cart_item['product_id'], $cart_item['quantity'], $cart_item['variation_id'], $variations, $cart_item_data = array() ) ) {
				$items_added++;
			}
		}

    	if( $items_added )
		    $this->cart( $items_added . __( ' items added to the your order.', 'cater_waiter' ) );
    	else{
		    wp_send_json([
		    	'success' => false,
			    'error' => __( 'Add to cart failed!', 'cater_waiter' )
		    ]);
	    }
    }

    public function cart($message = '')
    {
    	$cart = self::cart_data();

    	wp_send_json([
		    'success' => true,
		    'cart' => $cart,
		    'message' => $message
	    ]);
    	wp_die();
    }

	/**
	 * @return array
	 */
    public static function cart_data()
    {
	    $cart = \WC()->cart;
	    $cart_items = [];

	    foreach ( WC()->cart->get_cart() as $cart_item ) {
		    $cart_items[] = $cart_item;
	    }

	    return [
		    'subtotal'  => $cart->get_subtotal(),
		    'tax'       => $cart->get_taxes_total(),
		    'total'     => $cart->get_cart_total(),
		    'items'     => $cart_items,
	    ];
    }

    public function remove_grouped_product()
    {
    	if( ! empty( $_REQUEST['product_id'] ) ) {

			foreach( \WC()->cart->get_cart() as $cart_item ) {
				if( $cart_item['product_id'] == $_REQUEST['product_id'] )
					\WC()->cart->remove_cart_item( $cart_item['key'] );
			}

		    wp_send_json([
			    'success' => true
		    ]);
	    }else{
		    wp_send_json([
			    'success' => false,
			    'error' => 'Missing product_id'
		    ]);
	    }


	    wp_die();
    }
}