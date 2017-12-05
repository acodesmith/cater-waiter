import { ajax } from './request'

export const addToCart = items =>
{
    return ajax('add_item_to_cart', items, 'POST', true, true)
}