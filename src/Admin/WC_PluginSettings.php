<?php


namespace CaterWaiter\Admin;

/**
 * Class WC_PluginSettings
 * @package CaterWaiter\Admin
 */
class WC_PluginSettings {
	const FILTER_SETTINGS = 'wc_settings_tab_cater_waiter_settings';

	/**
	 * WC_PluginSettings constructor.
	 */
	public function __construct() {
		add_filter( 'woocommerce_settings_tabs_array', [ $this, 'add_section' ], 100, 1 );
		add_filter( 'woocommerce_settings_tabs_wc_cater_waiter', [ $this, 'settings' ] );
		add_action( 'woocommerce_update_options_wc_cater_waiter', [ $this, 'update_settings' ] );
	}

	/**
	 * Add the Cater Waiter tab to the WooCommerce settings page.
	 *
	 * @param array $sections
	 *
	 * @return array
	 */
	public function add_section( $sections ) {
		$sections['wc_cater_waiter'] = __( 'Catering', 'cater_waiter' );

		return $sections;
	}

	/**
	 * Add settings to the Cater Waiter custome settings page.
	 *
	 * @uses woocommerce_admin_fields();
	 * @uses self::get_settings();
	 */
	public function settings() {
		woocommerce_admin_fields( self::get_settings() );
	}

	/**
	 * Save the Cater Waiter custom settings.
	 *
	 * @uses woocommerce_update_options();
	 * @uses self::get_settings();
	 */
	public function update_settings() {
		woocommerce_update_options( self::get_settings() );
	}

	/**
	 * Array of settings based on the woocommerce_admin_fields function requirements.
	 *
	 * @return mixed|void
	 */
	public static function get_settings() {
		$settings = array(
			'section_online_ordering_settings' => array(
				'name' => __( 'Cater Waiter Online Ordering Settings', 'cater_waiter' ),
				'type' => 'title',
				'desc' => '',
				'id'   => 'wc_settings_cater_waiter_section_title'
			),
			'cater_name'                       => array(
				'name' => __( 'Catering Service Name', 'cater_waiter' ),
				'type' => 'text',
				'desc' => __( 'name displayed in the online ordering process.', 'cater_waiter' ),
				'id'   => 'wc_settings_cater_waiter_cater_name',
			),
			'delivery_minimum'                 => array(
				'name'              => __( 'Delivery Minimum', 'cater_waiter' ),
				'type'              => 'number',
				'desc'              => __( 'Minimum cart total to purchase delivery.', 'cater_waiter' ),
				'id'                => 'wc_settings_cater_waiter_delivery_minimum',
				'custom_attributes' => [
					'min'  => 1,
					'step' => '0.01'
				]
			),
			'delivery_max_range'               => array(
				'name'              => __( 'Delivery Max Range', 'cater_waiter' ),
				'type'              => 'number',
				'desc'              => __( 'Maximum delivery range in miles.', 'cater_waiter' ),
				'id'                => 'wc_settings_cater_waiter_delivery_max_range',
				'custom_attributes' => [
					'min'  => 1,
					'step' => '1'
				]
			),
			'hours_in_advance'                 => array(
				'name'              => __( 'Hours In Advance', 'cater_waiter' ),
				'type'              => 'number',
				'desc'              => __( 'Minimum number of hours an order can be placed. For example 24 hours for the next day.',
					'cater_waiter' ),
				'id'                => 'wc_settings_cater_waiter_hours_in_advance',
				'custom_attributes' => [
					'min'  => 0,
					'step' => '0.01'
				]
			),
//            'description' => array(
//                'name' => __( 'Description', 'cater_waiter' ),
//                'type' => 'textarea',
//                'desc' => __( 'This is a paragraph describing the setting. Lorem ipsum yadda yadda yadda. Lorem ipsum yadda yadda yadda. Lorem ipsum yadda yadda yadda. Lorem ipsum yadda yadda yadda.', 'cater_waiter' ),
//                'id'   => 'wc_settings_tab_demo_description'
//            ),
			'google_maps_api'                  => array(
				'name' => __( 'Google Maps API Key', 'cater_waiter' ),
				'type' => 'password',
				'desc' => __( 'Need to build lat/long values for radius based searching.', 'cater_waiter' ),
				'id'   => 'wc_settings_cater_waiter_google_maps_api_key',
			),
			'section_end'                      => array(
				'type' => 'sectionend',
				'id'   => 'wc_settings_cater_waiter_section_end'
			),
		);

		return apply_filters( self::FILTER_SETTINGS, $settings );
	}
}