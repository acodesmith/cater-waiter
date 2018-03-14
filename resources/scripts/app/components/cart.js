import React from 'react'
import {
    Product,
    ProductOptions,
    UpdateGroupedProducts
} from './index'

const Cart = ({
      dispatch,
      labels,
      data: {
          grouped_products = [],
          catering_categories = [],
          show_product_options,
          update_grouped_products
      },
      ...props
  }) => (
    <div className="cw__cart">
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

export {Cart}