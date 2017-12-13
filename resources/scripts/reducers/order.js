import {
    ADD_ITEM_TO_CART,
    OUT_OF_RANGE_DELIVERY,
    SET_DELIVERY_ADDRESS,
    SET_ORDER_TIME,
    SET_ORDER_TYPE,
    SET_CART
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

            const { location, address } = action.data

            return Object.assign( {}, state, {
                order_location: location,
                order_delivery_address: Object.assign(
                    {},
                    state.order_delivery_address,
                    address
                ),
            } )
            break;
        case SET_ORDER_TIME:
            return Object.assign( {}, state, {
                order_pickup_time: action.data,
            } )
            break;
        case ADD_ITEM_TO_CART:
            return Object.assign( {}, state, {
                order_cart: action.data,
            } )
            break;
        case OUT_OF_RANGE_DELIVERY:
            return Object.assign( {}, state, {
                order_delivery_address: {
                    delivery_within_range: false
                }
            })
            break;
        case SET_CART:
            return Object.assign({}, state, {
                order_cart: action.data
            })
            break;
    }

    return Object.assign({}, state)
}

export default order