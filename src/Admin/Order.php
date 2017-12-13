<?php


namespace CaterWaiter\Admin;


class Order
{
	const TAX_LOCATION_ID = 'tax_location_id';

    public function __construct()
    {
        add_action( 'wp_ajax_set_tax_by_location', [ $this, 'set_tax_by_location' ] );
        add_action( 'wp_ajax_nopriv_set_tax_by_location', [ $this, 'set_tax_by_location' ] );
    }

    public function set_tax_by_location()
    {
    	\WC()->session->set( self::TAX_LOCATION_ID, $_POST['location_id'] );

    	wp_send_json([
    		'success' => ! empty( $_POST['location_id'] )
	    ]);
    	wp_die();
    }
}