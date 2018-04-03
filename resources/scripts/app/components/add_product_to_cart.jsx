import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapVariationAttributes } from '../../utilities'
import FormAddProductToCart from '../forms/add_product_to_cart'
import { addToCartAction } from '../../thunks'
import { MODE_ADD } from '../../constansts'


const addToCart = (values, props) => {
    const { items = [] } = values

    const {
        dispatch,
        labels: {
            adding_items_to_cart
        },
        order,
        closeModal
    } = props

    if( items.length  ) {
        dispatch( addToCartAction( items, adding_items_to_cart, closeModal, order ) )
    }
}

const AddProductToCart = props => {
    const {
        formData,
        labels,
        product = { variations: [] }
    } = props

    return (
        <div className="cw__add_product_to_cart">
            <FormAddProductToCart
                product={product}
                labels={labels}
                formData={formData}
                mode={MODE_ADD}
                onSubmit={(values) => {
                    addToCart(values, props)
                }}
                variations={product.variations.map(variation => ({
                    ...variation,
                    attributes: mapVariationAttributes( variation.attributes, product.attributes ),
                    attributeValue: variation.attributes,
                }))}
            />
        </div>
    )
}

AddProductToCart.propTypes = {
    product: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export { AddProductToCart }