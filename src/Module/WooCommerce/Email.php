<?php


namespace CaterWaiter\Module\WooCommerce;


class Email {

	public function __construct() {
		add_action( 'woocommerce_email_customer_details', [ $this, 'customer_order_info' ], 1000, 1 );
	}

	/**
	 * Render data information in html emails
	 *
	 * @param $order
	 */
	public function customer_order_info($order) {

		list(
			$order_type,
			$order_location,
			$order_pickup_time,
			$order_delivery_address,
		) = Order::get_order_info( $order->get_id() );

		echo "<div class='cw__order_info cw__email_order_info'>";

		if ( ! empty( $order_type ) ) {
			$label = __( 'Order Type', 'cater_waiter' );
			echo "<h3>$label</h3>" . ucwords( $order_type );
		}

		if ( ! empty( $order_pickup_time ) ) {
			$label = __( 'Order Time', 'cater_waiter' );
			echo "<h3>$label</h3>" . date( 'Y-m-d g:i A', strtotime( $order_pickup_time ) );
		}

		if ( ! empty( $order_delivery_address ) && strlen($order_delivery_address) > 4 ) {
			$label = __( 'Order Delivery Address', 'cater_waiter' );
			echo "<h3>$label</h3>$order_delivery_address";
		}

		if ( ! empty( $order_location ) ) {
			if ( $order_location = get_post( $order_location ) ) {

				$label               = __( 'Order Location', 'cater_waiter' );
				$order_location_meta = get_post_meta( $order_location->ID );

				echo "<h3>$label</h3>";
				echo "<strong>$order_location->post_title</strong><br />";
				echo $order_location_meta['wf_address_one'][0] . "<br />";
				echo $order_location_meta['wf_city'][0] . ", " . $order_location_meta['wf_state'][0] . " " . $order_location_meta['wf_zip'][0];
			}

		}

		echo "</div>";
	}
}