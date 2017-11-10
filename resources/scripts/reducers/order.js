import {
    SET_ORDER_TYPE
} from '../constansts/order'
import {
    SET_LOCATION
} from '../constansts/locations'

const order = (state, action) => {

    switch(action.type) {
        case SET_ORDER_TYPE:
            return Object.assign( {}, state, {
                order_type: action.text
            } )
            break;
        case SET_LOCATION:
            return Object.assign( {}, state, {
                order_location: action.location,
            } )
            break;
    }

    return Object.assign({}, state)
}

export default order