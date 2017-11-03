/*
 * action values
 */

export const VIEW_STEP_ONE          = 'step_one'
export const VIEW_STEP_TWO_PICK_UP  = 'step_two_pick_up'
export const VIEW_STEP_TWO_DELIVERY = 'step_two_delivery'

/*
 * action types
 */

export const SET_CURRENT_SCREEN = 'SET_CURRENT_SCREEN'

/*
 * action creators
 */

export function setCurrentScreen(text) {
    return { type: SET_CURRENT_SCREEN, text }
}