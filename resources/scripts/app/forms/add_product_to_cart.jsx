import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FieldArray, reduxForm, arrayPush, arrayRemoveAll } from 'redux-form'
import { FORM_ADD_PRODUCT_TO_CART } from '../../constansts'
import { ProductRow } from './add_product_to_cart/product_row'
import { TotalRow } from './add_product_to_cart/total_row'


class FormAddProductToCart extends Component
{
    state = {
        rows: 1
    }
    
    componentDidMount()
    {
        const {
            product,
            variations,
        } = this.props

        this.props.dispatch(
            arrayPush( FORM_ADD_PRODUCT_TO_CART, 'items', {
                product_id: product.id,
                variation_id: variations[0].variation_id
            } )
        )
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        this.props.dispatch(
            arrayRemoveAll( FORM_ADD_PRODUCT_TO_CART, 'items' )
        )
    }

    addRow()
    {
        const {
            product,
            variations,
        } = this.props

        this.props.dispatch(
            arrayPush( FORM_ADD_PRODUCT_TO_CART, 'items', {
                product_id: product.id,
                variation_id: variations[0].variation_id
            } )
        )
    }

    render()
    {
        const {
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
                    <FieldArray
                        name={'items'}
                        component={ProductRow}
                        variations={variations}
                        product={product}
                        rows={rows}
                    />
                    { rows < 2 ? null : <TotalRow formData={formData} />}
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