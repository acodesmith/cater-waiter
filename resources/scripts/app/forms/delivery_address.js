import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utilities/validators'
import { renderField } from '../../utilities/form'
import { mapValue } from '../../utilities/labels'

const FormDeliverAddress = props =>
{
    const {
        labels: {
            button_continue,
        }
    } = props

    const { handleSubmit, pristine, reset, submitting, error } = props

    return (
        <form onSubmit={ handleSubmit }>
            { error ? <div className="cw__alert cw__alert_error">{ error }</div> : null }
            <Field
                name="delivery_address_line_one"
                placeholder={'Address Line One'}
                component={renderField}
                type="text"
                label={'Address'}
                validate={[ required ]}
            />
            <Field
                name="delivery_address_line_two"
                placeholder={'Address Line Two'}
                component={renderField}
                type="text"
            />
            <Field
                name="delivery_address_city"
                component={renderField}
                type="text"
                label={'City'}
                validate={[ required ]}
            />
            <Field
                name="delivery_address_state"
                component={renderField}
                type="text"
                label={'State'}
                validate={[ required ]}
            />
            <Field
                name="delivery_address_zip"
                component={renderField}
                type="text"
                label={'Zip'}
                validate={[ required ]}
            />
            <button
                type="submit" >
                { button_continue }
            </button>
        </form>
    )
}

export default reduxForm({
    form: 'form_delivery_address'
})(FormDeliverAddress)