
/*
 * action values
 */

export const SET_ORDER_TYPE             = 'SET_ORDER_TYPE'
export const SET_DELIVERY_ADDRESS       = 'SET_DELIVERY_ADDRESS'
export const SET_ORDER_TIME             = 'SET_ORDER_TIME'
export const ADD_ITEM_TO_CART           = 'ADD_ITEM_TO_CART'
export const OUT_OF_RANGE_DELIVERY      = 'OUT_OF_RANGE_DELIVERY'
export const SET_CART                   = 'SET_CART'

/*
 * action types
 */

export const ORDER_TYPE_DELIVERY        = 'delivery'
export const ORDER_TYPE_PICKUP          = 'pickup'

/*
 * action creators
 */

export function setOrderType(text) {
    return { type: SET_ORDER_TYPE, text: text }
}

export function setOrderTime(text) {
    return { type: SET_ORDER_TIME, data: text }
}

export function setDeliveryAddress(address, location) {
    return { type: SET_DELIVERY_ADDRESS, data: {
        address: address,
        location: location,
    } }
}

export function addItemToCart(data) {
    return { type: ADD_ITEM_TO_CART, data: data }
}

export function outOfRangeDelivery() {
    return { type: OUT_OF_RANGE_DELIVERY }
}

export function setCart(cart) {
    return { type: SET_CART, data: cart }
}