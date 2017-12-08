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

                            let locations = extractDataFromResults( data.results )

                            console.log("locations",locations);
                            
                            if( ! locations.length ) {

                                return resolve({
                                    valid: false,
                                    location: locations
                                })
                            }

                            let sorted_locations = _.sortBy( locations, [location => parseFloat( location.distance_num )] )

                            return resolve({
                                valid: parseFloat( sorted_locations[0].distance_num ) <= max,
                                location: sorted_locations[0]
                            })
                        }
                    )
                })
}