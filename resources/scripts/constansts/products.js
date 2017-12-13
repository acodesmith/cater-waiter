/*
 * action values
 */

export const MODE_ADD  = 'MODE_ADD'
export const MODE_EDIT = 'MODE_EDIT'

/*
 * action types
 */
export const SET_PRODUCTS               = 'SET_PRODUCTS'

/*
 * action creators
 */

export function setProducts(data) {
    return { type: SET_PRODUCTS, data: data }
}