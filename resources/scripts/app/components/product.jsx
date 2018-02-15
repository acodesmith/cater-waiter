import React from 'react'
import { Button } from '../elements/button'
import {
    showItemOptions
} from '../../constansts'

const getProductPrice = ({ price_html }, custom_label) => {
    return <span className="cw__product_price">
        { custom_label ? custom_label : (() => {
           return <span dangerouslySetInnerHTML={{__html: price_html}}></span>
        })() }
    </span>
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
        <div className="col-sm-12 col-md-6">
            <div key={product.id}  className="cw__product">
                <h4>{product.name} { getProductPrice(product, _product_custom_price_label ? _product_custom_price_label.value : null) }</h4>
                <div dangerouslySetInnerHTML={{__html: product.description}}></div>
                <Button onClick={event => {
                    event.preventDefault()
                    dispatch( showItemOptions( product.id ) )
                }}>{ add_to_cart_title }</Button>
            </div>
        </div>
    )
}

export { Product }