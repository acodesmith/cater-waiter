import {
    NOTIFICATION_TYPE_ERROR
} from '../app/components/notifications'

/*
 * action values
 */

export const SET_NOTIFICATION           = 'SET_NOTIFICATION'
export const CLEAR_NOTIFICATION         = 'CLEAR_NOTIFICATION'
export const CLEAR_ALL_NOTIFICATIONS    = 'CLEAR_ALL_NOTIFICATION'
export const LOADING_TOGGLE             = 'LOADING_CART_TOGGLE'
export const MODAL_LOADING_TOGGLE       = 'MODAL_LOADING_CART_TOGGLE'
export const SHOW_ITEM_OPTIONS          = 'SHOW_ITEM_OPTIONS'
export const HIDE_ITEM_OPTIONS          = 'HIDE_ITEM_OPTIONS'
export const SHOW_GROUPED_ITEMS_OPTIONS = 'SHOW_GROUPED_ITEMS_OPTIONS'
export const HIDE_GROUPED_ITEMS_OPTIONS = 'HIDE_GROUPED_ITEMS_OPTIONS'
export const SHOW_HELP_INFO             = 'SHOW_HELP_INFO'
export const HIDE_HELP_INFO             = 'HIDE_HELP_INFO'
/*
 * action creators
 */

export function setError(message, id) {
    return setNotification(message, NOTIFICATION_TYPE_ERROR, id)
}

export function setNotification(message, type, id) {
    return { type: SET_NOTIFICATION, data: {
        message: message,
        type: type,
        id: id
    } }
}

export function clearNotification(id) {
    return { type: CLEAR_NOTIFICATION, data: id }
}

export function clearAllNotifications() {
    return { type: CLEAR_ALL_NOTIFICATIONS }
}

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

export function showHelpInfo() {
    return { type: SHOW_HELP_INFO }
}

export function hideHelpInfo() {
    return { type: HIDE_HELP_INFO }
}