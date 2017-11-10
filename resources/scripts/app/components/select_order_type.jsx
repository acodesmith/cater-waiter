import React from 'react'
import { batchActions } from 'redux-batched-actions'
import { map_value } from '../../utilities/labels'
import Button from '../elements/button'
import {
    VIEW_DELIVERY_ADDRESS,
    VIEW_SELECT_LOCATION,
    setCurrentScreen,
} from '../../constansts/view'
import {
    ORDER_TYPE_DELIVERY,
    ORDER_TYPE_PICKUP,
    setOrderType,
} from '../../constansts/order'

const SelectOrderType = props =>
{
    let {
        dispatch,
        labels: {
            welcome_title,
            delivery_minimum: label_delivery_minimum,
            hours_in_advance: label_hours_in_advance,
            button_pickup,
            button_delivery
    } } = props

    let { settings: {
        delivery_minimum: settings_delivery_minimum,
        hours_in_advance: settings_hours_in_advance,
    } } = props

    return (
        <section className="cw__select_order_type">
            <h2>{welcome_title}</h2>
            { label_delivery_minimum && settings_delivery_minimum ?
                <p className="cw__delivery_minimum">{ map_value( settings_delivery_minimum, label_delivery_minimum ) }</p>
                : null
            }
            { label_hours_in_advance && settings_hours_in_advance && parseFloat( settings_hours_in_advance ) ?
                <p className="cw__hours_in_advance">{ map_value( settings_hours_in_advance, label_hours_in_advance ) }</p>
                : null
            }
            <div className="cw__next_step_selector">
                <Button onClick={() => {
                    dispatch( batchActions([
                        setOrderType( ORDER_TYPE_PICKUP ),
                        setCurrentScreen( VIEW_SELECT_LOCATION ),
                    ]) );
                }}>
                    { button_pickup }
                </Button>
                <Button onClick={() => {
                    dispatch( batchActions([
                        setOrderType( ORDER_TYPE_DELIVERY ),
                        setCurrentScreen( VIEW_DELIVERY_ADDRESS ),
                    ]) );
                }}>
                    { button_delivery }
                </Button>
            </div>
        </section>
    )
}

export default SelectOrderType