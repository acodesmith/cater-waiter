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

/**
 * Add item to cart.
 * The items data is provided via the form/add_product_to_cart
 *
 * @param items
 * @param loading_message
 * @param closeModal
 * @returns {function(*)}
 */
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

/**
 * Check the provided zip code is within the max range.
 * The max is set in the WooCommerce -> Settings -> Catering option panel.
 * The mile radius is calculated used the Simple Locator plugin.
 *
 * @param values
 * @param max
 * @param loading_message
 * @returns {function(*=)}
 */
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

/**
 * Remove an entire group of products based on product id.
 * Cart items have variation ids and product id.
 * Remove all items where the product_id matches the provided argument.
 *
 * @param product_id
 * @param loading_message
 * @param cart_updating_message
 * @returns {function(*)}
 */
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

/**
 * Remove cart item in the context of a modal and redux form.
 *
 * @param key
 * @param index
 * @param loading_message
 * @param cart_updating_message
 * @returns {function(*)}
 */
export const removeCartItemInForm = (key, index, loading_message, cart_updating_message) =>
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

/**
 * Use to remove cart item with context of modal or redux form.
 *
 * @param key
 * @param loading_message
 * @param cart_updating_message
 * @returns {function(*)}
 */
export const removeCartItem = (key, loading_message, cart_updating_message) =>
{
    return dispatch => {

        dispatch( loadingToggle( loading_message ) )

        removeCartItemAjax(key)
            .then(() => dispatch( loadingToggle( cart_updating_message ) ))
            .then(() => { return getCart() })
            .then(result => { return dispatch( setCart( result.cart ) ) })
            .then(() => dispatch( loadingToggle() ))
    }
}

/**
 * Used to update existing cart items.
 * Item data pulled from form/update_cart_items
 *
 * @param items
 * @param loading_message
 * @param cart_updating_message
 * @returns {function(*)}
 */
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