/*
 * action values
 */

export const VIEW_STEP_ONE                  = 'step_one'
export const VIEW_STEP_TWO_PICKUP           = 'step_two_pickup'
export const VIEW_STEP_TWO_DELIVERY         = 'step_two_delivery'
export const VIEW_STEP_THREE_PICKUP        = 'step_three_pickup'

/*
 * action types
 */

export const SET_CURRENT_SCREEN         = 'SET_CURRENT_SCREEN'
export const BACK_TO_PREVIOUS_SCREEN    = 'BACK_TO_PREVIOUS_SCREEN'

/*
 * action creators
 */

export function setCurrentScreen(text) {
    return { type: SET_CURRENT_SCREEN, text }
}

export function backToPreviousScreen()
{
    return { type: BACK_TO_PREVIOUS_SCREEN }
}