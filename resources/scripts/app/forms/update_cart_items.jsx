import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    FieldArray,
    reduxForm,
    arrayPush,
    arrayRemoveAll
} from 'redux-form'
import {
    FORM_UPDATE_CART_ITEMS,
    MODE_EDIT
} from '../../constansts'
import { removeCartItem } from '../../thunks'
import { ProductRow } from './add_product_to_cart/product_row'
import { TotalRow } from './add_product_to_cart/total_row'


class FormUpdateCartItems extends Component
{
    constructor(props)
    {
        super(props)
        this.removeRow = this.removeRow.bind(this)
    }

    state = {
        rows: 1
    }

    componentWillUnmount()
    {
        this.props.dispatch(
            arrayRemoveAll( FORM_UPDATE_CART_ITEMS, 'items' )
        )
    }

    addRow()
    {
        const {
            product,
            variations,
        } = this.props

        this.props.dispatch(
            arrayPush( FORM_UPDATE_CART_ITEMS, 'items', {
                product_id: product.id,
                variation_id: variations[0].variation_id,
                quantity: 1,
            } )
        )
    }

    removeRow(item, index)
    {
        const {
            dispatch,
            labels: {
                removing_item_from_cart,
                update_cart_items
            }
        } = this.props

        const { key } = item

        if( key )
            dispatch( removeCartItem( key, index, removing_item_from_cart, update_cart_items ) )
        else
            console.warn('Trying to remove item from cart with missing session key information.')
    }

    render()
    {
        const {
            items,
            dispatch,
            formData,
            product,
            variations,
            handleSubmit,
            labels: {
                update_cart_items
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
                            remove={this.removeRow}
                            mode={MODE_EDIT}
                            items={items}
                            rows={rows}
                            labels={this.props.labels}
                            formId={FORM_UPDATE_CART_ITEMS}
                        />
                    </div>
                    { rows < 2 ? null : <TotalRow formData={formData} /> }
                    <div className="row">
                        <div className="col-sm-12">
                            <hr/>
                            <button
                                className="pull-right"
                                type="submit" >
                                { update_cart_items }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

FormUpdateCartItems.propTpyes = {
    product: PropTypes.object.isRequired,
    variations: PropTypes.array.isRequired,
}

export default reduxForm({
    form: FORM_UPDATE_CART_ITEMS,
})(FormUpdateCartItems)