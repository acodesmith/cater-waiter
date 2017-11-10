import {
    SET_LOCATIONS,
    SET_LOCATION
} from '../constansts/locations'
import {
    SET_CURRENT_SCREEN,

} from '../constansts/view'

const data = (state, action) => {

    switch(action.type) {
        case SET_LOCATIONS:
            return Object.assign( {}, state, {
                locations: action.locations,
            })
            break;
        case SET_LOCATION:
            return Object.assign( {}, state, {
                location: action.location,
            })
            break;
        case SET_CURRENT_SCREEN:
            if( typeof action.order_type !== 'undefined' )
                return Object.assign( {}, state, {
                    order_type: action.order_type,
                })
            break;
    }

    return Object.assign({}, state)
}

export default data