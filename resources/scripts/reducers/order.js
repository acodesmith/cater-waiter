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
            return {
                ...state,
                order_type: action.text
            }
        case SET_LOCATION:
            return {
                ...state,
                order_location: action.location,
            }
        case SET_DELIVERY_ADDRESS:

            const { location, address } = action.data

            return {
                ...state,
                order_location: location,
                order_delivery_address: Object.assign(
                    {},
                    state.order_delivery_address,
                    address
                ),
            }
        case SET_ORDER_TIME:
            return {
                ...state,
                order_pickup_time: action.data,
            }
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                order_cart: action.data,
            }
        case OUT_OF_RANGE_DELIVERY:
            return {
                ...state,
                order_delivery_address: {
                    delivery_within_range: false
                }
            }
        case SET_CART:
            return {
                ...state,
                order_cart: action.data
            }
    }

    return Object.assign({}, state)
}

export default order