<?php

use CaterWaiter\Admin\WC_PluginSettings;

$woocommerce_admin_settings = WC_PluginSettings::get_settings();

/**
 * Map the Cater Waiter admin settings to an array
 *
 * 1. Filter excluded items from list, like title.
 * 2. Map the id to an array.
 * 3. Map the ids to WooCommerce get option function.
 */
return array_map( function($setting_option_id){
    return WC_Admin_Settings::get_option( $setting_option_id );
}, array_map( function($setting) {
    return $setting['id'];
}, array_filter( $woocommerce_admin_settings,
    function($setting) {
        return ! in_array( $setting['id'], [
            'wc_settings_cater_waiter_section_title',
            'wc_settings_cater_waiter_section_end'
        ] );
} ) ) );