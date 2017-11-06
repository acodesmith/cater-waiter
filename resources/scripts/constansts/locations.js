/*
 * action values
 */

// export const REQUEST_LOADING_LOCATIONS = 'request_loading_locations'

/*
 * action types
 */

export const SET_LOCATIONS = 'SET_LOCATIONS'
export const SET_LOCATION  = 'SET_LOCATION'

/*
 * action creators
 */

export const setLocations = locations => {
    return { type: SET_LOCATIONS, locations: locations }
}

export const setLocation = location => {
    return { type: SET_LOCATION, location: location }
}

export const clearLocations = () => {
    return { type: SET_LOCATIONS, locations: [] }
}