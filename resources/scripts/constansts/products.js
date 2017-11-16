/*
 * action values
 */

export const SET_PRODUCTS               = 'SET_PRODUCTS'

/*
 * action types
 */


/*
 * action creators
 */

export function setProducts(data) {
    return { type: SET_PRODUCTS, data: data }
}