import React, { Component } from 'react'
import _ from 'lodash'
import { mapValue } from '../../utilities/labels'
import FormScheduleOrder from '../forms/schedule_order'

export default class ScheduleOrder extends Component
{
    submit = (values) =>
    {


        console.log("submit values",values);
    }

    render()
    {
        let {
            labels,
            order: {
                order_type,
                order_pickup_time
            },
            settings: {
                hours_in_advance: settings_hours_in_advance
            },
            data: {
                dates: {
                    today
                }
            }
        } = this.props

        let {
            schedule_order_title,
            hours_in_advance: label_hours_in_advance
        } = labels

        let formProps = {
            today,
            hours_in_advance: settings_hours_in_advance,
            labels
        }

        return (
            <div className="cw__schedule_order">
                <h1>{ mapValue( _.capitalize( order_type ), schedule_order_title ) }</h1>
                { label_hours_in_advance && settings_hours_in_advance ?
                    <p className="cw__delivery_minimum">{ mapValue( settings_hours_in_advance, label_hours_in_advance ) }</p>
                    : null
                }
                <FormScheduleOrder onSubmit={ this.submit } {...formProps} />
            </div>
        )
    }
}