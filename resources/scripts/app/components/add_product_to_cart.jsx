import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapVariationAttributes } from '../../utilities/index'
import FormAddProductToCart from '../forms/add_product_to_cart'

class AddProductToCart extends Component
{
    addToCart(values)
    {

        console.log("values",values);
    }

    render()
    {
        const {
            formData,
            dispatch,
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
                    onSubmit={(values) => {
                        this.addToCart(values)
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