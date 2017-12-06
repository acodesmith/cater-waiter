/*global jQuery*/
/*global cw__config*/

import runApp from './app/index'
import '../styles/front_end.scss'

jQuery(function(){

    let cw_water_count = 0;

    let cw__config_watcher = setInterval( function() {

        // The config is loaded via wp_localized_script.
        if( typeof cw__config !== 'undefined' ) {

            clearInterval( cw__config_watcher );
            runApp();
        }

        cw_water_count++;

        // In case something goes wrong, kill the config watcher
        if( cw_water_count > 100 )
            clearInterval( cw__config_watcher );

    }, 300 );
});