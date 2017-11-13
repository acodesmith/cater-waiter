import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers/index'

/**
 * Combine all the top level reducers into single var
 *
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers(
    Object.assign({}, { ...reducers, }, { form: formReducer } )
)

/**
 * Create the redux store
 *
 * @type {Store<any>}
 */
export default (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware( thunk ),
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
        )
    );
}