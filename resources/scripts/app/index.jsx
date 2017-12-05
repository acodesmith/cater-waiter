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
let locallyStoredData = Object.assign({}, cw__config, retrieve( LOCAL_STORAGE_KEY ) )

// Always pull most recent labels and cart data
locallyStoredData.labels = cw__config.labels
locallyStoredData.order.order_cart = cw__config.order.order_cart

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