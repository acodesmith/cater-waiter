import {
    ajax,
    getProductById
} from '../utilities'

export const addToCart = items =>
{
    return ajax('add_item_to_cart', items, 'POST', true, true)
}

/**
 *
 * @param items
 * @param products
 * @returns {Array}
 */
export const groupCartItemsByProductId = (items, products) =>
{
    let groups = [];

    items.forEach(item => {

        if( typeof groups[ item.product_id ] === 'undefined' ) {
            groups[ item.product_id ] = {
                product: getProductById( item.product_id, products ),
                quantity: 0,
                line_total: 0,
                items: []
            }
        }

        groups[ item.product_id ].items.push( item )
        groups[ item.product_id ].quantity +=  Number( item.quantity )
        groups[ item.product_id ].line_total +=  item.line_total
    })

    return groups
}

/**
 * Get cart contents
 */
export const getCart = () =>
{
    return ajax('cart', {}, 'GET', false, true)
}

/**
 * Remove all cart items based on the product id
 * @param product_id
 */
export const removeGroupedProduct = product_id =>
{
    return ajax('remove_grouped_product', {
        product_id: product_id
    }, 'GET', false, true)
}

/**
 * Remove cart item based on the session key
 * @param key
 */
export const removeCartItem = key =>
{
    return ajax('remove_cart_item', {
        key: key
    }, 'GET', false, true)
}

export const updateCartItems = items =>
{
    return ajax('update_cart_items', items, 'POST', true, true)
}