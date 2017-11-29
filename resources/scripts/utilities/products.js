import { api } from './request'

export const getProducts = () =>
{
    //First step we get lat long from zip code.
    return api( 'products' ).then(data => {

        return data

    }).catch((err) => {
        console.error(err);
    });

}

export const getProductById = (id, products = []) =>
{
    return products.filter(product => product.id === id).shift()
}

export const mapVariationAttributes = (variationAttrs, productAttrs) =>
{
    return Object.keys( variationAttrs ).map(key => {
        return productAttrs.filter( productAttr => productAttr.attribute_slug === key ).shift()
    })
}