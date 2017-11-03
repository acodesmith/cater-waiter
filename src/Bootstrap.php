<?php


namespace CaterWaiter;


use CaterWaiter\Admin\Locations;
use CaterWaiter\Admin\PageTemplater;
use CaterWaiter\Admin\WC_PluginSettings;
use CaterWaiter\Admin\WC_ProductDataTabs;
use CaterWaiter\FrontEnd\OnlineOrders;
use CaterWaiter\API\Bootstrap as BootstrapAPI;

class Bootstrap
{
    const DEP_ADMIN_SCRIPT  = 'cater_waiter_admin_script';

    const DEP_ADMIN_STYLE   = 'cater_waiter_admin_style';

    public function __construct()
    {
        add_action( 'plugins_loaded', [ $this, 'run' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'admin_scripts' ] );
    }

    public function run()
    {
        if ( ! class_exists( 'WooCommerce' ) ) {
            //@todo add admin error
            return;
        }

        new WC_PluginSettings();
        new WC_ProductDataTabs();
        new OnlineOrders();
        new Locations();
        new BootstrapAPI();
    }

    public function admin_scripts()
    {
        wp_enqueue_script( self::DEP_ADMIN_SCRIPT, CATER_WAITER_PLUGIN_URL . 'dist/admin.js', [ 'jquery' ], '0.0.1', true );
        wp_enqueue_style( self::DEP_ADMIN_STYLE, CATER_WAITER_PLUGIN_URL . 'dist/admin.css', [], '0.0.1' );
    }
}