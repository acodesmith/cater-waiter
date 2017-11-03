<?php


namespace CaterWaiter\Admin;


class Locations
{
    const FILTER_LOCATIONS = 'cw_filter_locations';

    public static function all()
    {
        return apply_filters( self::FILTER_LOCATIONS, [] );
    }
}