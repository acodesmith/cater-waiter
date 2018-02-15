<?php


namespace CaterWaiter\Admin;


class Log
{
	public function __construct() {
		add_action( 'wp_ajax_log_error', [ $this, 'error' ] );
		add_action( 'wp_ajax_log_error', [ $this, 'error' ] );
	}

	public static function error()
	{
		error_log( "Frontend JS Error:" . (string) $_REQUEST['error'] );
	}
}
