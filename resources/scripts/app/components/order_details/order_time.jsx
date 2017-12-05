import React from 'react'
import { militaryToStandard } from '../../../utilities'

const OrderTime = props =>
{
    let {
        labels: {
            pickup_time_title,
            delivery_time_title
        },
        order: {
            order_pickup_time = {},
            order_type
        }
    } = props

    if( ! order_pickup_time )
        return null

    const delivery = order_type === 'delivery'

    const { order_date, order_time } = order_pickup_time

    return (
        <div className="cw__order_time">
            <h3>{ delivery ? delivery_time_title : pickup_time_title }</h3>
            <span className="cw__order_date">{ order_date }</span> <span className="cw__order_time">{ militaryToStandard( order_time ) }</span>
        </div>
    )
}

export { OrderTime }