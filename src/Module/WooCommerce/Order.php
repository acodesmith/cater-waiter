<?php


namespace CaterWaiter\Module\WooCommerce;


class Order {

	public function __construct() {

		add_action( 'woocommerce_new_order', [ $this, 'save_order_info_from_session' ] );
		add_action( 'woocommerce_admin_order_data_after_shipping_address', [ $this, 'order_info_admin' ] );
		add_action( 'woocommerce_order_details_after_order_table', [ $this, 'order_info_front_end' ] );
	}

	/**
	 * Pull order info from a json object stored in the WooCommerce Session
	 * Save all the info as single post_meta entries.
	 *
	 * @param $order_id
	 */
	public function save_order_info_from_session( $order_id ) {

		$order_info = \WC()->session->get( \CaterWaiter\Admin\Order::ORDER_INFO );

		if ( ! empty( $order_info ) ) {

			$order_info = (array) json_decode( $order_info );

			// Set Order Type
			add_post_meta( $order_id, 'order_type', $order_info['order_type'] );

			// Set Order Location ID
			if ( ! empty( $order_info['order_location'] ) ) {
				add_post_meta( $order_id, 'order_location_id', $order_info['order_location']->id );
			}

			// Set Order Time
			if ( ! empty( $order_info['order_pickup_time'] ) ) {

				$order_date = $order_info['order_pickup_time']->order_date . " " . $order_info['order_pickup_time']->order_time;

				add_post_meta( $order_id, 'order_pickup_time', $order_date );
			}

			// Set Order Deliver Address
			if ( ! empty( $order_info['order_delivery_address'] ) ) {

				$order_info['order_delivery_address'] = (array) $order_info['order_delivery_address'];
				$order_delivery_address_raw           = $order_info['order_delivery_address'];

				unset( $order_info['order_delivery_address']['delivery_within_range'] );

				if ( ! empty( $order_info['order_delivery_address']['delivery_address_line_two'] ) ) {
					$order_info['order_delivery_address']['delivery_address_line_one'] .= ' ' . $order_info['order_delivery_address']['delivery_address_line_two'];
				}


				$order_info['order_delivery_address']['delivery_address_line_one'] .= ',';
				$order_delivery_address                                            = implode( ' ',
					$order_info['order_delivery_address'] );

				//Check for a blank delivery address which only contains a comma
				if( strlen($order_delivery_address) > 4 ) {
					add_post_meta( $order_id, 'order_delivery_address', $order_delivery_address );
					add_post_meta( $order_id, 'order_delivery_address_json', json_encode( $order_delivery_address_raw ) );
				}
			}
		}
	}

	/**
	 * Display the Order Info in the admin on the order review page.
	 *
	 * @param $order
	 */
	public function order_info_admin( $order ) {

		list(
			$order_type,
			$order_location,
			$order_pickup_time,
			$order_delivery_address,
			) = self::get_order_info( $order->get_id() );

		if ( ! empty( $order_type ) ) {
			echo "<h3>Order Type</h3>" . ucwords( $order_type );
		}

		if ( ! empty( $order_pickup_time ) ) {
			echo "<h3>Order Time</h3>$order_pickup_time";
		}

		if ( ! empty( $order_delivery_address ) && strlen($order_delivery_address) > 4 ) {
			echo "<h3>Order Delivery Address</h3>$order_delivery_address";
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
	 * Display the Order Info on the order complete page.
	 *
	 * @param $order
	 */
	public function order_info_front_end( $order ) {


		list(
			$order_type,
			$order_location,
			$order_pickup_time,
			$order_delivery_address,
			) = self::get_order_info( $order->get_id() );

		echo "<div class='cw__order_info'>";

		if ( ! empty( $order_type ) ) {
			$label = __( 'Order Type', 'cater_waiter' );
			echo "<h3>$label</h3>" . ucwords( $order_type );
		}

		if ( ! empty( $order_pickup_time ) ) {
			$label = __( 'Order Time', 'cater_waiter' );
			echo "<h3>$label</h3>$order_pickup_time";
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

	/**
	 * @param integer|string $order_id
	 *
	 * @return array [ $order_type, $order_location, $order_pickup_time, $order_delivery_address, ]
	 */
	public static function get_order_info( $order_id ) {

		return [
			get_post_meta( $order_id, 'order_type', true ),
			get_post_meta( $order_id, 'order_location_id', true ),
			get_post_meta( $order_id, 'order_pickup_time', true ),
			get_post_meta( $order_id, 'order_delivery_address', true ),
		];
	}
}