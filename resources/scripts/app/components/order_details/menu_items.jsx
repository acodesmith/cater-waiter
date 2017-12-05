import React from 'react'
import numeral from 'numeral'
import { getProductById } from '../../../utilities'

const MenuItems = props => {

    const {
        labels: {
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
        <div className="cw__menu_items">
            <h3>Menu Items</h3>
            { items.map(item => {

                let product = getProductById( item.product_id, products )

                return (
                    <div className="cw__menu_item">
                        <h4>{ product.name }</h4>
                        <span className="cw__menu_item_quantity">{ quantity } { item.quantity }</span>
                        <br/>
                        <span className="cw__menu_item_line_total">{ item_total } {currency}{ numeral( item.line_total ).format('0.00') }</span>
                    </div>
                )
            }) }
        </div>
    )
}

export { MenuItems }