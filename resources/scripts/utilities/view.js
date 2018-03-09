import {
    SET_CURRENT_SCREEN,
    BACK_TO_PREVIOUS_SCREEN,
    JUMP_TO_VIEW,
    LOCAL_STORAGE_KEY,
    backToPreviousScreen
} from '../constansts'
import { clear } from './local_storage'

/**
 * Change the react apps view by trigging a popstate event with the pushState function.
 *
 * @param view
 */
const changeView = view => {
    if( typeof window.history.pushState === 'function' ) {
        window.history.pushState({ cater_waiter: true, view: view }, '', `${window.location.pathname}?view=${view}`)
    }
}

/**
 * Convert the window.location.search string into an object
 *
 * @returns {{}}
 */
const searchToObject = () => {
    let pairs = window.location.search.substring(1).split("&"),
        obj = {},
        pair,
        i;

    for ( i in pairs ) {
        if ( pairs[i] === "" ) continue;

        pair = pairs[i].split("=");
        obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
    }

    return obj;
}

/**
 * Build a new history array based on the new view
 *
 * @param view
 * @param history
 */
export const jumpToView = (view, history) => {
    return history.slice( history.indexOf( view ), history.indexOf( view ) )
}

/**
 * Redux middleware function for updating the window url based on view navigation.
 *
 * @param store
 */
export const windowHistoryMiddleware = store => {

    watchForBrowserBackButton(store)

    return next => action => {

        const state = store.getState()

        switch(action.type) {
            case SET_CURRENT_SCREEN:
                changeView( action.text )
                break;
            case BACK_TO_PREVIOUS_SCREEN:
                const backView = state.view.history[ state.view.history.length - 1 ]
                if( backView )
                    changeView( backView )
                break;
            case JUMP_TO_VIEW:
                changeView( action.data.view )
                break;
        }

        next(action);
    }
}

/**
 * Dispatch a backToPreviewScreen action when user hits browers's back button.
 */
export const watchForBrowserBackButton = store => {
    window.addEventListener('popstate', function(event) {

        const { cater_waiter } = event.state

        if( cater_waiter ) {
            const params = searchToObject()
                , { view } = params

            if(view) {
                store.dispatch(backToPreviousScreen())
            }
        }
    }, false)
}

/**
 * Clear the browser's local storage and refresh to the root domain.
 */
export const clearData = () => {
    clear( LOCAL_STORAGE_KEY )
    window.location = window.location.pathname;
}