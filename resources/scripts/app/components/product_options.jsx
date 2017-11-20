import React from 'react'
import { getProductById } from '../../utilities'

const ProductOptions = props => {

    const {
        data: {
            show_product_options,
            products
        }
    } = props

    if( ! show_product_options )
        return null

    const product = getProductById( show_product_options, products)

    return (
        <div className="cw__product_options">
            <h3>{ product.name }</h3>
        </div>
    )
}

export { ProductOptions }