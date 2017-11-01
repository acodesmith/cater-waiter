<?php


namespace CaterWaiter\FrontEnd;


use CaterWaiter\Core\Load;

class OnlineOrders
{
    public function __construct()
    {
        add_filter( 'init', [ $this, 'register' ] );
    }

    public function register()
    {
        add_shortcode( 'online_orders', [ $this, 'online_orders' ] );
    }

    public function online_orders($attrs)
    {
        //$attrs

        wp_enqueue_script( 'cater_waiter__online_orders', CATER_WAITER_PLUGIN_URL . 'dist/online-orders.js', [ 'jquery' ], '0.0.1', true );

        wp_localize_script( 'cater_waiter__online_orders', 'cw__config', Load::config( 'vue.php' ) );

        // DOM node to load vue component
        echo "<div id='cater_waiter__react_base'></div>";
    }
}