import React from 'react'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import { required } from '../../utilities/validators'
import { renderField } from '../../utilities/form'
import { mapValue } from '../../utilities/labels'
 
const hoursInAdvanced = (hours, today, value, error) =>
{
    const minTime = moment( `${today} 00:00:00` ).add(hours, 'hours')
        , currentTime = moment( `${value} 00:00:01` )

    return ! currentTime.isAfter( minTime ) ? error : undefined
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
                component="input"
                type="time"
            />
            <button
                type="submit"
                placeholder={ button_continue }
            >
                Search
            </button>
        </form>
    )
}

export default reduxForm({
    form: 'form_schedule_order'
})(FormScheduleOrder)