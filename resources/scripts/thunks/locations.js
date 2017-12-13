import {
    REQUEST_LOADING_LOCATIONS,
    VIEW_SCHEDULE_ORDER,
    setCurrentScreen,
    setLoadingState,
    clearLoadingState,
    clearLocations,
    setLocations,
    setLocation
} from '../constansts/'
import {
    extractDataFromResults,
    getLocationsFromZip,
    getLocationFromId
} from '../utilities/'

/**
 * Load all the locations based off the zip code.
 *
 * @param zip_code
 * @returns {function(*)}
 */
export const loadLocations = zip_code =>
{

    return dispatch => {

        dispatch( setLoadingState( REQUEST_LOADING_LOCATIONS ) )
        dispatch( clearLocations() )

        return getLocationsFromZip( zip_code )
            .then(data => {

                let locations = extractDataFromResults( data.results )

                return dispatch( setLocations( locations ) )
            }, error => console.error(error))
            .then(() => dispatch( clearLoadingState() ))
    }
}

export const selectLocation = location =>
{
    const { id } = location

    if( ! id )
        return () => {
            console.error('Missing location id')
        }

    return dispatch => {

        /**
         * Extract the post meta data from the post object.
         * Assign the post data to the location object.
         */
        return getLocationFromId( id ).then(post => {

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
            location.delivery_time_end  = delivery_time_end
            location.delivery_time_start= delivery_time_start
            location.pickup_time_end    = pickup_time_end
            location.pickup_time_start  = pickup_time_start

            dispatch( setLocation( location ) )
            dispatch( setCurrentScreen( VIEW_SCHEDULE_ORDER ) )
        })
    }
}