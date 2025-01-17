<?php


namespace CaterWaiter\Module\WooCommerce;


use CaterWaiter\Admin\Order;

class Checkout {

	public function __construct() {

		add_action( 'woocommerce_check_cart_items', [ $this, 'wc_minimum_order_amount' ] );
	}

	/**
	 * Display error message on cart page and checkout page if minimum order total is not met.
	 */
	public function wc_minimum_order_amount() {

		// Pull minimum from the WooCommerce Cater Waiter Settings
		$minimum = (float) \WC_Admin_Settings::get_option( 'wc_settings_cater_waiter_delivery_minimum' );
		$minimum = empty( $minimum ) ? 0 : $minimum;
		$order_data = ! empty( WC()->session ) ? (array) json_decode( \WC()->session->get( Order::ORDER_INFO ) ) : [];
		$order_type = ! empty( $order_data['order_type'] ) ? $order_data['order_type'] : null;

		if ( \WC()->cart->total < $minimum && $order_type === Order::TYPE_DELIVERY ) {

			if( is_cart() ) {

				\wc_print_notice(
					sprintf( 'You must have an order with a minimum of %s to place your order, your current order total is %s.' ,
						wc_price( $minimum ),
						wc_price( WC()->cart->total )
					), 'error'
				);

			} else {

				\wc_add_notice(
					sprintf( 'You must have an order with a minimum of %s to place your order, your current order total is %s.' ,
						wc_price( $minimum ),
						wc_price( WC()->cart->total )
					), 'error'
				);

			}
		}

	}
}