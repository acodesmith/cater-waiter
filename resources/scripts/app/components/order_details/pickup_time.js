import React from 'react'

const PickupTime = props =>
{
    let {
        labels: {
            pickup_time_title
        },
        order: {
            order_pickup_time
        }
    } = props

    if( ! order_pickup_time )
        return null

    return (
        <div className="cw__pickup_time">
            <h3>{ pickup_time_title }</h3>

        </div>
    )
}

export { PickupTime }