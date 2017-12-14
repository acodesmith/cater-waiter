import React from 'react'
import _ from 'lodash'
import { Button } from '../../elements/button'
import {
    formatCurrency,
    groupCartItemsByProductId
} from '../../../utilities'
import {
    showGroupedItemsOptions
} from '../../../constansts'
import {
    removeGroupedProduct
} from '../../../thunks'

const MenuItems = props => {

    const {
        dispatch,
        labels: {
            update,
            quantity,
            currency,
            item_total,
            subtotal: subtotal_label,
            tax: tax_label,
            total: total_label,
            remove,
            removing_item_from_cart,
            updating_cart,
            removing_item_from_cart_confirm
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

    if( ! items || ! items.length )
        return null

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
                        <Button className="btn btn-xs btn-default" onClick={event => {
                            event.preventDefault()
                            dispatch( showGroupedItemsOptions( group.product.id ) )
                        }}>{ _.upperFirst(update) }</Button>
                        <Button className="btn btn-xs btn-danger" onClick={event => {
                            event.preventDefault()

                            const confirm_action = confirm( removing_item_from_cart_confirm )

                            if( confirm_action )
                                dispatch( removeGroupedProduct( group.product.id, removing_item_from_cart, updating_cart ) )

                        }}>{ _.upperFirst(remove) }</Button>
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
            <hr/>
        </div>
    )
}

export { MenuItems }