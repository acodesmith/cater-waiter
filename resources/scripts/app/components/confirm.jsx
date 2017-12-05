import React from 'react'
import numeral from 'numeral'
import { getProductById } from '../../utilities'

const Confirm = props => {

    const {
        labels: {
            confirm_order_title,
            quantity,
            currency,
            item_total
        },
        data: {
            products
        },
        order: {
            order_cart = {
                subtotal: 0,
                tax: [],
                total: "",
                items: []
            }
        }
    } = props

    const {
        subtotal,
        tax,
        total,
        items
    } = order_cart

    return (
        <div className="cw__confirm">
            <h2>{ confirm_order_title }</h2>
            <div className="cw__cart_items">
                { items.map((item, key) => {

                    let product = getProductById( item.product_id, products )

                    return (
                        <div key={key} className="cw__cart_item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">{ product.name }</div>
                                    <div className="col-md-3">{ quantity } { item.quantity }</div>
                                    <div className="col-md-3">{ item_total } {currency}{ numeral( item.line_total ).format('0.00') }</div>
                                    <div className="col-md-3">Remove</div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export { Confirm }