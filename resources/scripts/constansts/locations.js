/*
 * action values
 */

// export const REQUEST_LOADING_LOCATIONS = 'request_loading_locations'

/*
 * action types
 */

export const SET_LOCATIONS = 'SET_LOCATIONS'

/*
 * action creators
 */

export const setLocations = locations => {
    return { type: SET_LOCATIONS, locations: locations }
}

export const clearLocations = () => {
    return { type: SET_LOCATIONS, locations: false }
}