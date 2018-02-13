import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    FieldArray,
    reduxForm,
    arrayPush,
    arrayRemoveAll
} from 'redux-form'
import { FORM_ADD_PRODUCT_TO_CART } from '../../constansts'
import { ProductRow } from './add_product_to_cart/product_row'
import { TotalRow } from './add_product_to_cart/total_row'


class FormAddProductToCart extends Component
{
    state = {
        rows: 1
    }

    componentWillUnmount()
    {
        this.props.dispatch(
            arrayRemoveAll( FORM_ADD_PRODUCT_TO_CART, 'items' )
        )
    }

    rowDefaults()
    {
        const {
            product,
            variations,
        } = this.props

        let data = {
            product_id: product.id,
            variation_id: variations[0].variation_id,
            quantity: 1,
        }

        const {
            meta_data: {
                _product_grouped_by_amount
            }
        } = product

        if( _product_grouped_by_amount ) {

            data.quantity  = _product_grouped_by_amount.value
        }

        return data
    }

    addRow()
    {
        this.props.dispatch(
            arrayPush( FORM_ADD_PRODUCT_TO_CART, 'items', this.rowDefaults() )
        )
    }

    render()
    {
        const {
            dispatch,
            formData,
            product,
            variations,
            handleSubmit,
            labels: {
                add_to_cart_button,
                add_more_button
            }
        } = this.props

        const { rows } = this.state

        return (
            <form onSubmit={ handleSubmit }>
                <div className="container-fluid">
                    <div className="product-variations-wrap">
                        <FieldArray
                            dispatch={dispatch}
                            name={'items'}
                            component={ProductRow}
                            variations={variations}
                            product={product}
                            rows={rows}
                            labels={this.props.labels}
                            formData={formData}
                        />
                    </div>
                    { rows < 2 ? null : <TotalRow formData={formData} /> }
                    <div className="row">
                        <div className="col-sm-12">
                            <hr/>
                            <button
                                className="pull-left"
                                type="button"
                                onClick={() => {
                                    this.addRow()
                                }}>
                                { add_more_button } +
                            </button>
                            <button
                                className="pull-right"
                                type="submit" >
                                { add_to_cart_button }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

FormAddProductToCart.propTpyes = {
    product: PropTypes.object.isRequired,
    variations: PropTypes.array.isRequired,
}

export default reduxForm({
    form: FORM_ADD_PRODUCT_TO_CART,
})(FormAddProductToCart)