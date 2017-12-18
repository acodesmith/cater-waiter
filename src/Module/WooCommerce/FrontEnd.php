<?php


namespace CaterWaiter\Module\WooCommerce;


class FrontEnd {

	public function __construct() {

		add_filter( 'woocommerce_enqueue_styles', [ $this, 'scripts' ] );
	}

	public function scripts() {

		wp_enqueue_script( 'cater_waiter_woocommerce_script', CATER_WAITER_PLUGIN_URL . 'dist/woocommerce.js', [], '0.0.1', true );
		wp_enqueue_style( 'cater_waiter_woocommerce_style', CATER_WAITER_PLUGIN_URL . 'dist/woocommerce.css', [], '0.0.1' );
	}
}