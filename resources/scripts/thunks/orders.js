import { addToCart as addToCartAPI } from '../utilities/'
import {
    VIEW_SCHEDULE_ORDER,
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
    getCart
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

export const validateDeliveryRange = (values, max, loading_message) => {

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