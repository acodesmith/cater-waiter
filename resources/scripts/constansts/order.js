import { setCurrentScreen } from './view'

/*
 * action values
 */

export const SET_ORDER_TYPE             = 'SET_ORDER_TYPE'
export const SET_DELIVERY_ADDRESS       = 'SET_DELIVERY_ADDRESS'

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

export function setDeliveryAddress(data) {
    return { type: SET_DELIVERY_ADDRESS, data: data }
}