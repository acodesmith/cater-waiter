import React from 'react'
import { destroy } from 'redux-form'
import { Modal, AddProductToCart } from './index'
import { hideGroupedItemsOptions, FORM_ADD_PRODUCT_TO_CART } from '../../constansts'
import { getProductById } from '../../utilities'

const UpdateGroupedProducts = props => {

    const {
        dispatch,
        data: {
            update_grouped_products
        }
    } = props

    const close = event => {
        event.preventDefault()
        dispatch( hideGroupedItemsOptions() )
        //dispatch( destroy( FORM_ADD_PRODUCT_TO_CART ) )
    }

    console.log("update_grouped_products",update_grouped_products);

    return (
        <div className="cw__update_grouped_products">
            <Modal close={close}>
                { update_grouped_products }
            </Modal>
        </div>
    )
}

export { UpdateGroupedProducts }