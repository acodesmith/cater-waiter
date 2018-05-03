import {
    syncOrderDataToSession,
    setTaxSessionRequest,
    getCart,
} from './index'
import {
    SET_CURRENT_SCREEN,
    VIEW_CART,
    setCart
} from '../constansts'

/**
 * When the app renders the cart page,
 * sync the app date to the woocommerce sync.
 *
 * @param store
 */
export const sessionDataSyncMiddleware = store => next => action => {
    switch (action.type) {
        case SET_CURRENT_SCREEN:
            const { getState, dispatch } = store
            const state = getState()

            if( action.text === VIEW_CART ) {
                syncOrderDataToSession( state.order )
                    .then(() => {

                        const { order } = state
                        const { order_location = { id: null } } = order

                        return setTaxSessionRequest(order_location.id)
                    })
                    .then(() => {
                        return getCart()
                    })
                    .then(result => {
                        return dispatch(setCart(result.cart))
                    })
            }
            break;
    }

    return next(action);
}