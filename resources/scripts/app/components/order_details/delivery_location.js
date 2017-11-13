import React from 'react'

const DeliveryLocation = props =>
{
    const {
        order: {
            order_delivery_address
        }
    } = props

    return (
        <div className="cw__deliver_location">
            <h4>Delivery Location</h4>
            <div className="cw__delivery_address">
                { Object.keys(order_delivery_address).map(key => {
                    return <span key={key}>{order_delivery_address[key]}</span>
                }) }
            </div>
            <a className="cw__link">change delivery location</a>
        </div>
    )
}

export { DeliveryLocation }