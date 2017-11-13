import { setDeliveryAddress } from '../constansts/order'

export const validateAddressRadius = (values, maxRadius) => {

    console.log("maxRadius",maxRadius);

    return (dispatch) => {
        dispatch( setDeliveryAddress(values) )
    }
}