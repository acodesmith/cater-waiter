import React from 'react'
import numeral from 'numeral'
import _ from 'lodash'
import { removeCartItem } from '../../thunks'
import { Button } from '../elements/button_no_event'
import {
    getProductById,
    formatCurrency,
    mapValue
} from '../../utilities'

const Confirm = props => {

    const {
        dispatch,
        labels: {
            confirm_order_title,
            continue_to_checkout_button,
            currency,
            delivery_minimum_error,
            item_total,
            remove,
            removing_item_from_cart,
            removing_item_from_cart_confirm,
            subtotal: subtotal_label,
            tax: tax_label,
            total: total_label,
            quantity,
            updating_cart,
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
        },
        settings: {
            delivery_minimum
        }
    } = props

    const {
        subtotal,
        tax,
        total,
        items
    } = order_cart

    const order_total = +subtotal + +tax

    const minimum_met = order_total >= +delivery_minimum

    return (
        <div className="cw__confirm">
            <h2>{ confirm_order_title }</h2>
            { minimum_met ? null :
                <div className="cw__error alert alert-danger">{ mapValue( delivery_minimum, delivery_minimum_error  )}</div> }
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
                                        <Button className="btn btn-sm btn-danger" onClick={() => {

                                            const confirm_action = confirm( removing_item_from_cart_confirm )

                                            if( confirm_action )
                                                dispatch( removeCartItem( item.key, removing_item_from_cart, updating_cart ) )

                                        }}>{ _.upperFirst(remove) }</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
            <div className="cw__cart_totals">
                <div className="container-fluid">
                    <div className="row">
                        <div className="cw__cart_subtotal">
                            <span>{ subtotal_label }:</span>
                            <span>{ formatCurrency( subtotal, currency ) }</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cw__cart_tax">
                            <span>{ tax_label }:</span>
                            <span>{ formatCurrency( tax, currency ) }</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cw__cart_total">
                            <span>{ total_label }:</span>
                            <span>{ formatCurrency( order_total, currency ) }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cw__buttons">
                { ! minimum_met ? null :
                <Button
                    className="btn btn-lg pull-right"
                    onClick={() => window.location = order_checkout_url}>
                    { continue_to_checkout_button }</Button> }
            </div>
        </div>
    )
}

export { Confirm }