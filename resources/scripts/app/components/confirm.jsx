import React from 'react'
import numeral from 'numeral'
import { getProductById } from '../../utilities'
import { Button } from '../elements/button'

const Confirm = props => {

    const {
        labels: {
            confirm_order_title,
            quantity,
            currency,
            item_total,
            continue_to_checkout_button,
            remove
        },
        data: {
            products
        },
        order: {
            order_checkout_url,
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
                                    <div className="col-md-3">
                                        <Button onClick={event => {
                                            event.preventDefault()
                                            console.log("remove item")
                                        }}>{ remove }</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
            <div className="cw__buttons">
                <Button onClick={event => {
                    event.preventDefault()
                    window.location = order_checkout_url;
                }}>{ continue_to_checkout_button }</Button>
            </div>
        </div>
    )
}

export { Confirm }