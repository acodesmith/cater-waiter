import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapVariationAttributes } from '../../utilities'
import FormAddProductToCart from '../forms/add_product_to_cart'
import { addToCart } from '../../thunks'
import { MODE_ADD } from '../../constansts'

class AddProductToCart extends Component
{
    addToCart(values, closeModal)
    {
        const { items = [] } = values

        const {
            dispatch,
            labels: {
                adding_items_to_cart
            },
            order
        } = this.props

        if( items.length  ) {
            dispatch( addToCart( items, adding_items_to_cart, closeModal, order ) )
        }
    }

    render()
    {
        const {
            formData,
            labels,
            product
        } = this.props

        let { variations = [] } = product

        variations = variations.map(variation => {
            return Object.assign({}, variation, {
                attributes: mapVariationAttributes( variation.attributes, product.attributes )
            })
        });

        return (
            <div className="cw__add_product_to_cart">
                <FormAddProductToCart
                    product={product}
                    variations={variations}
                    labels={labels}
                    formData={formData}
                    mode={MODE_ADD}
                    onSubmit={(values) => {
                        this.addToCart(values, this.props.closeModal)
                    }}
                />
            </div>
        )
    }
}

AddProductToCart.propTypes = {
    product: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export { AddProductToCart }