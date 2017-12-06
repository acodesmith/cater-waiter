import { addToCart as addToCartAPI } from '../utilities/'
import {
    addItemToCart,
    modalLoadingToggle
} from '../constansts/'

export const addToCart = (items, loading_message) =>
{
    return dispatch => {

        dispatch( modalLoadingToggle( loading_message ) )

        addToCartAPI(items)
            .then(data => {

                console.log("data",data);

                if( data.success )
                    dispatch( addItemToCart( data.cart ) )
                    dispatch( modalLoadingToggle() )
            })
    }
}