/*
 * action values
 */

export const REQUEST_LOADING_LOCATIONS = 'request_loading_locations'

/*
 * action types
 */

export const SET_LOADING_STATE = 'SET_LOADING_STATE'

/*
 * action creators
 */

export const setLoadingState = (text) => {
    return { type: SET_LOADING_STATE, text }
}

export const clearLoadingState = () => {
    return { type: SET_LOADING_STATE, text: false }
}