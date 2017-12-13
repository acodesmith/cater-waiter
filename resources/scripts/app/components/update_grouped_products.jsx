import React from 'react'
import _ from 'lodash'
import { destroy } from 'redux-form'
import {
    Modal
} from './index'
import {
    hideGroupedItemsOptions
} from '../../constansts'
import {
    getProductById,
    mapVariationAttributes
} from '../../utilities'
import FormUpdateCartItems from '../forms/update_cart_items'
import {MODE_EDIT} from "../../constansts/products";

const UpdateGroupedProducts = props => {

    const {
        dispatch,
        data: {
            products,
            update_grouped_products
        },
        order: {
            order_cart: {
                items = []
            }
        },
        labels: {
            update,
            items: items_label
        }
    } = props

    const close = event => {
        event.preventDefault()
        dispatch( hideGroupedItemsOptions() )
    }

    const isPartOfGroup = item => item.product_id === update_grouped_products
        , product = getProductById( update_grouped_products, products )

    const variations = product.variations.map(variation => {
        return Object.assign({}, variation, {
            attributes: mapVariationAttributes( variation.attributes, product.attributes )
        })
    });

    return (
        <div className="cw__update_grouped_products">
            <Modal
                heading={`${_.upperFirst(update)} ${product.name} ${_.upperFirst(items_label)}`}
                close={close}>
                <FormUpdateCartItems
                    labels={props.labels}
                    items={items.filter(isPartOfGroup)}
                    product={product}
                    variations={variations}
                    mode={MODE_EDIT}
                    onSubmit={(values) => {
                        console.log("values",values);
                    }}
                />
            </Modal>
        </div>
    )
}

export { UpdateGroupedProducts }