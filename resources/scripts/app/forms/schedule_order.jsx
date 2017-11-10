import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { map_value } from '../../utilities/labels'

const FormScheduleOrder = props =>
{
    const { labels: {
        label_date_prompt,
        label_time_prompt,
        button_continue
    } } = props

    const { handleSubmit, pristine, reset, submitting } = props

    return (
        <form onSubmit={ handleSubmit }>
            <Field name="order_date" placeholder={label_date_prompt} component="input" type="date" />
            <Field name="order_time" placeholder={label_time_prompt} component="input" type="time" />
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