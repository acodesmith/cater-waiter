import React from 'react'
import _ from 'lodash'
import numeral from 'numeral'
import { Button } from '../../elements/button_no_event'
import { removeCartItem as removeCartItemAction } from '../../../thunks'
import { showGroupedItemsOptions } from '../../../constansts'

const removeCartItem = (item_key, dispatch) => {
    const confirm_action = confirm( removing_item_from_cart_confirm )

    if( confirm_action )
        dispatch( removeCartItemAction( item_key, removing_item_from_cart, updating_cart ) )
}

export const Item = ({ product, item, labels: { currency, update }, dispatch }) => (
    <div className="cw__cart_item">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 col-sm-4">
                    <strong className="cw__product_name">
                        { product.name }
                    </strong>

                    { product.attributes.map((attr, key) => {
                        if( typeof item.variation[ attr.attribute_slug ] !== 'undefined' ) {
                            return (
                                <div key={key} className="cw__product_attributes">
                                    <span className='cw__product_attribute_name'>{attr.name}:</span>
                                    <span className='cw__product_attribute_value' dangerouslySetInnerHTML={{__html: item.variation[ attr.attribute_slug ]}}></span>
                                </div>
                            )
                        }
                    }) }
                </div>
                <div className="col-md-2 col-sm-4 text-center">{ item.quantity }</div>
                <div className="col-md-2 col-sm-4 text-right">{currency}{ numeral( item.line_total ).format('0.00') }</div>
                <div className="col-md-2">
                    <Button className="btn btn-sm btn-update" onClick={() => {
                        dispatch( showGroupedItemsOptions( product.id ) )
                    }}>{ _.upperFirst(update) }</Button>
                    <Button className="btn btn-sm close" onClick={() => removeCartItem(item.key, dispatch)}>
                        <span aria-hidden="true">&times;</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
)