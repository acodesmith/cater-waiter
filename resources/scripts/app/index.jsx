/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import * as reducers from '../reducers/index'
import { LOCAL_STORAGE_KEY } from '../constansts/local_storage'
import { retrieveWithout, storeLocal, clear } from '../utilities/local_storage'
import Steps from './containers/steps'

//TEMP
import Button from './elements/button'

/**
 * Check for the Redux dev tools
 *
 * @type {StoreCreator}
 */
const activeCreateStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()(createStore)
    : createStore

/**
 * Retrieve the locally stored data to rehydrate the redux application.
 * Only use part of the locally stored data in case labels or settings
 * have changed.
 *
 * @type {*}
 */
const locallyStoredData = Object.assign({}, cw__config, retrieveWithout( LOCAL_STORAGE_KEY, [
    'labels',
    'settings'
] ))

/**
 * Create the redux store
 *
 * @type {Store<any>}
 */
const store = activeCreateStore(
    combineReducers(
        Object.assign({}, { ...reducers, }, { form: formReducer } )
    ),
    locallyStoredData,
    applyMiddleware(thunk)
)

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
            <Steps />
        </Provider>,
        document.getElementById('cater_waiter__react_base')
    )
}

export default runApp