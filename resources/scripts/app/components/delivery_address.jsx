import React from 'react'
import FormDeliveryAddress from '../forms/delivery_address'
import { setDeliveryAddress } from '../../constansts/order'
import {
    VIEW_SCHEDULE_ORDER,
    setCurrentScreen
} from '../../constansts/view'
//import { validateAddressRadius } from '../../utilities/address'

const DeliveryAddress = props =>
{
    const {
        dispatch,
        labels,
        order = {}
    } = props

    let { order_delivery_address = {} } = order
    let { delivery_within_range } = order_delivery_address

    return (
        <div className="cw__deliver_address">
            <h1>Delivery Address</h1>
            { delivery_within_range === false ? 'Out of range' : null }
            <FormDeliveryAddress {...{labels}} onSubmit={values => {
                dispatch( setDeliveryAddress(values) )
                dispatch( setCurrentScreen(VIEW_SCHEDULE_ORDER) )
                //dispatch( validateAddressRadius(values, 100) )
            }}/>
        </div>
    )
}

export { DeliveryAddress }