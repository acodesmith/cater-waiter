import React, { Component } from 'react'
import _ from 'lodash'
import { Field } from 'redux-form'
import unescape from 'unescape'
import { arrayPush, arrayRemoveAll } from 'redux-form'
import {
    FORM_ADD_PRODUCT_TO_CART,
    MODE_ADD,
    MODE_EDIT
} from '../../../constansts'
import {
    renderField,
    required,
    minNumericValueOne
} from '../../../utilities'

class ProductRow extends Component
{
    componentDidMount()
    {
        const {
            mode = MODE_ADD,
            fields: {
                length
            },
        } = this.props

        if( ! length && mode === MODE_ADD )
            this.addFirstDefaultRow()
        else if( mode === MODE_EDIT )
            this.addCartItems()
    }

    addCartItems()
    {
        const {
            dispatch,
            product,
            variations,
            items,
            formId = FORM_ADD_PRODUCT_TO_CART
        } = this.props

        dispatch( arrayRemoveAll( formId, 'items') )

        items.map(item => {
            dispatch(
                arrayPush( formId, 'items', Object.assign({}, {
                    product_id: product.id,
                    variation_id: variations[0].variation_id,
                    quantity: item.quantity,
                    key: item.key
                }, item.variation) )
            )
        })
    }

    addFirstDefaultRow()
    {
        const {
            dispatch,
            product,
            variations,
            formId = FORM_ADD_PRODUCT_TO_CART
        } = this.props

        dispatch(
            arrayPush( formId, 'items', {
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
            mode = MODE_ADD,
            labels: {
                remove
            }
        } = this.props

        return fields.map((items, index) => {

            return variations.map((variation, variationIndex) => {

                let attributes = variation.attributes;

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
                        { index < 1 && mode !== MODE_EDIT ? null : <button className="option col-md-3" onClick={() => fields.remove(index)}>
                            { remove }
                        </button> }
                    </div>
                )
            })
        })
    }
}

export { ProductRow }
