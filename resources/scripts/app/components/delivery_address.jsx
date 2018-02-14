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
            delivery_max_range,
            delivery_outside_of_range
        }
    } = props

    const { order_delivery_address = {} } = order
        , { delivery_within_range } = order_delivery_address
        , { delivery_address_validating, } = labels

    return (
        <div className="cw__delivery_address">
            <h1>Delivery Address</h1>
            { delivery_within_range === false
                ? <div className='cw__delivery_outside_of_range cw__alert cw__alert_warning alert alert-warning' dangerouslySetInnerHTML={{__html: delivery_outside_of_range}}></div> : null }
            <FormDeliveryAddress {...{labels}} onSubmit={values => {
                dispatch( validateDeliveryRange( values, delivery_max_range, delivery_address_validating ) )
            }}/>
        </div>
    )
}

export { DeliveryAddress }