import {
    SET_ORDER_TYPE,
    SET_DELIVERY_ADDRESS
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
        case SET_DELIVERY_ADDRESS:
            return Object.assign( {}, state, {
                order_delivery_address: Object.assign(
                    {},
                    state.order_delivery_address,
                    action.data
                ),
            } )
            break;
    }

    return Object.assign({}, state)
}

export default order