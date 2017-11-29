import { setCurrentScreen } from './view'

/*
 * action values
 */

export const SET_ORDER_TYPE             = 'SET_ORDER_TYPE'
export const SET_DELIVERY_ADDRESS       = 'SET_DELIVERY_ADDRESS'
export const ADD_ITEM_TO_CART           = 'ADD_ITEM_TO_CART'
export const SHOW_ITEM_OPTIONS          = 'SHOW_ITEM_OPTIONS'
export const HIDE_ITEM_OPTIONS          = 'HIDE_ITEM_OPTIONS'

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

export function addItemToCart(data) {
    return { type: ADD_ITEM_TO_CART, data: data }
}

export function showItemOptions(data) {
    return { type: SHOW_ITEM_OPTIONS, data: data }
}

export function hideItemOptions(data) {
    return { type: SHOW_ITEM_OPTIONS }
}