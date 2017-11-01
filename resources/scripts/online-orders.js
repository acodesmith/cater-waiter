/*global jQuery*/
/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import App from './online-orders/index.jsx'

jQuery(function(){

    let cw_water_count = 0;

    let cw__config_watcher = setInterval( function() {

        // The config is loaded via wp_localized_script.
        if( typeof cw__config !== 'undefined' ) {

            render(
                <App/>,
                document.getElementById('cater_waiter__react_base')
            );

            clearInterval( cw__config_watcher );
        }

        cw_water_count++;

        // In case something goes wrong, kill the config watcher
        if( cw_water_count > 100 )
            clearInterval( cw__config_watcher );

    }, 300 );
});