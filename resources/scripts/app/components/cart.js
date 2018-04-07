import React from 'react'
import ReactDOM from 'react-dom'
import Sticky from 'react-sticky-el'
import {
    Product,
    ProductOptions,
    UpdateGroupedProducts
} from './index'
import { Button } from '../elements/button_no_event'

let cw__cart_ref = null;

const Cart = props => {

    const {
        dispatch,
        labels,
        data: {
            grouped_products = [],
            catering_categories = [],
            show_product_options,
            update_grouped_products
        },
    } = props

    const { order_details_title } = labels

    return (
        <div
            className="cw__cart"
            ref={node => {
                if(!cw__cart_ref){
                    cw__cart_ref = node;
                }
            }}
        >
            <Sticky hideOnBoundaryHit={true} boundaryElement=".cw__cart">
                <div className="cw__order_details_mobile">
                    <Button onClick={() => {
                        if(cw__cart_ref){

                            const rect = ReactDOM.findDOMNode(cw__cart_ref)
                                .getBoundingClientRect();

                            window.t = rect;
                            window.scrollTo(0, rect.height + ( window.innerHeight/ 2 ));
                        }
                    }}>Jump to { order_details_title }</Button>
                </div>
            </Sticky>
            {!update_grouped_products ? null : <UpdateGroupedProducts {...props}/>}
            {!show_product_options ? null : <ProductOptions {...props} />}
            {catering_categories && catering_categories.length && catering_categories.map(category => (
                <div key={category.term_id} className={`cw__category cw__category_${category.slug} clearfix`}>
                    <h3>{category.name}</h3>
                    {Object.keys(grouped_products).length
                    && grouped_products[category.slug] &&
                    grouped_products[category.slug].map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            dispatch={dispatch}
                            labels={labels}
                        />
                    ))
                    }
                </div>
            ))}
        </div>
    )
}

export {Cart}