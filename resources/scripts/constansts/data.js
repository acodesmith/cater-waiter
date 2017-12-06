
/*
 * action values
 */

export const LOADING_TOGGLE             = 'LOADING_CART_TOGGLE'
export const MODAL_LOADING_TOGGLE       = 'MODAL_LOADING_CART_TOGGLE'

/*
 * action creators
 */

export function loadingToggle(message = null) {
    return { type: LOADING_TOGGLE, data: message }
}

export function modalLoadingToggle(message = null) {
    return { type: MODAL_LOADING_TOGGLE, data: message }
}