<?php


namespace CaterWaiter;


use CaterWaiter\Admin\Cart;
use CaterWaiter\Admin\Locations;
use CaterWaiter\Admin\Log;
use CaterWaiter\Admin\Order;
use CaterWaiter\Admin\WC_PluginSettings;
use CaterWaiter\Admin\WC_ProductDataTabs;
use CaterWaiter\FrontEnd\OnlineOrders;
use CaterWaiter\API\Bootstrap as BootstrapAPI;
use CaterWaiter\Module\WooCommerce\Checkout;
use CaterWaiter\Module\WooCommerce\FrontEnd;
use CaterWaiter\Module\WooCommerce\ProductTaxonomy;

/**
 * Class Bootstrap
 * @package CaterWaiter
 */
class Bootstrap
{
    const DEP_ADMIN_SCRIPT  = 'cater_waiter_admin_script';

    const DEP_ADMIN_STYLE   = 'cater_waiter_admin_style';

    public function __construct()
    {
        add_action( 'plugins_loaded', [ $this, 'run' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
    }

	/**
	 * Check for WooCommerce then run all the required classes
	 */
    public function run()
    {
        if ( ! class_exists( 'WooCommerce' ) ) {
	        add_action( 'admin_notices', [ $this, 'woocommerce_required' ] );
            return;
        }

        new WC_PluginSettings();
        new WC_ProductDataTabs();
        new OnlineOrders();
        new Locations();
        new BootstrapAPI();
        new ProductTaxonomy();
        new Cart();
        new Order();
        new Checkout();
        new Log();
        new \CaterWaiter\Module\WooCommerce\Order();
    }

	/**
	 * Load scripts and styles into the admin.
	 */
    public function admin_scripts()
    {
        wp_enqueue_script( self::DEP_ADMIN_SCRIPT, CATER_WAITER_PLUGIN_URL . 'dist/admin.js', [ 'jquery' ], '0.0.1', true );
        wp_enqueue_style( self::DEP_ADMIN_STYLE, CATER_WAITER_PLUGIN_URL . 'dist/admin.css', [], '0.0.1' );
    }

	/**
	 * Display admin notice for WooCommerce requirement
	 */
	public function woocommerce_required() {

		$class = 'notice notice-error';
		$message = __( 'WooCommerce is required to use Cater Waiter!', 'cater-waiter' );

		printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
	}
}