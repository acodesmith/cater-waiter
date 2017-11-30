import { ajax } from './request'

export const addToCart = items =>
{
    ajax('add_item_to_cart', items, 'POST', true, true)
        .then(data => {
            console.log("data",data);
        })
}