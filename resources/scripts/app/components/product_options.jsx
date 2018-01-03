import React from 'react'
import { destroy } from 'redux-form'
import { Modal, AddProductToCart } from './index'
import { hideItemOptions, FORM_ADD_PRODUCT_TO_CART } from '../../constansts'
import {
    getProductById,
    formatCurrency
} from '../../utilities'

function getHeading(product, currency) {

    const {
        meta_data: {
            _product_custom_price_label
        }
    } = product

    let heading = product.name

    if( _product_custom_price_label ) {
        heading = `${heading} ${_product_custom_price_label.value}`
    }else{
        heading = `${heading} ${ formatCurrency( product.price, currency )}`
    }

    return heading
}

const ProductOptions = props => {

    const {
        form,
        dispatch,
        labels,
        data: {
            show_product_options,
            products,
            modal_loading,
            modal_loading_message
        },
        order
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
                loading={modal_loading}
                loading_message={modal_loading_message}
                loading_default_message={labels.loading}
                heading={ getHeading( product, labels.currency ) }
                close={close}>
                <AddProductToCart
                    formData={ form[ FORM_ADD_PRODUCT_TO_CART ] ? form[ FORM_ADD_PRODUCT_TO_CART ] : null }
                    product={product}
                    labels={labels}
                    closeModal={close}
                    order={order}
                    dispatch={dispatch} />
            </Modal>
        </div>
    )
}

export { ProductOptions }