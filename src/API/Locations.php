<?php


namespace CaterWaiter\API;

/**
 * Class Locations
 * @package CaterWaiter\API
 */
class Locations
{
    /**
     * Locations constructor.
     */
    public function __construct()
    {
        add_action( 'rest_api_init', function () {
            register_rest_route(Bootstrap::ENDPOINT_NAMESPACE, '/locations/', [
                'methods' => 'GET',
                'callback' => [ $this, 'index' ],
            ]);
        });

        add_action( 'rest_api_init', function () {
            register_rest_route(Bootstrap::ENDPOINT_NAMESPACE, '/simple_locator/', [
                'methods' => 'GET',
                'callback' => [ $this, 'simple_locator' ],
            ]);
        });

        add_action( 'rest_api_init', function () {
            register_rest_route(Bootstrap::ENDPOINT_NAMESPACE, '/lat_long/(?P<zip>[a-z0-9 .\-]+)', [
                'methods' => 'GET',
                'callback' => [ $this, 'lat_long' ],
                'args' => array(
                    'zip' => array(
                        'validate_callback' => function($param, $request, $key) {
                            return is_numeric( $param );
                        }
                    ),
                ),
            ]);
        });
    }

    /**
     * @return array
     */
    public function index()
    {
        return \CaterWaiter\Admin\Locations::all();
    }

    /**
     * @return string
     */
    public function simple_locator()
    {
        return wp_create_nonce( 'locatornonce' );
    }

    /**
     * @param \WP_REST_Request $request
     * @return array|\WP_Error
     */
    public function lat_long( \WP_REST_Request $request )
    {
        $api_base   = 'https://maps.googleapis.com/maps/api/geocode/json';
        $api_key    = \WC_Admin_Settings::get_option( 'wc_settings_cater_waiter_google_maps_api_key' );
        $zip        = $request->get_param('zip');

        if ( ! empty( $api_key ) && ! empty( $zip ) ) {


            // Build the request and send with wp_remote_get
            $api_request_string = "{$api_base}?address={$zip}&key={$api_key}";
            $api_request = wp_remote_get($api_request_string);

            // Get the response
            $api_response = json_decode(wp_remote_retrieve_body($api_request));

            // If we have the lat & lng from Google Maps
            if (
                ! empty( $api_response->results )
                && ! empty( $api_response->results[0]->geometry )
                && $api_response->results[0]->geometry->location
            ) {

                $lat = $api_response->results[0]->geometry->location->lat;
                $lng = $api_response->results[0]->geometry->location->lng;

                if ($lat && $lng) {
                    return [ $lat, $lng ];
                }
            }
        }

        return new \WP_Error( '406', 'Invalid zip code', array( 'status' => 406 ) );
    }
}