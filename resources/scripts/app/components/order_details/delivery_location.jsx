import React from 'react'

const DeliveryLocation = props =>
{
    const {
        labels: {
            change_delivery_location,
            delivery_location
        },
        order: {
            order_delivery_address
        }
    } = props

    return (
        <div className="cw__deliver_location">
            <h4>{ delivery_location }</h4>
            <div className="cw__delivery_address">
                { Object.keys(order_delivery_address).map(key => {
                    return <span key={key}>{order_delivery_address[key]}</span>
                }) }
            </div>
            <a className="cw__link">{ change_delivery_location }</a>
        </div>
    )
}

export { DeliveryLocation }