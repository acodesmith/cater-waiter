import React, { Component } from 'react'
import _ from 'lodash'
import { Field, reduxForm, reset } from 'redux-form'
import moment from 'moment'
import {
    FORM_SCHEDULE_ORDER,
    ORDER_TYPE_PICKUP
} from '../../constansts'
import {
    required,
    renderField,
    mapValue,
    extractWindowOfTime,
    windowOfTimeError
} from '../../utilities'

/**
 * Confirm the selected date is a certain number of hours in advanced.
 * Currently testing at 24 hours.
 *
 * @param hours
 * @param today
 * @param value
 * @param error
 * @returns {undefined}
 */
const hoursInAdvanced = (hours, today, value, error) =>
{
    const minTime = moment( `${today} 00:00:00` ).add(hours, 'hours')
        , currentTime = moment( `${value} 00:00:01` )

    return ! currentTime.isAfter( minTime ) ? error : undefined
}

/**
 * Confirm the time value is between the min and max range.
 *
 * @param min
 * @param max
 * @param value
 * @param error
 */
const windowOfTime = (min, max, value, error) =>
{
    if( ! min && ! max )
        return undefined

    const time = Number( value.replace(':', '') )

    min = Number( min.replace(':', '') )
    max = Number( max.replace(':', '') )

    if( time < min && time !== min )
        return error

    if( time > max && time !== max )
        return error

    return undefined
}

class FormScheduleOrder extends Component
{
    componentWillReceiveProps(nextProps) {
        if (this.props.popUpState !== nextProps.popUpState) {
            this.props.initialize();
        }
    }

    render() {
        const {
            today,
            hours_in_advance,
            order_type,
            location,
            labels: {
                delivery_date_label,
                delivery_time_of_day_label,
                pickup_date_label,
                pickup_time_of_day_label,
                label_date_prompt,
                label_time_prompt,
                button_continue,
                hours_in_advance_error,
                window_of_time_error,
                and
            }
        } = this.props

        const { handleSubmit, error } = this.props

        const [ minOrderTime, maxOrderTime ] = extractWindowOfTime( location, order_type )

        const windowOfTimeErrorMessage = windowOfTimeError(mapValue( _.startCase( order_type ), window_of_time_error ), minOrderTime, maxOrderTime, and)

        return (
            <form onSubmit={ handleSubmit }>
                { error ? <div className="cw__alert">{ error }</div> : null }
                <Field
                    name="order_date"
                    placeholder={label_date_prompt}
                    component={renderField}
                    type="date"
                    className="cw__order_schedule_field cw__order_schedule_date"
                    label={ order_type === ORDER_TYPE_PICKUP ? pickup_date_label : delivery_date_label }
                    hint="Format Example: 01/01/2020"
                    validate={[ required, function(value) {
                        return hoursInAdvanced(
                            hours_in_advance,
                            today,
                            value,
                            mapValue( hours_in_advance, hours_in_advance_error )
                        )
                    }]}
                />
                <Field
                    name="order_time"
                    placeholder={label_time_prompt}
                    component={renderField}
                    type="time"
                    className="cw__order_schedule_field cw__order_schedule_time_of_day"
                    label={ order_type === ORDER_TYPE_PICKUP ? pickup_time_of_day_label : delivery_time_of_day_label }
                    hint="Format Example: 10:00 AM"
                    validate={[ required, function(value) {
                        return windowOfTime(
                            minOrderTime,
                            maxOrderTime,
                            value,
                            windowOfTimeErrorMessage
                        )
                    }  ]}
                />
                <button
                    type="submit">
                    { button_continue }
                </button>
            </form>
        )
    }
}

export default reduxForm({
    form: FORM_SCHEDULE_ORDER,
    destroyOnUnmount: false,
})(FormScheduleOrder)