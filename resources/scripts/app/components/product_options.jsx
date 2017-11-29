import React from 'react'
import { destroy } from 'redux-form'
import { Modal, AddProductToCart } from './index'
import { hideItemOptions, FORM_ADD_PRODUCT_TO_CART } from '../../constansts'
import { getProductById } from '../../utilities'

const ProductOptions = props => {

    const {
        form,
        dispatch,
        labels,
        data: {
            show_product_options,
            products
        }
    } = props

    if( ! show_product_options )
        return null

    const product = getProductById( show_product_options, products )

    const close = event => {

        event.preventDefault()
        dispatch( hideItemOptions() )
        dispatch( destroy( FORM_ADD_PRODUCT_TO_CART ) )
    }

    return (
        <div className="cw__product_options">
            <Modal
                display_footer={false}
                heading={product.name}
                close={close}>
                <AddProductToCart
                    formData={ form[ FORM_ADD_PRODUCT_TO_CART ] ? form[ FORM_ADD_PRODUCT_TO_CART ] : null }
                    product={product}
                    labels={labels}
                    dispatch={dispatch} />
            </Modal>
        </div>
    )
}

export { ProductOptions }