import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FORM_DELIVERY_ADDRESS, US_STATES } from '../../constansts'
import { required, renderField, renderSelect } from '../../utilities'

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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
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
                        </div>
                    </div>
                    <div className="row">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-5">
                                    <Field
                                        name="delivery_address_city"
                                        component={renderField}
                                        type="text"
                                        label={'City'}
                                        className='clearfix'
                                        validate={[ required ]}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name="delivery_address_state"
                                        component={renderSelect}
                                        type="text"
                                        label={'State'}
                                        className='clearfix'
                                        validate={[ required ]}
                                        options={US_STATES}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Field
                                        name="delivery_address_zip"
                                        component={renderField}
                                        type="text"
                                        label={'Zip'}
                                        className='clearfix'
                                        validate={[ required ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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