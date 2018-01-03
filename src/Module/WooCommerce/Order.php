<?php


namespace CaterWaiter\Module\WooCommerce;


class Order {

	public function __construct() {

		add_action( 'woocommerce_new_order', [ $this, 'save_order_info_from_session' ] );
		add_action( 'woocommerce_admin_order_data_after_shipping_address', [ $this, 'order_info_admin' ] );
		add_action( 'woocommerce_order_details_after_order_table', [ $this, 'order_info_front_end' ] );
	}

	public function save_order_info_from_session($order_id) {

		$order_info = \WC()->session->get( \CaterWaiter\Admin\Order::ORDER_INFO );

		if( ! empty( $order_info ) ) {

			$order_info = (array) json_decode( $order_info );

			// Set Order Type
			add_post_meta( $order_id, 'order_type', $order_info['order_type'] );

			// Set Order Location ID
			if( ! empty( $order_info['order_location'] ) )
				add_post_meta( $order_id, 'order_location_id', $order_info['order_location']->id );

			// Set Order Time
			if( ! empty( $order_info['order_pickup_time'] ) ) {

				$order_date = $order_info['order_pickup_time']->order_date . " " . $order_info['order_pickup_time']->order_time;

				add_post_meta( $order_id, 'order_pickup_time', $order_date );
			}
		}
	}

	/**
	 * @todo Delivery Address
	 * @param $order
	 */
	public function order_info_admin( $order ) {

		$order_type         = get_post_meta( $order->get_id(), 'order_type', true );
		$order_location     = get_post_meta( $order->get_id(), 'order_location_id', true );
		$order_pickup_time  = get_post_meta( $order->get_id(), 'order_pickup_time', true );

		if ( ! empty( $order_type ) ) {
			echo "<h3>Order Type</h3>" . ucwords( $order_type );
		}

		if ( ! empty( $order_pickup_time ) ) {
			echo "<h3>Order Time</h3>" . date( 'Y-m-d g:i A', strtotime( $order_pickup_time ) );
		}

		if ( ! empty( $order_location ) ) {
			if ( $order_location = get_post( $order_location ) ) {

				$order_location_meta = get_post_meta( $order_location->ID );
				$order_location_link = get_edit_post_link( $order_location->ID );

				echo "<h3>Order Location</h3>";
				echo "<a href='$order_location_link'>$order_location->post_title</a><br />";
				echo $order_location_meta['wf_address_one'][0] . "<br />";
				echo $order_location_meta['wf_city'][0] . ", " . $order_location_meta['wf_state'][0] . " " . $order_location_meta['wf_zip'][0];
			}

		}
	}

	/**
	 * @todo Delivery Address
	 * @param $order
	 */
	public function order_info_front_end($order) {

		echo "<div class='cw__order_info'>";

		$order_type         = get_post_meta( $order->get_id(), 'order_type', true );
		$order_location     = get_post_meta( $order->get_id(), 'order_location_id', true );
		$order_pickup_time  = get_post_meta( $order->get_id(), 'order_pickup_time', true );

		if ( ! empty( $order_type ) ) {
			echo "<h3>Order Type</h3>" . ucwords( $order_type );
		}

		if ( ! empty( $order_pickup_time ) ) {
			echo "<h3>Order Time</h3>" . date( 'Y-m-d g:i A', strtotime( $order_pickup_time ) );
		}

		if ( ! empty( $order_location ) ) {
			if ( $order_location = get_post( $order_location ) ) {

				$order_location_meta = get_post_meta( $order_location->ID );

				echo "<h3>Order Location</h3>";
				echo "$order_location->post_title<br />";
				echo $order_location_meta['wf_address_one'][0] . "<br />";
				echo $order_location_meta['wf_city'][0] . ", " . $order_location_meta['wf_state'][0] . " " . $order_location_meta['wf_zip'][0];
			}

		}

		echo "</div>";
	}
}