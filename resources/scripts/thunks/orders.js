import { addToCart as addToCartAPI } from '../utilities/'
import {
    VIEW_SCHEDULE_ORDER,
    setCurrentScreen,
    setDeliveryAddress,
    addItemToCart,
    modalLoadingToggle,
    loadingToggle,
    outOfRangeDelivery
} from '../constansts/'
import { validateAddressRadius } from '../utilities'

export const addToCart = (items, loading_message) =>
{
    return dispatch => {

        dispatch( modalLoadingToggle( loading_message ) )

        addToCartAPI(items)
            .then(data => {

                if( data.success )
                    dispatch( addItemToCart( data.cart ) )
                    dispatch( modalLoadingToggle() )
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

                const {
                    valid,
                    location
                } = result

                console.log("result",result);

                if( valid ) {

                    values.delivery_within_range = true

                    dispatch( loadingToggle() )
                    dispatch( setDeliveryAddress( values, location ) )
                    dispatch( setCurrentScreen( VIEW_SCHEDULE_ORDER ) )
                }else{
                    //Set state to display error message for out of range delivery address
                    dispatch( loadingToggle() )
                    dispatch( outOfRangeDelivery() )
                }
            })
    }
}