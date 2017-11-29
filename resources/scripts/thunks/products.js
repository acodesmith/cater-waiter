import { getProducts as getProductsAPI } from '../utilities/products'
import { setProducts } from '../constansts/products'

export const getProducts = () =>
{
    return dispatch => {
        getProductsAPI().then(data => {
            dispatch( setProducts( data ) )
        })
    }
}

export const addToCart = values =>
{
    return dispatch => {

    }
}