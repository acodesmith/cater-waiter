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

        const groupedByAmount = this.productGroupedByAmount()

        let row_defaults = {
            product_id: product.id,
            variation_id: variations[0].variation_id,
            quantity: 1,
        }

        if( groupedByAmount ) {
            row_defaults.quantity = groupedByAmount.value
        }

        dispatch(
            arrayPush( formId, 'items', row_defaults )
        )
    }

    productGroupedByAmount()
    {
        const {
            product: {
                meta_data: {
                    _product_grouped_by_amount
                }
            }
        } = this.props

        return _product_grouped_by_amount
    }

    quantityAttrs()
    {
        let attrs = { min: 1 },
            groupedByAmount = this.productGroupedByAmount()

        if( groupedByAmount ) {
            attrs.step = groupedByAmount.value
            attrs.min  = groupedByAmount.value
        }

        return attrs
    }

    render()
    {
        let {
            variations,
            product,
            fields,
            mode = MODE_ADD,
            remove,
            labels: {
                remove: remove_label
            }
        } = this.props

        return fields.map((items, index) => {

            return variations.map((variation, variationIndex) => {

                return (
                    <div style={{clear: 'both'}} className="cw__variation" key={variationIndex}>
                        { mode === MODE_ADD ? null : <Field
                            name={`${items}.key`}
                            type="hidden"
                            validate={[ required ]}
                            component={renderField}
                        />}
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
                            attr={this.quantityAttrs()}
                            component={renderField} />
                        {variation.attributes.map(attribute => {
                            console.log("attribute",attribute);
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
                        { index < 1 && mode !== MODE_EDIT ? null : <button className="option col-md-3" onClick={event => {

                            event.preventDefault()

                            if( ! remove )
                                fields.remove(index)
                            else
                                remove(this.props.items[index], index)
                        }}>
                            { remove_label }
                        </button> }
                    </div>
                )
            })
        })
    }
}

export { ProductRow }
