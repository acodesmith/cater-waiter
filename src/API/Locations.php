<?php


namespace CaterWaiter\API;


class Locations
{
    public function __construct()
    {
        add_action('rest_api_init', function () {
            register_rest_route(Bootstrap::ENDPOINT_NAMESPACE, '/locations/', [
                'methods' => 'GET',
                'callback' => [ $this, 'index' ],
            ]);
        });
    }

    public function index()
    {
        return \CaterWaiter\Admin\Locations::all();
    }
}