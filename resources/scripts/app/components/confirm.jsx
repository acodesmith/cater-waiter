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
import { TaxFreePrompt } from "./tax_free_prompt"

const Confirm = props => {

    const {
        dispatch,
        labels: {
            are_you_a_tax_exempt_organization,
            cart_item,
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
            delivery_minimum,
            tax_free_prompt
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
                <div className="cw__cart_items_labels">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 col-sm-4">{ cart_item }</div>
                            <div className="col-md-2 col-sm-4 text-center">{ quantity }</div>
                            <div className="col-md-2 col-sm-4 text-right">{ item_total }</div>
                        </div>
                    </div>
                </div>
                { items.map((item, key) => {

                    let product = getProductById( item.product_id, products )

                    return (
                        <div key={key} className="cw__cart_item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-8 col-sm-4">
                                        <strong className="cw__product_name">
                                            { product.name }
                                        </strong>

                                            { product.attributes.map((attr, key) => {
                                                if( typeof item.variation[ attr.attribute_slug ] !== 'undefined' ) {
                                                    return (
                                                        <div key={key} className="cw__product_attributes">
                                                            <span className='cw__product_attribute_name'>{attr.name}:</span>
                                                            <span className='cw__product_attribute_value' dangerouslySetInnerHTML={{__html: item.variation[ attr.attribute_slug ]}}></span>
                                                        </div>
                                                    )
                                                }
                                            }) }
                                    </div>
                                    <div className="col-md-2 col-sm-4 text-center">{ item.quantity }</div>
                                    <div className="col-md-2 col-sm-4 text-right">{currency}{ numeral( item.line_total ).format('0.00') }</div>
                                    {/*<div className="col-md-3">*/}
                                        {/*<Button className="btn btn-sm btn-danger" onClick={() => {*/}

                                            {/*const confirm_action = confirm( removing_item_from_cart_confirm )*/}

                                            {/*if( confirm_action )*/}
                                                {/*dispatch( removeCartItem( item.key, removing_item_from_cart, updating_cart ) )*/}

                                        {/*}}>{ _.upperFirst(remove) }</Button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
            <hr/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-offset-8 col-md-4">
                        <div className="cw__cart_totals">
                            <div className="cw__cart_subtotal">
                                <div className="container-fluid">
                                    <div className="row">
                                        <span className='col-sm-6 text-right'>{ subtotal_label }:</span>
                                        <span className='col-sm-6 text-right'>{ formatCurrency( subtotal, currency ) }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cw__cart_tax">
                                <div className="container-fluid">
                                    <div className="row">
                                        <span className='col-sm-6 text-right'>{ tax_label }:</span>
                                        <span className='col-sm-6 text-right'>{ formatCurrency( tax, currency ) }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cw__cart_total">
                                <div className="container-fluid">
                                    <div className="row">
                                        <span className='col-sm-6 text-right'>{ total_label }:</span>
                                        <span className='col-sm-6 text-right'>{ formatCurrency( order_total, currency ) }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <TaxFreePrompt
                label={are_you_a_tax_exempt_organization}
                prompt={tax_free_prompt}
            />
            <hr/>
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