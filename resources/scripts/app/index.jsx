/*global cw__config*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import * as reducers from '../reducers/index'
import Steps from './containers/steps'

const activeCreateStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()(createStore)
    : createStore

const store = activeCreateStore(
    combineReducers(
        Object.assign({}, { ...reducers, }, { form: formReducer } )
    ),
    cw__config,
    applyMiddleware(thunk)
)

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