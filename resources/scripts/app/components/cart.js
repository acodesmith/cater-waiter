import React, { Component } from 'react'
import {
    Product,
    ProductOptions
} from './index'

class Cart extends Component
{
    render()
    {
        let {
            dispatch,
            labels,
            data: {
                grouped_products,
                catering_categories,
                show_product_options
            }
        } = this.props

        let { catering_menu_title } = labels

        return (
            <div className="cw__cart">
                <h1>{ catering_menu_title }</h1>
                { ! show_product_options ? null : <ProductOptions {...this.props} /> }
                { ! catering_categories.length ? null : catering_categories.map(category => {
                    return (
                        <div key={category.term_id} className={`cw__category cw__category_${category.slug}`}>
                            <h3>{category.name}</h3>
                            { ! Object.keys(grouped_products).length && grouped_products[ category.slug ] ? null
                                : grouped_products[ category.slug ].map(product => {
                                return <Product
                                    key={product.id}
                                    product={product}
                                    dispatch={dispatch}
                                    labels={labels}
                                />
                            }) }
                        </div>
                    )
                }) }
            </div>
        )
    }
}

export { Cart }