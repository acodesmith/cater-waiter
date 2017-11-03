<?php


namespace CaterWaiter\API;


class Bootstrap
{
    const ENDPOINT_NAMESPACE  = 'cater-waiter/v1';

    public function __construct()
    {
        new Locations();
    }
}