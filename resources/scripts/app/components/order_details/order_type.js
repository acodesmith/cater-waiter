import React from 'react'
import {
    ORDER_TYPE_DELIVERY,
    ORDER_TYPE_PICKUP,
    setOrderType
} from '../../../constansts/order'

const orderTypeSwitch = (order_type, labels, dispatch) =>
{
    let {
        change_order_to_delivery,
        change_order_to_pickup
    } = labels

    switch( order_type )
    {
        case ORDER_TYPE_PICKUP:
            return <a href="#toggleOrderType" onClick={event => {
                event.preventDefault()
                dispatch( setOrderType( ORDER_TYPE_DELIVERY ) )
            }}>
                { change_order_to_delivery }
                </a>
            break;
        case ORDER_TYPE_DELIVERY:
            return <a href="#toggleOrderType" onClick={event => {
                event.preventDefault()
                dispatch( setOrderType( ORDER_TYPE_PICKUP ) )
            }}>{ change_order_to_pickup }</a>
            break;
    }
}

const OrderType = props =>
{
    let {
        dispatch,
        labels,
        order: {
            order_type
        }
    } = props

    let { order_type_title } = labels

    return (
        <div className="cw__order_type">
            <h4>{ order_type_title }</h4>
            <span>{ order_type }</span>
            { orderTypeSwitch(order_type, labels, dispatch) }
        </div>
    );
}

export default OrderType