import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FORM_DELIVERY_ADDRESS } from '../../constansts'
import { required, renderField } from '../../utilities'

const FormDeliverAddress = props =>
{
    const {
        labels: {
            button_continue,
        }
    } = props

    const { handleSubmit, error } = props

    return (
        <form onSubmit={ handleSubmit }>
            { error ? <div className="cw__alert cw__alert_error">{ error }</div> : null }
            <div className="clearfix">
                <Field
                    name="delivery_address_line_one"
                    placeholder={'Address Line One'}
                    component={renderField}
                    type="text"
                    label={'Address'}
                    className='cw__delivery_address_address_line_one clearfix'
                    validate={[ required ]}
                />
                <Field
                    name="delivery_address_line_two"
                    placeholder={'Address Line Two'}
                    className='cw__delivery_address_address_line_two clearfix'
                    component={renderField}
                    type="text"
                />
                <Field
                    name="delivery_address_city"
                    component={renderField}
                    type="text"
                    label={'City'}
                    className='clearfix'
                    validate={[ required ]}
                />
                <Field
                    name="delivery_address_state"
                    component={renderField}
                    type="text"
                    label={'State'}
                    className='clearfix'
                    validate={[ required ]}
                />
                <Field
                    name="delivery_address_zip"
                    component={renderField}
                    type="text"
                    label={'Zip'}
                    className='clearfix'
                    validate={[ required ]}
                />
            </div>
            <div className="cw__form_button">
                <button
                    type="submit" >
                    { button_continue }
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: FORM_DELIVERY_ADDRESS,
    destroyOnUnmount: false,
})(FormDeliverAddress)