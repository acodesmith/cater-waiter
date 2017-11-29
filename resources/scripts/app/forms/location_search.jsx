import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FORM_LOCATION_SEARCH } from '../../constansts'
import { mapValue, required } from '../../utilities'

const FormLocationSearch = props =>
{
    const { labels: {
        label_zip_code_action,
        label_zip_code_prompt,
    } } = props

    const { settings: {
        cater_name,
    } } = props

    const { handleSubmit, pristine, reset, submitting } = props

    return (
        <form onSubmit={ handleSubmit }>
            { label_zip_code_action ?
                <label className="label_zip_code_action">{mapValue( cater_name, label_zip_code_action )}</label>
                : null
            }
            <Field
                name="zip_code"
                component="input"
                type="text"
                validate={[ required ]}
            />
            <button
                type="submit"
                placeholder={ label_zip_code_prompt }
            >
                Search
            </button>
        </form>
    )
}

export default reduxForm({
    form: FORM_LOCATION_SEARCH
})(FormLocationSearch)