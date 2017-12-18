import React from 'react'
import { Button } from '../../elements/button_no_event'
import {
    VIEW_DELIVERY_ADDRESS,
    jumpToView
} from '../../../constansts'

const DeliveryLocation = props =>
{
    const {
        dispatch,
        labels: {
            change_delivery_location,
            delivery_location
        },
        order: {
            order_delivery_address
        },
        view: {
            history
        }
    } = props

    return (
        <div className="cw__deliver_location">
            <h3>{ delivery_location }</h3>
            <div className="cw__delivery_address">
                { Object.keys(order_delivery_address).map(key => {
                    return <span className={`cw__${key}`} key={key}>{order_delivery_address[key]}</span>
                }) }
            </div>
            <Button className="btn btn-xs btn-link" onClick={() => dispatch( jumpToView( VIEW_DELIVERY_ADDRESS, history ) )}>
                { change_delivery_location }
            </Button>
        </div>
    )
}

export { DeliveryLocation }