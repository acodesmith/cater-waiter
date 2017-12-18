import React from 'react'
import {
    VIEW_SCHEDULE_ORDER,
    jumpToView
} from '../../../constansts'
import {
    militaryToStandard
} from '../../../utilities'
import {
    Button
} from '../../elements/button_no_event'

const OrderTime = props =>
{
    let {
        dispatch,
        labels: {
            pickup_time_title,
            delivery_time_title,
            change_delivery_time,
            change_pickup_time
        },
        order: {
            order_pickup_time = {},
            order_type
        },
        view: {
            history
        }
    } = props

    if( ! order_pickup_time )
        return null

    const delivery = order_type === 'delivery'

    const { order_date, order_time } = order_pickup_time

    return (
        <div className="cw__order_time">
            <h3>{ delivery ? delivery_time_title : pickup_time_title }</h3>
            <div>
                <span className="cw__order_date">{ order_date }</span>
                <span className="cw__order_time">{ militaryToStandard( order_time ) }</span>
            </div>
            <Button
                onClick={() => dispatch( jumpToView( VIEW_SCHEDULE_ORDER, history ) )}
                className="btn btn-xs btn-link">
                { delivery ? change_delivery_time : change_pickup_time }
            </Button>
        </div>
    )
}

export { OrderTime }