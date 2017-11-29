import React, { Component } from 'react'
import { Field } from 'redux-form'
import unescape from 'unescape'
import { renderField, required, minNumericValueOne } from '../../../utilities'

class ProductRow extends Component
{
    addRow()
    {
    }

    removeRow(index)
    {
        //splice function
    }

    render()
    {
        let {
            variations,
            product,
            fields,
        } = this.props

        return fields.map((value, index) => {

            return variations.map((variation, variationIndex) => {
                return (
                    <div style={{clear: 'both'}} className="cw__variation" key={variationIndex}>
                        <Field
                            name={`variation_id[${index}]`}
                            type="hidden"
                            value={variation.variation_id}
                            validate={[ required ]}
                            component={renderField}
                        />
                        <Field
                            name={`product_id[${index}]`}
                            type="hidden"
                            value={product.id}
                            validate={[ required ]}
                            component={renderField}
                        />
                        <Field
                            name={`quantity[${index}]`}
                            label="Quantity"
                            type="number"
                            className="col-md-4"
                            validate={[ required, minNumericValueOne ]}
                            attr={{ min: 1 }}
                            component={renderField} />
                        {variation.attributes.map(attribute => {
                            return (
                                <div className="option col-md-4" key={ attribute.id }>
                                    <label htmlFor={ attribute.attribute_slug }>{ attribute.name }</label>
                                    <Field
                                        name={ `${attribute.attribute_slug}[${index}]` }
                                        id={ attribute.attribute_slug }
                                        validate={[ required ]}
                                        component="select">
                                        <option value="">Select { attribute.name }</option>
                                        { ! attribute.options ? null : attribute.options.map((option, key) => {
                                            return <option key={key} value={option}>{ unescape( option ) }</option>
                                        }) }
                                    </Field>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        })
    }
}

export { ProductRow }