import React, { Component } from 'react'
import _ from 'lodash'
import { setSubmitFailed, untouch } from 'redux-form'
import { mapValue } from '../../utilities/'
import FormScheduleOrder from '../forms/schedule_order'
import {
    setCurrentScreen,
    setOrderTime,
    VIEW_CART,
    FORM_SCHEDULE_ORDER
} from '../../constansts/'

class ScheduleOrder extends Component
{
    submit = values =>
    {
        const { dispatch } = this.props

        dispatch( setOrderTime( values ) )
        dispatch( setCurrentScreen( VIEW_CART ) )
    }

    render()
    {
        const {
            labels,
            order: {
                order_type
            },
            settings: {
                hours_in_advance: settings_hours_in_advance
            },
            data: {
                location,
                dates: {
                    today
                }
            }
        } = this.props

        const {
            schedule_order_title,
            hours_in_advance: label_hours_in_advance
        } = labels

        const formProps = {
            today,
            hours_in_advance: settings_hours_in_advance,
            labels,
            location,
            order_type
        }

        return (
            <div className="cw__schedule_order">
                <h1>{ mapValue( _.capitalize( order_type ), schedule_order_title ) }</h1>
                { label_hours_in_advance && settings_hours_in_advance ?
                    <p className="cw__delivery_minimum">{ mapValue( settings_hours_in_advance, label_hours_in_advance ) }</p>
                    : null
                }
                <FormScheduleOrder onSubmit={this.submit} {...formProps} />
            </div>
        )
    }
}

export { ScheduleOrder }