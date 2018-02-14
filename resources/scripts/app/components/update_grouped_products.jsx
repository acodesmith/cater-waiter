import React, { Component } from 'react'
import _ from 'lodash'
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
import { updateCartItems } from '../../thunks'
import FormUpdateCartItems from '../forms/update_cart_items'
import { MODE_EDIT } from "../../constansts/products";


class UpdateGroupedProducts extends Component{

    componentWillReceiveProps(nextProps) {

        const {
            dispatch,
            order: {
                order_cart: {
                    items = []
                }
            }
        } = nextProps

        if( ! items.length )
            dispatch( hideGroupedItemsOptions() )
    }

    render() {
        const {
            dispatch,
            data: {
                products,
                update_grouped_products,
                modal_loading,
                modal_loading_message
            },
            order: {
                order_cart: {
                    items = []
                }
            },
            labels: {
                update,
                items: items_label,
                update_cart_items,
                updating_cart
            }
        } = this.props

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
        })

        return (
            <div className="cw__update_grouped_products">
                <Modal
                    display_footer={false}
                    loading={modal_loading}
                    loading_message={modal_loading_message}
                    loading_default_message={this.props.labels.loading}
                    heading={`${_.upperFirst(update)} ${product.name} ${_.upperFirst(items_label)}`}
                    close={close}>
                    <FormUpdateCartItems
                        labels={this.props.labels}
                        items={items.filter(isPartOfGroup)}
                        product={product}
                        variations={variations}
                        mode={MODE_EDIT}
                        onSubmit={(values) => {
                            dispatch( updateCartItems( values, update_cart_items, updating_cart ) )
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

export { UpdateGroupedProducts }