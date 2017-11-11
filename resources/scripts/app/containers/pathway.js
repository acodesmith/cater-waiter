import React, { Component } from 'react'
import { connect } from 'react-redux'
//import {  } from '../../constansts/view'
import SelectOrderType from '../components/select_order_type'
import SelectLocation from '../components/select_location'
import ScheduleOrder from '../components/schedule_order'
import {
    VIEW_SELECT_ORDER_TYPE,
    VIEW_SELECT_LOCATION,
    VIEW_DELIVERY_ADDRESS,
    VIEW_SCHEDULE_ORDER,
    VIEW_CART,
    VIEW_CHECKOUT,
    VIEW_CONFIRM,
    VIEW_COMPLETE
} from '../../constansts/view'

const Pathway = props =>
{
    switch( props.view.current ) {
        case VIEW_SELECT_ORDER_TYPE:
            return <SelectOrderType {...props} />
            break;
        case VIEW_SELECT_LOCATION:
            return <SelectLocation {...props} />
            break;
        case VIEW_SCHEDULE_ORDER:
            return <ScheduleOrder {...props} />
            break;
        default:
            return <div className="cw__error">Something has gone wrong! Trying to render view { props.view.current }</div>
    }
}

export default connect(
    state => state
)(Pathway)