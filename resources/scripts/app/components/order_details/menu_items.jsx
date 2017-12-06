import React from 'react'
import {
    formatCurrency,
    getProductById
} from '../../../utilities'

const MenuItems = props => {

    const {
        labels: {
            quantity,
            currency,
            item_total,
            subtotal: subtotal_label,
            tax: tax_label,
            total: total_label
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
            { items.map((item, key) => {

                let product = getProductById( item.product_id, products )

                return (
                    <div className="cw__menu_item" key={key}>
                        <h4>{ product.name }</h4>
                        <span className="cw__menu_item_quantity">{ quantity } { item.quantity }</span>
                        <br/>
                        <span className="cw__menu_item_line_total">{ item_total } { formatCurrency(item.line_total, currency) }</span>
                    </div>
                )
            }) }
            <hr/>
            <div className="cw__cart_total">
                { subtotal_label }: { formatCurrency(subtotal, currency) }
            </div>
            <div className="cw__cart_total">
                { tax_label }: { formatCurrency(tax, currency) }
            </div>
            <div className="cw__cart_total">
                { total_label }: <span dangerouslySetInnerHTML={{__html: total}}></span>
            </div>
        </div>
    )
}

export { MenuItems }