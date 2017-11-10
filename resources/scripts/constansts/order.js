/*
 * action values
 */

export const SET_ORDER_TYPE             = 'SET_ORDER_TYPE'

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