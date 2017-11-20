/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import createStore from '../configs/store'
import { LOCAL_STORAGE_KEY } from '../constansts/local_storage'
import { storeLocal, retrieveWithout, retrieve } from '../utilities/local_storage'
import App from './app'

/**
 * Retrieve the locally stored data to rehydrate the redux application.
 * Only use part of the locally stored data in case labels or settings
 * have changed.
 *
 * @type {*}
 */
const locallyStoredData = Object.assign({}, cw__config, retrieveWithout( LOCAL_STORAGE_KEY, {
    'labels': null,
    'settings': null,
    'data': null
}))
/*@todo fix nested object cleaning, retrieveWithout( LOCAL_STORAGE_KEY, {
    'labels': null,
    'settings': null,
    'data': {
        'products' : null,
        'grouped_products': null,
        'catering_categories': null
    }
} ))*/

const store = createStore( locallyStoredData )

/**
 * Subscribe to redux changes then write
 * state to the localStorage
 */
store.subscribe(() => {
    storeLocal( LOCAL_STORAGE_KEY, store.getState() )
})

/**
 * Run the main application.
 */
const runApp = function()
{
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('cater_waiter__react_base')
    )
}

export default runApp