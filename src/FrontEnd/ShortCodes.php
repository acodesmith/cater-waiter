<?php


namespace CaterWaiter\FrontEnd;


class ShortCodes
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
        wp_enqueue_script( 'cater_water__online_orders', CATER_WAITER_PLUGIN_URL . 'dist/online-orders.js', null, '0.0.1', true );
        //$attrs
        echo "<div id='cater_waiter__online_orders'></div>";
    }
}