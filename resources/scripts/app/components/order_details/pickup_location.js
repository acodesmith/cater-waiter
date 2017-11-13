import React from 'react'

const PickupLocation = props =>
{
    let {
        labels: {
            pickup_location_title
        },
        order: {
            order_location
        }
    } = props

    if( ! order_location )
        return null

    return (
        <div className="cw__pickup_location">
            <h3>{ pickup_location_title }</h3>
            { order_location.title }
        </div>
    )
}

export { PickupLocation }