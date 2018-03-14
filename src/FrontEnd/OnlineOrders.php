<?php


namespace CaterWaiter\FrontEnd;

use CaterWaiter\Core\Load;

class OnlineOrders {

	const DEP_ONLINE_ORDERS_SCRIPTS = 'cater_waiter__online_orders_scripts';
	const DEP_ONLINE_ORDERS_STYLES = 'cater_waiter__online_order_styles';

	public function __construct() {
		add_filter( 'init', [ $this, 'register' ] );
		add_action( 'woocommerce_thankyou', [ $this, 'clear_local_storage' ] );
	}

	public function register() {
		add_shortcode( 'online_orders', [ $this, 'online_orders' ] );
	}

	public function online_orders( $attrs ) {

		wp_enqueue_script( self::DEP_ONLINE_ORDERS_SCRIPTS, CATER_WAITER_PLUGIN_URL . 'dist/online-orders.js', [ 'jquery' ], '0.0.8', true );
		wp_localize_script( self::DEP_ONLINE_ORDERS_SCRIPTS, 'cw__config', Load::config( 'front_end_app.php' ) );

		wp_enqueue_style( self::DEP_ONLINE_ORDERS_STYLES, CATER_WAITER_PLUGIN_URL . 'dist/online-orders.css', [], 1 );

		//@todo remove TEMP
		wp_enqueue_style( 'bootstrap_3', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' );

		// DOM node to load react component
		echo "<div id='cater_waiter__react_base' class='cw__base'></div>";
	}

	public function clear_local_storage() {

echo <<<HTML
 <script>
	var key = 'cw_online_order';
	
	if( typeof window.localStorage === 'object' ) {
	    window.localStorage.removeItem(key);
	}
</script>
HTML;
	}
}