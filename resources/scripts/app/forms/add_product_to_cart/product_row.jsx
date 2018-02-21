import React, { Component } from 'react'
import { Field, change } from 'redux-form'
import unescape from 'unescape'
import { arrayPush, arrayRemoveAll } from 'redux-form'
import {
    FORM_ADD_PRODUCT_TO_CART,
    MODE_ADD,
    MODE_EDIT
} from '../../../constansts'
import {
    renderSelect,
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
                    variation_id: variations.length ? variations[0].variation_id : null,
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

        const {
            meta_data: {
                _minimum_amount,
                _product_grouped_by_amount
            }
        } = product

        let row_defaults = {
            product_id: product.id,
            variation_id: variations.length ? variations[0].variation_id : null,
            quantity: 1,
        }

        if( _product_grouped_by_amount ) {
            row_defaults.quantity = _product_grouped_by_amount.value
        }

        if( _minimum_amount ) {
            row_defaults.quantity = _minimum_amount.value
        }

        dispatch( arrayPush( formId, 'items', row_defaults ) )
    }

    quantityAttrs()
    {
        const {
            product: {
                meta_data: {
                    _minimum_amount,
                    _product_grouped_by_amount
                }
            }
        } = this.props

        let attrs = { min: 1 }

        if( _product_grouped_by_amount ) {
            attrs.step = _product_grouped_by_amount.value
            attrs.min  = _product_grouped_by_amount.value
        }

        if( _minimum_amount )
            attrs.min  = _minimum_amount.value

        return attrs
    }

    setVariationId(itemIndex, newValue, attribute)
    {
        const { variations, dispatch } = this.props

        const newVariation = variations.filter(variation => {
            return typeof variation.attributeValue[ attribute ] !== 'undefined' && variation.attributeValue[ attribute ] === newValue.toLowerCase()
        })

        if( newVariation.length )
            dispatch( change( FORM_ADD_PRODUCT_TO_CART, `items[${itemIndex}].variation_id`, newVariation[0].variation_id) )
    }

    render()
    {
        const {
            variations,
            product,
            fields,
            mode = MODE_ADD,
            remove,
            labels: {
                remove: remove_label
            }
        } = this.props

        //Don't list all variations. Variations IDs are set based on the attribute values.
        const variation = variations.length ? variations[0] : null

        return fields.map((items, index) => {

            return (
                <div style={{clear: 'both'}} className="cw__variation" key={index}>
                    { mode === MODE_ADD ? null : <Field
                        name={`${items}.key`}
                        type="hidden"
                        validate={[ required ]}
                        component={renderField}
                    />}
                    <Field
                        name={`${items}.variation_id`}
                        type="hidden"
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
                    { !variation ? null : variation.attributes.map(attribute => (
                        <div className="option col-md-3" key={ attribute.attribute_slug }>
                            <label htmlFor={ attribute.attribute_slug }>{ attribute.name }</label>
                            <Field
                                name={ `${items}.${attribute.attribute_slug}` }
                                id={ attribute.attribute_slug }
                                validate={[ required ]}
                                component={renderSelect}
                                onChange={(e, newValue) => {
                                    this.setVariationId(index, newValue, attribute.attribute_slug)
                                }}
                                placeholder={attribute.name}
                                options={attribute.options.map((option, key) => {
                                    return {
                                        value: option,
                                        label: unescape( option )
                                    }
                                })}
                            />
                        </div>
                    ))}
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
    }
}

export { ProductRow }
