import React from 'react'
import { UpdateGroupedProducts } from '../../components'
import { Button } from '../../elements/button_no_event'
import {
    getProductById,
    mapValue,
} from '../../../utilities'
import { TaxFreePrompt } from "../tax_free_prompt"
import { Totals } from "./totals"
import { Item } from "./item"

const Confirm = ({ labels, dispatch, data, order, settings, ...props }) => {

    const {
        order_checkout_url,
        order_cart = {
            subtotal: 0,
            tax: [],
            total: "",
            items: []
        }
    }= order

    const {
        are_you_a_tax_exempt_organization,
        cart_item,
        confirm_order_title,
        continue_to_checkout_button,
        delivery_minimum_error,
        item_total,
        quantity,
    } = labels

    const {
        products,
        update_grouped_products
    } = data

    const {
        delivery_minimum,
        tax_free_prompt
    } = settings

    const {
        subtotal,
        tax,
        items
    } = order_cart

    const order_total = +subtotal + +tax

    const minimum_met = order_total >= +delivery_minimum

    return (
        <div className="cw__confirm">
            {update_grouped_products && <UpdateGroupedProducts {...props}/>}
            <h2>{ confirm_order_title }</h2>
            { minimum_met ? null :
                <div className="cw__error alert alert-danger">{ mapValue( delivery_minimum, delivery_minimum_error  )}</div> }
            <div className="cw__cart_items">
                <div className="cw__cart_items_labels">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-4">{ cart_item }</div>
                            <div className="col-md-2 col-sm-4 text-center">{ quantity }</div>
                            <div className="col-md-2 col-sm-4 text-right">{ item_total }</div>
                        </div>
                    </div>
                </div>
                { items.map((item, key) => (
                    <Item
                        key={key}
                        product={getProductById( item.product_id, products )}
                        item={item}
                        labels={labels}
                        dispatch={dispatch}
                    />
                )) }
            </div>
            <hr/>
            <Totals labels={labels} order_cart={order_cart} />
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