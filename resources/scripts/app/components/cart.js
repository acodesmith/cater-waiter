import React from 'react'
import {
    Product,
    ProductOptions,
    UpdateGroupedProducts
} from './index'

const Cart = props => {

    const {
        dispatch,
        labels: {
            catering_menu_title
        },
        data: {
            grouped_products,
            catering_categories,
            show_product_options,
            update_grouped_products
        }
    } = props

    return (
        <div className="cw__cart">
            {/*<h1>{catering_menu_title}</h1>*/}
            {!update_grouped_products ? null : <UpdateGroupedProducts {...props}/>}
            {!show_product_options ? null : <ProductOptions {...props} />}
            {!catering_categories.length ? null : catering_categories.map(category => {
                return (
                    <div key={category.term_id} className={`cw__category cw__category_${category.slug}`}>
                        <h3>{category.name}</h3>
                        {!Object.keys(grouped_products).length && grouped_products[category.slug] ? null
                            : grouped_products[category.slug].map(product => {
                                return <Product
                                    key={product.id}
                                    product={product}
                                    dispatch={dispatch}
                                    labels={props.labels}
                                />
                            })}
                    </div>
                )
            })}
        </div>
    )
}

export { Cart }