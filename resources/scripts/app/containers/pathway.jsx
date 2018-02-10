import React from 'react'
import { connect } from 'react-redux'
import {
    SelectOrderType,
    SelectLocation,
    ScheduleOrder,
    DeliveryAddress,
    Cart,
    Confirm,
    Notifications
} from '../components/'
import {
    VIEW_SELECT_ORDER_TYPE,
    VIEW_SELECT_LOCATION,
    VIEW_DELIVERY_ADDRESS,
    VIEW_SCHEDULE_ORDER,
    VIEW_CART,
    VIEW_CONFIRM
} from '../../constansts/'

let Pathway = props =>
{

    const {
        dispatch,
        data: {
            notifications = []
        },
        view: {
            current
        }
    } = props

    const page_with_sidebar = [ VIEW_CART ]

    const wrapper_class = page_with_sidebar.indexOf( current ) === -1 ? "col-md-12" : "col-md-8"

    return (
        <div className={ wrapper_class }>
            <Notifications notifications={notifications} dispatch={dispatch} />
            {(()=>{
                switch( current ) {
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
                    case VIEW_CONFIRM:
                        return <Confirm {...props} />
                    default:
                        return (
                            <div className="cw__error">
                                Something has gone wrong! Trying to render view <strong>{ props.view.current }</strong>
                            </div>
                        )
                }
            })()}
        </div>
    )
}

Pathway = connect(
    state => state
)(Pathway)

export { Pathway }