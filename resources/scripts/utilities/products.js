/**
 * @param id
 * @param products
 * @returns {*}
 */
export const getProductById = (id, products = []) =>
{
    return products.filter(product => product.id === id).shift()
}

/**
 * @param variationAttrs
 * @param productAttrs
 * @returns {Array}
 */
export const mapVariationAttributes = (variationAttrs, productAttrs) =>
{
    return Object.keys( variationAttrs ).map(key => {
        return productAttrs.filter( productAttr => productAttr.attribute_slug === key ).shift()
    })
}