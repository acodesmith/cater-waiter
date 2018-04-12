import React from 'react'
import { formatCurrency } from "../../../utilities/format"

export const Totals = ({ labels, order_cart }) => {

    const {
        subtotal: subtotal_label,
        tax: tax_label,
        total: total_label,
        currency
    } = labels

    const {
        subtotal,
        tax
    } = order_cart

    const order_total = +subtotal + +tax

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-offset-8 col-md-4">
                    <div className="cw__cart_totals">
                        <div className="cw__cart_subtotal">
                            <div className="container-fluid">
                                <div className="row">
                                    <span className='col-xs-6 text-right'>{ subtotal_label }:</span>
                                    <span className='col-xs-6 text-right'>{ formatCurrency( subtotal, currency ) }</span>
                                </div>
                            </div>
                        </div>
                        <div className="cw__cart_tax">
                            <div className="container-fluid">
                                <div className="row">
                                    <span className='col-xs-6 text-right'>{ tax_label }:</span>
                                    <span className='col-xs-6 text-right'>{ formatCurrency( tax, currency ) }</span>
                                </div>
                            </div>
                        </div>
                        <div className="cw__cart_total">
                            <div className="container-fluid">
                                <div className="row">
                                    <span className='col-xs-6 text-right'>{ total_label }:</span>
                                    <span className='col-xs-6 text-right'>{ formatCurrency( order_total, currency ) }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}