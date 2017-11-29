import React from 'react'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import { FORM_SCHEDULE_ORDER } from '../../constansts'
import { required, renderField, mapValue } from '../../utilities'

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

}

const FormScheduleOrder = props =>
{
    const {
        today,
        hours_in_advance,
        labels: {
            label_date_prompt,
            label_time_prompt,
            button_continue,
            hours_in_advance_error
        }
    } = props

    const { handleSubmit, pristine, reset, submitting, error } = props

    return (
        <form onSubmit={ handleSubmit }>
            { error ? <div className="cw__alert">{ error }</div> : null }
            <Field
                name="order_date"
                placeholder={label_date_prompt}
                component={renderField}
                type="date"
                validate={[ required, function(value) {
                    return hoursInAdvanced(
                        hours_in_advance,
                        today,
                        value,
                        mapValue( hours_in_advance, hours_in_advance_error )
                    )
                } ]}
            />
            <Field
                name="order_time"
                placeholder={label_time_prompt}
                component={renderField}
                type="time"
                validate={[ required ]}
            />
            <button
                type="submit">
                { button_continue }
            </button>
        </form>
    )
}

export default reduxForm({
    form: FORM_SCHEDULE_ORDER
})(FormScheduleOrder)