import React from 'react'
import { Button } from '../elements/button'
import {
    showItemOptions
} from '../../constansts'

const html = markup =>
{
    return {__html: markup};
}

const Product = props => {

    let {
        dispatch,
        product,
        labels: {
            add_to_cart_title
        }
    } = props

    const {
        meta_data: {
            _product_custom_price_label
        }
    } = product
    
    return (
        <div key={product.id}  className="cw__product">
            <h4>{product.name}
                { _product_custom_price_label ? <span className="cw__product_price">{ _product_custom_price_label.value }</span>
                    : <span className="cw__product_price" dangerouslySetInnerHTML={html(product.price_html)}></span> }
            </h4>
            <div dangerouslySetInnerHTML={html(product.description)}></div>
            <Button onClick={event => {
                event.preventDefault()
                dispatch( showItemOptions( product.id ) )
            }}>{ add_to_cart_title }</Button>
        </div>
    )
}

export { Product }