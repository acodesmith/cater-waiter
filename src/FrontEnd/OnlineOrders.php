<?php


namespace CaterWaiter\FrontEnd;


use CaterWaiter\API\Bootstrap;
use CaterWaiter\Core\Load;

class OnlineOrders {
	public function __construct() {
		add_filter( 'init', [ $this, 'register' ] );
	}

	public function register() {
		add_shortcode( 'online_orders', [ $this, 'online_orders' ] );
	}

	public function online_orders( $attrs ) {

		wp_enqueue_script( 'cater_waiter__online_orders_scripts', CATER_WAITER_PLUGIN_URL . 'dist/online-orders.js', [ 'jquery' ], '0.0.7', true );
		wp_localize_script( 'cater_waiter__online_orders_scripts', 'cw__config', Load::config( 'front_end_app.php' ) );

		wp_enqueue_style( 'cater_waiter__online_order_styles', CATER_WAITER_PLUGIN_URL . 'dist/online-orders.css', [], 1 );

		//@todo remove TEMP
		wp_enqueue_style( 'bootstrap_3', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' );

		// DOM node to load react component
		echo "<div id='cater_waiter__react_base' class='cw__base'></div>";
	}
}