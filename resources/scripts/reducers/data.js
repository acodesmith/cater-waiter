import _ from 'lodash'
import {
    CLEAR_NOTIFICATION,
    CLEAR_ALL_NOTIFICATIONS,
    SET_NOTIFICATION,
    SET_LOCATIONS,
    SET_LOCATION,
    SET_CURRENT_SCREEN,
    SET_PRODUCTS,
    SHOW_ITEM_OPTIONS,
    HIDE_ITEM_OPTIONS,
    LOADING_TOGGLE,
    MODAL_LOADING_TOGGLE,
    SHOW_GROUPED_ITEMS_OPTIONS,
    HIDE_GROUPED_ITEMS_OPTIONS,
    SHOW_HELP_INFO,
    HIDE_HELP_INFO
} from '../constansts/'

const data = (state, action) => {

    switch(action.type) {
        case CLEAR_NOTIFICATION:

            const { notifications = [] } = state

            return Object.assign( {}, state, {
                notifications: notifications.filter(n => n.id === action.data.id)
            })
            break;
        case CLEAR_ALL_NOTIFICATIONS:
            return Object.assign( {}, state, {
                notifications: []
            })
            break;
        case SET_NOTIFICATION:

            state.notifications.push( action.data )

            return Object.assign( {}, state, {
                notifications: state.notifications
            })
            break;
        case SET_LOCATIONS:
            return Object.assign( {}, state, {
                locations: action.locations,
            })
            break;
        case SET_LOCATION:
            return Object.assign( {}, state, {
                location: action.location,
            })
            break;
        case SET_CURRENT_SCREEN:
            if( typeof action.order_type !== 'undefined' )
                return Object.assign( {}, state, {
                    order_type: action.order_type,
                })
            break;
        case SET_PRODUCTS:
            return Object.assign( {}, state, {
                products: action.data,
            })
            break;
        case SHOW_ITEM_OPTIONS:
            return Object.assign( {}, state, {
                show_product_options: action.data,
            })
            break;
        case HIDE_ITEM_OPTIONS:
            return Object.assign( {}, state, {
                show_product_options: null,
            })
            break;
        case SHOW_GROUPED_ITEMS_OPTIONS:
            return Object.assign( {}, state, {
                update_grouped_products: action.data,
            })
            break;
        case HIDE_GROUPED_ITEMS_OPTIONS:
            return Object.assign( {}, state, {
                update_grouped_products: null,
            })
            break;
        case LOADING_TOGGLE:
            return Object.assign( {}, state, {
                loading: action.data !== null ? true : ! state.loading,
                loading_message: action.data
            })
            break;
        case MODAL_LOADING_TOGGLE:
            return Object.assign( {}, state, {
                modal_loading: action.data !== null ? true : ! state.modal_loading,
                modal_loading_message: action.data
            })
            break;
        case SHOW_HELP_INFO:
            return Object.assign( {}, state, {
                help_info: true
            })
        case HIDE_HELP_INFO:
            return Object.assign( {}, state, {
                help_info: false
            })
    }

    return Object.assign({}, state)
}

export default data