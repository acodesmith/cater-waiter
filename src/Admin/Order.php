<?php


namespace CaterWaiter\Admin;


class Order
{
	const TAX_LOCATION_ID   = 'tax_location_id';

	const ORDER_INFO        = 'order_info';

	const TYPE_PICKUP       = 'pickup';

	const TYPE_DELIVERY     = 'delivery';

    public function __construct()
    {
        add_action( 'wp_ajax_set_tax_by_location', [ $this, 'set_tax_by_location' ] );
        add_action( 'wp_ajax_nopriv_set_tax_by_location', [ $this, 'set_tax_by_location' ] );

        add_action( 'wp_ajax_sync_order_data_to_session', [ $this, 'sync_order_data_to_session' ] );
        add_action( 'wp_ajax_nopriv_sync_order_data_to_session', [ $this, 'sync_order_data_to_session' ] );
    }

    public function set_tax_by_location()
    {
    	if( empty( \WC()->session ) ) {
		    $session_class  = apply_filters( 'woocommerce_session_handler', 'WC_Session_Handler' );
		    \WC()->session  = new $session_class();
	    }

    	if( \WC()->session && ! empty( $_REQUEST['location_id'] ) ) {
		    \WC()->session->set( self::TAX_LOCATION_ID, $_REQUEST['location_id'] );

		    wp_send_json([
			    'success' => ! empty( $_REQUEST['location_id'] ),
			    'location_id' => $_REQUEST['location_id'],
		    ]);
	    }else{
		    wp_send_json([
			    'success' => false,
			    'error' => 'Missing location_id',
		    ]);
	    }

    	wp_die();
    }

    public function sync_order_data_to_session()
    {
	    $order_info = (array) json_decode( stripslashes( file_get_contents("php://input") ) );

	    if( ! empty( $order_info['data'] ) ){
		    \WC()->session->set( self::ORDER_INFO, json_encode( $order_info['data'] ) );
		    wp_send_json(['success' => true]);
	    }else{
		    wp_send_json(['success' => false]);
	    }
	    wp_die();
    }
}