<?php


namespace CaterWaiter;


use CaterWaiter\Admin\PageTemplater;
use CaterWaiter\Admin\WC_ProductDataTabs;
use CaterWaiter\Core\Load;

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

        new WC_ProductDataTabs();

        $page_templater = PageTemplater::get_instance();
        $page_templater->templates = (array) json_decode( Load::config( 'page-templates' ) );
        $page_templater->template_root = CATER_WAITER_PLUGIN_PATH . 'resources/views/templates/';
    }

    public function admin_scripts()
    {
        wp_enqueue_script( self::DEP_ADMIN_SCRIPT, CATER_WAITER_PLUGIN_URL . 'dist/admin.js', [ 'jquery' ], '0.0.1', true );
        wp_enqueue_style( self::DEP_ADMIN_STYLE, CATER_WAITER_PLUGIN_URL . 'dist/admin.css', [], '0.0.1' );
    }
}