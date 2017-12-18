import {
    jumpToView as jumpToViewHistory
} from '../utilities'

/*
 * action values
 */

export const VIEW_SELECT_ORDER_TYPE         = 'select_order_type'
export const VIEW_DELIVERY_ADDRESS          = 'delivery_address'
export const VIEW_SELECT_LOCATION           = 'select_location'
export const VIEW_SCHEDULE_ORDER            = 'schedule_order'
export const VIEW_CART                      = 'cart'
export const VIEW_CONFIRM                   = 'confirm'
export const VIEW_CHECKOUT                  = 'checkout'
export const VIEW_COMPLETE                  = 'complete'

/*
 * action types
 */

export const SET_CURRENT_SCREEN         = 'SET_CURRENT_SCREEN'
export const BACK_TO_PREVIOUS_SCREEN    = 'BACK_TO_PREVIOUS_SCREEN'
export const JUMP_TO_VIEW               = 'JUMP_TO_VIEW'

/*
 * action creators
 */

export function setCurrentScreen(text) {
    return { type: SET_CURRENT_SCREEN, text: text }
}

export function backToPreviousScreen()
{
    return { type: BACK_TO_PREVIOUS_SCREEN }
}

export function jumpToView(view, history) {
    return {
        type: JUMP_TO_VIEW,
        data: {
            view: view,
            history: jumpToViewHistory( view, history )
        }
    }
}
