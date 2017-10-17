<?php


namespace CaterWaiter;


use CaterWaiter\Admin\WC_ProductDataTabs;

class Bootstrap
{
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

        new WC_ProductDataTabs();
    }

    public function admin_scripts()
    {

    }
}