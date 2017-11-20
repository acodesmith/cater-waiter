import React from 'react'
import { connect } from 'react-redux'
import {
    SelectOrderType,
    SelectLocation,
    ScheduleOrder,
    DeliveryAddress,
    Cart
} from '../components/'
import {
    getProducts
} from '../../thunks'
import {
    VIEW_SELECT_ORDER_TYPE,
    VIEW_SELECT_LOCATION,
    VIEW_DELIVERY_ADDRESS,
    VIEW_SCHEDULE_ORDER,
    VIEW_CART,
    VIEW_CHECKOUT,
    VIEW_CONFIRM,
    VIEW_COMPLETE
} from '../../constansts/'

const Pathway = props =>
{
    switch( props.view.current ) {
        case VIEW_SELECT_ORDER_TYPE:
            return <SelectOrderType {...props} />
            break;
        case VIEW_SELECT_LOCATION:
            return <SelectLocation {...props} />
            break;
        case VIEW_DELIVERY_ADDRESS:
            return <DeliveryAddress {...props} />
            break;
        case VIEW_SCHEDULE_ORDER:
            return <ScheduleOrder {...props} />
            break;
        case VIEW_CART:
            return <Cart {...props} />
        default:
            return (
                <div className="cw__error">
                    Something has gone wrong! Trying to render view <strong>{ props.view.current }</strong>
                </div>
            )
    }
}

export default connect(
    state => state
)(Pathway)