<?php


namespace CaterWaiter\Admin;


use CaterWaiter\Core\View;

/**
 * Class WC_ProductDataTabs
 * @package CaterWaiter\Admin
 */
class WC_ProductDataTabs
{
    /**
     * Used to trigger the panel to display.
     * Native WC
     */
    const DATA_TAB_ID       = 'cater_waiter_data';

    /**
     * Used for stlying the icon of the tab.
     */
    const DATA_TAB_CLASS    = 'cater_waiter_tab';


    public function __construct()
    {
        add_filter( 'woocommerce_product_data_tabs', [ $this, 'tab' ], 99, 1 );
        add_filter( 'woocommerce_product_data_panels', [ $this, 'panel' ] );
        add_filter( 'woocommerce_process_product_meta', [ $this, 'product_meta' ], 10, 1 );
    }

    public function tab( $product_data_tabs )
    {

        $product_data_tabs['cater_waiter'] = [
            'label'     => __( 'Catering', 'cater_waiter' ),
            'target'    => self::DATA_TAB_ID,
            'class'     => [ self::DATA_TAB_CLASS ]
        ];

        return $product_data_tabs;
    }

    public function panel()
    {
        View::admin( 'admin_product_data_panel', [
            'panel_id' => self::DATA_TAB_ID
        ] );
    }

    public function product_meta($post_id)
    {
        // This is the case to save custom field data of checkbox. You have to do it as per your custom fields
        $woo_checkbox = isset( $_POST['_catered_product'] ) ? 'yes' : 'no';
        update_post_meta( $post_id, '_catered_product', $woo_checkbox );
    }
}