/*global jQuery*/
/*global cw__config*/

import runApp from './app/index'
import '../styles/front_end.scss'

jQuery(function(){

    let cw__watcher_count = 0;

    let cw__config_watcher = setInterval( function() {

        // The config is loaded via wp_localized_script.
        if( typeof cw__config !== 'undefined' ) {

            clearInterval( cw__config_watcher );
            createModalDiv();
            runApp();
        }

        cw__watcher_count++;

        // In case something goes wrong, kill the config watcher
        if( cw__watcher_count > 100 )
            clearInterval( cw__config_watcher );

    }, 300 );
});

// Used with ReactDOM.portal to render modal in better DOM location
const createModalDiv =  () => {
    jQuery(document.createElement('div')).attr({
        id: 'cw__modal_wrapper'
    }).appendTo(jQuery('body'));
}