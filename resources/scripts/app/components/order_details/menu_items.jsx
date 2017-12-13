import React from 'react'
import {
    formatCurrency,
    getProductById,
    groupCartItemsByProductId
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

    const grouped_items = groupCartItemsByProductId( items, products )

    return (
        <div className="cw__menu_items cw__menu_items_mini">
            <h3>Menu Items</h3>
            { grouped_items.map((group, key) => {

                return (
                    <div className="cw__menu_item" key={key}>
                        <h4>{ group.product.name }</h4>
                        <div className="cw__menu_item_quantity cw__menu_item_line">
                            <span>{ quantity }:</span>
                            <span>{ group.quantity }</span>
                        </div>
                        <div className="cw__menu_item_line_total cw__menu_item_line">
                            <span>{ item_total }:</span>
                            <span>{ formatCurrency(group.line_total, currency) }</span>
                        </div>
                    </div>
                )
            }) }
            <hr/>
            <div className="cw__cart_subtotal">
                <span>{ subtotal_label }:</span>
                <span>{ formatCurrency(subtotal, currency) }</span>
            </div>
            <div className="cw__cart_tax">
                <span>{ tax_label }:</span>
                <span>{ formatCurrency(tax, currency) }</span>
            </div>
            <div className="cw__cart_total">
                <span>{ total_label }:</span>
                <span className="html--set" dangerouslySetInnerHTML={{__html: total}}></span>
            </div>
        </div>
    )
}

export { MenuItems }