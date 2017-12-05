import { addToCart as addToCartAPI } from '../utilities/'
import {
    addItemToCart,
    loadingToggle
} from '../constansts/'

export const addToCart = (items, loading_message) =>
{
    return dispatch => {

        dispatch( loadingToggle( loading_message ) )

        addToCartAPI(items)
            .then(data => {

                if( data.success )
                    dispatch( addItemToCart( data.cart ) )
                    dispatch( loadingToggle() )
            })
    }
}