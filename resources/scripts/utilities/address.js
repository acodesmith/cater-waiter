import _ from 'lodash'
import {
    getLocationsFromZip,
    extractDataFromResults
} from '../utilities'

export const validateAddressRadius = (zip, max) => {

    return getLocationsFromZip(zip)
        .then(data => {

            return new Promise(
                function (resolve) {

                    if( ! data || ! data.results )
                        return resolve({
                            valid: false,
                            location: []
                        })

                    let locations = extractDataFromResults( data.results )

                    if ( ! locations.length )
                        return resolve({
                            valid: false,
                            location: locations
                        })

                    let closest_location = _.sortBy(locations, [location => parseFloat(location.distance_num)]).shift()

                    return resolve({
                        valid: parseFloat(closest_location.distance_num) <= max,
                        location: closest_location
                    })
                }
            )
        })
}