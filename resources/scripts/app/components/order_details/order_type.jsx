import React from 'react'
import _ from 'lodash'
import { Button } from '../../elements/button_no_event'
import {
    ORDER_TYPE_DELIVERY,
    VIEW_SELECT_ORDER_TYPE,
    jumpToView
} from '../../../constansts'

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
            <span>{ _.startCase( order_type ) }</span>
            <div className="cw__order_alter_options">
                <Button
                    onClick={() => dispatch( jumpToView( VIEW_SELECT_ORDER_TYPE, history ) )}
                    className="btn btn-xs btn-link">
                    { order_type === ORDER_TYPE_DELIVERY ? change_order_to_pickup : change_order_to_delivery }
                </Button>
            </div>
        </div>
    );
}

export { OrderType }