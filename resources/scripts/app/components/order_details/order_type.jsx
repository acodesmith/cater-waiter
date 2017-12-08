import React from 'react'
import { Button } from '../../elements/button'
import {
    ORDER_TYPE_DELIVERY,
    VIEW_SELECT_ORDER_TYPE,
    jumpToView
} from '../../../constansts'
import { jumpToView as jumpToViewUtility } from '../../../utilities'

const OrderType = props =>
{
    let {
        dispatch,
        labels: {
            change_order_to_delivery,
            change_order_to_pickup,
            order_type_title
        },
        order: {
            order_type
        },
        view: {
            history
        }
    } = props

    return (
        <div className="cw__order_type">
            <h3>{ order_type_title }</h3>
            <span>{ order_type }</span>
            <div className="cw__order_alter_options">
                <Button onClick={event => {
                    event.preventDefault();

                    let history = jumpToViewUtility( VIEW_SELECT_ORDER_TYPE, history )

                    dispatch( jumpToView( VIEW_SELECT_ORDER_TYPE, history ) )
                }} className="btn-link">
                    { order_type === ORDER_TYPE_DELIVERY ? change_order_to_delivery : change_order_to_pickup }
                </Button>
            </div>
        </div>
    );
}

export { OrderType }