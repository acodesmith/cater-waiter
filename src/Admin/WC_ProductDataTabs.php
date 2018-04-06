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
	    $product_grouped_allow_single = isset( $_POST['_product_grouped_allow_single'] ) ? 'yes' : 'no';
        update_post_meta( $post_id, '_product_grouped_allow_single', $product_grouped_allow_single );

	    $product_grouped_by_amount = isset( $_POST['_product_grouped_by_amount'] ) ? $_POST['_product_grouped_by_amount'] : 0;
        update_post_meta( $post_id, '_product_grouped_by_amount', $product_grouped_by_amount );

        if( isset( $_POST['_product_custom_price_label'] ) ) {
            update_post_meta( $post_id, '_product_custom_price_label', $_POST['_product_custom_price_label'] );
        }else{
        	delete_post_meta( $post_id, '_product_custom_price_label' );
        }

        if( ! empty( $_POST['_minimum_amount'] ) ) {
            update_post_meta( $post_id, '_minimum_amount', $_POST['_minimum_amount'] );
        }else{
        	delete_post_meta( $post_id, '_minimum_amount' );
        }

        if( ! empty( $_POST['_product_display_product_short_description'] ) ) {
            update_post_meta( $post_id, '_product_display_product_short_description', $_POST['_product_display_product_short_description'] );
        }else{
        	delete_post_meta( $post_id, '_product_display_product_short_description' );
        }

    }
}