import React, { Component } from 'react'
import { Field } from 'redux-form'
import unescape from 'unescape'
import { arrayPush, } from 'redux-form'
import { FORM_ADD_PRODUCT_TO_CART } from '../../../constansts'
import { renderField, required, minNumericValueOne } from '../../../utilities'

class ProductRow extends Component
{
    componentDidMount()
    {
        const {
            dispatch,
            product,
            variations,
            fields: {
                length
            },
        } = this.props

        if( ! length )
            dispatch(
                arrayPush( FORM_ADD_PRODUCT_TO_CART, 'items', {
                    product_id: product.id,
                    variation_id: variations[0].variation_id,
                    quantity: 1,
                } )
            )
    }

    render()
    {
        let {
            variations,
            product,
            fields,
            remove
        } = this.props

        return fields.map((items, index) => {

            return variations.map((variation, variationIndex) => {
                return (
                    <div style={{clear: 'both'}} className="cw__variation" key={variationIndex}>
                        <Field
                            name={`${items}.variation_id`}
                            type="hidden"
                            value={variation.variation_id}
                            validate={[ required ]}
                            component={renderField}
                        />
                        <Field
                            name={`${items}.product_id`}
                            type="hidden"
                            value={product.id}
                            validate={[ required ]}
                            component={renderField}
                        />
                        <Field
                            name={`${items}.quantity`}
                            label="Quantity"
                            type="number"
                            className="col-md-3"
                            validate={[ required, minNumericValueOne ]}
                            attr={{ min: 1 }}
                            component={renderField} />
                        {variation.attributes.map(attribute => {
                            return (
                                <div className="option col-md-3" key={ attribute.id }>
                                    <label htmlFor={ attribute.attribute_slug }>{ attribute.name }</label>
                                    <Field
                                        name={ `${items}.${attribute.attribute_slug}` }
                                        id={ attribute.attribute_slug }
                                        validate={[ required ]}
                                        type="select"
                                        component={renderField}>
                                        <option value="">Select { attribute.name }</option>
                                        { ! attribute.options ? null : attribute.options.map((option, key) => {
                                            return <option key={key} value={option}>{ unescape( option ) }</option>
                                        }) }
                                    </Field>
                                </div>
                            )
                        })}
                        { index < 1 ? null : <button className="option col-md-3" onClick={() => fields.remove(index)}>
                            remove
                        </button> }
                    </div>
                )
            })
        })
    }
}

export { ProductRow }
