import {
    REQUEST_LOADING_LOCATIONS,
    VIEW_SCHEDULE_ORDER,
    setCurrentScreen,
    setLoadingState,
    clearLoadingState,
    clearLocations,
    setLocations,
    setLocation,
    clearNotification,
    loadingToggle,
    setError
} from '../constansts/'
import {
    extractDataFromResults,
    getLocationsFromZip,
    getLocationFromId,
    setTaxRateBasedOnLocation
} from '../utilities/'

/**
 * Load all the locations based off the zip code.
 *
 * @param zip_code
 * @returns {function(*)}
 */
export const loadLocations = ( zip_code, error_message ) => {

    return dispatch => {

        dispatch(setLoadingState(REQUEST_LOADING_LOCATIONS))
        dispatch(clearLocations())
        dispatch(clearNotification('location_error'))

        return getLocationsFromZip(zip_code)
            .then(data => {

                if( data.results )
                    return dispatch(setLocations( extractDataFromResults(data.results) ))

                return dispatch(setError(error_message, 'location_error'))

            }, error => console.error(error))
            .then(() => dispatch(clearLoadingState()))
    }
}

/**
 *
 * @param location
 * @returns {*}
 */
export const selectLocation = (location, loading_message) => {

    const { id } = location

    if (!id)
        return () => {
            console.error('Missing location id')
        }

    return dispatch => {

        dispatch( loadingToggle( loading_message ) )

        /**
         * Extract the post meta data from the post object.
         * Assign the post data to the location object.
         */
        return getLocationFromId(id)
            .then(post => {

                const {
                    post_meta = {}
                } = post

                const {
                    delivery_time_end,
                    delivery_time_start,
                    pickup_time_end,
                    pickup_time_start
                } = post_meta

                location.post = post
                location.delivery_time_end = delivery_time_end
                location.delivery_time_start = delivery_time_start
                location.pickup_time_end = pickup_time_end
                location.pickup_time_start = pickup_time_start

                return dispatch(setLocation(location))
            })
            .then(() => setTaxRateBasedOnLocation( id ))
            .then(() => dispatch( loadingToggle() ))
            .then(() => dispatch(setCurrentScreen(VIEW_SCHEDULE_ORDER)))
    }
}