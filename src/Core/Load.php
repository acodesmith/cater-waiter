<?php


namespace CaterWaiter\Core;


class Load
{
    public static function load($file)
    {
        $full_path = CATER_WAITER_PLUGIN_PATH . "$file.php";

        return file_exists( $full_path ) ? file_get_contents( $full_path ) : null;
    }

    public static function load_resource($file)
    {
        return self::load( "resources/$file" );
    }

    public static function config($file)
    {
        $full_path = CATER_WAITER_PLUGIN_PATH . "resources/configs/$file";
        $file_info = pathinfo( $full_path );

        if( file_exists( $full_path ) )
            switch( $file_info['extension'] )
            {
                case 'json':
                    return file_get_contents( $full_path );
                default:
                    return include $full_path;
            }

        return null;
    }
}