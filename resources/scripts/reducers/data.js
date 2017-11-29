import {
    SET_LOCATIONS,
    SET_LOCATION,
    SET_CURRENT_SCREEN,
    SET_PRODUCTS,
    SHOW_ITEM_OPTIONS,
    HIDE_ITEM_OPTIONS,
} from '../constansts/'

const data = (state, action) => {

    switch(action.type) {
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
    }

    return Object.assign({}, state)
}

export default data