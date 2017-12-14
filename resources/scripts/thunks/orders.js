import { addToCart as addToCartAPI } from '../utilities/'
import { arrayRemove } from 'redux-form'
import {
    VIEW_SCHEDULE_ORDER,
    FORM_UPDATE_CART_ITEMS,
    setCurrentScreen,
    setDeliveryAddress,
    addItemToCart,
    modalLoadingToggle,
    loadingToggle,
    outOfRangeDelivery,
    setCart
} from '../constansts/'
import {
    validateAddressRadius,
    getLocationFromId,
    setTaxRateBasedOnLocation,
    getCart,
    removeGroupedProduct as removeGroupedProductAjax,
    removeCartItem as removeCartItemAjax,
    updateCertItems as updateCertItemsAjax
} from '../utilities'

export const addToCart = (items, loading_message, closeModal) =>
{
    return dispatch => {

        dispatch( modalLoadingToggle( loading_message ) )

        addToCartAPI(items)
            .then(data => {

                if( data.success )
                    dispatch( addItemToCart( data.cart ) )
                    dispatch( modalLoadingToggle() )
                    closeModal( new Event('click') )
            })
    }
}

export const validateDeliveryRange = (values, max, loading_message) =>
{
    return dispatch => {

        const {
            delivery_address_zip
        } = values

        dispatch( loadingToggle( loading_message ) )

        validateAddressRadius(delivery_address_zip, max)
            .then(result => {

                let {
                    valid,
                    location
                } = result

                if( valid ) {

                    getLocationFromId( location.id ).then(post => {

                        values.delivery_within_range = true
                        location.post = post

                        return setTaxRateBasedOnLocation( location.id )
                    })
                        .then(() => {
                            return getCart()
                        })
                        .then(result => {
                            return dispatch( setCart( result.cart ) )
                        })
                        .then(() => dispatch( setDeliveryAddress( values, location ) ))
                        .then(() => dispatch( loadingToggle() ))
                        .then(() => dispatch( setCurrentScreen( VIEW_SCHEDULE_ORDER ) ))

                }else{
                    //Set state to display error message for out of range delivery address
                    dispatch( loadingToggle() )
                    dispatch( outOfRangeDelivery() )
                }
            })
    }
}

export const removeGroupedProduct = (product_id, loading_message, cart_updating_message) =>
{
    return dispatch => {

        dispatch( loadingToggle( loading_message ) )

        removeGroupedProductAjax(product_id)
            .then(() => dispatch( loadingToggle( cart_updating_message ) ))
            .then(() => { return getCart() })
            .then(result => { return dispatch( setCart( result.cart ) ) })
            .then(() => dispatch( loadingToggle() ))
    }
}

export const removeCartItem = (key, index, loading_message, cart_updating_message) =>
{
    return dispatch => {

        dispatch( modalLoadingToggle( loading_message ) )

        removeCartItemAjax(key)
            .then(() => dispatch( arrayRemove( FORM_UPDATE_CART_ITEMS, 'items', index ) ))
            .then(() => dispatch( modalLoadingToggle( cart_updating_message ) ))
            .then(() => { return getCart() })
            .then(result => { return dispatch( setCart( result.cart ) ) })
            .then(() => dispatch( modalLoadingToggle() ))
    }
}

export const updateCartItems = (items, loading_message, cart_updating_message) =>
{
    return dispatch => {

        dispatch( modalLoadingToggle( loading_message ) )

        updateCertItemsAjax(items)
            .then(() => dispatch( modalLoadingToggle( cart_updating_message ) ))
            .then(() => { return getCart() })
            .then(result => { return dispatch( setCart( result.cart ) ) })
            .then(() => dispatch( modalLoadingToggle() ))
    }
}