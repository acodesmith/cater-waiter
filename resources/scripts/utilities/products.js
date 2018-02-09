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
 * Map the Product Attribute to the Product Variation Attribute.
 * Needed to correctly build custom add to cart form data.
 *
 * Ad Hoc attributes are built on the fly being stored in the terms table.
 * Standard attributes are stored in the term table and have a 1 to 1 matching pattern.
 * For example attribute_pa_shirt-color
 *
 * @param variationAttrs
 * @param productAttrs
 * @returns {Array}
 */
export const mapVariationAttributes = (variationAttrs, productAttrs) =>
{
    return Object.keys( variationAttrs ).map(key => {

        return productAttrs.filter( productAttr => {

            let semanticCheck = productAttr.attribute_slug === key
                , attributeName = key.split(/_(.+)/)[1]
                , regexPattern = `(^attribute_)(.*)(${attributeName})`
                , regex = new RegExp(regexPattern,"g")
                , adHocAttributeCheck = regex.test(productAttr.attribute_slug)

            return semanticCheck || adHocAttributeCheck
        } ).shift()
    })
}