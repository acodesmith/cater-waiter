
/*
 * action values
 */

export const LOADING_TOGGLE             = 'LOADING_CART_TOGGLE'
export const MODAL_LOADING_TOGGLE       = 'MODAL_LOADING_CART_TOGGLE'
export const SHOW_ITEM_OPTIONS          = 'SHOW_ITEM_OPTIONS'
export const HIDE_ITEM_OPTIONS          = 'HIDE_ITEM_OPTIONS'
export const SHOW_GROUPED_ITEMS_OPTIONS = 'SHOW_GROUPED_ITEMS_OPTIONS'
export const HIDE_GROUPED_ITEMS_OPTIONS = 'HIDE_GROUPED_ITEMS_OPTIONS'

/*
 * action creators
 */

export function loadingToggle(message = null) {
    return { type: LOADING_TOGGLE, data: message }
}

export function modalLoadingToggle(message = null) {
    return { type: MODAL_LOADING_TOGGLE, data: message }
}

export function showItemOptions(data) {
    return { type: SHOW_ITEM_OPTIONS, data: data }
}

export function hideItemOptions() {
    return { type: SHOW_ITEM_OPTIONS }
}

export function showGroupedItemsOptions(data) {
    return { type: SHOW_GROUPED_ITEMS_OPTIONS, data: data }
}

export function hideGroupedItemsOptions() {
    return { type: HIDE_GROUPED_ITEMS_OPTIONS }
}