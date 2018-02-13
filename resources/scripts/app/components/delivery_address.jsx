import React from 'react'
import FormDeliveryAddress from '../forms/delivery_address'
import { validateDeliveryRange } from '../../thunks'

const DeliveryAddress = props =>
{
    const {
        dispatch,
        labels,
        order = {},
        settings: {
            delivery_max_range
        }
    } = props

    const { order_delivery_address = {} } = order
    const { delivery_within_range } = order_delivery_address
    const {
        delivery_address_validating,
        delivery_out_of_range
    } = labels

    return (
        <div className="cw__delivery_address">
            <h1>Delivery Address</h1>
            { delivery_within_range === false ? delivery_out_of_range : null }
            <FormDeliveryAddress {...{labels}} onSubmit={values => {
                dispatch( validateDeliveryRange( values, delivery_max_range, delivery_address_validating ) )
            }}/>
        </div>
    )
}

export { DeliveryAddress }