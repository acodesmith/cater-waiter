/*global jQuery*/
import { militaryToStandard } from '../utilities'
import {
    api,
    ajax
} from './request'

/**
 * First get lat/long from zip code
 * Second get nonce for lat long request
 * Last get list of locations based on the lat long
 *
 * @param zip
 * @returns {Promise.<T>}
 */
export const getLocationsFromZip = zip =>
{
    //First step we get lat long from zip code.
    return api( `lat_long/${zip}` ).then(data => {

        let [ lat, lng ] = data;

        return api( 'simple_locator' ).then(nonce => {

            //Simple Locator Action
            return ajax( 'locate', {
                unit: 'miles',
                latitude: lat,
                longitude: lng,
                distance: 100,
                locatorNonce: nonce
            } )

        });

    }).catch((err) => {
        console.error(err);
    });

}

/**
 * Simple Locator is a WordPress plugin which handles radius based search.
 * To make things easier on the complicated search,
 * we parse the plugin's api html.
 *
 * @param results
 */
export const extractDataFromResults = results =>
{

    let data = [];

    results.forEach(result => {

        let $output = jQuery( result.output )
            ,distance = jQuery( 'em', $output ).text()

        data.push({
            id: result.id,
            latitude: result.latitude,
            longitude: result.longitude,
            permalink: result.permalink,
            title: result.title,
            distance: distance,
            distance_num: parseFloat( distance.replace(/[^\d+(\.\d+)]?/g, '') )
        })
    })

    return data
}

export const getLocationFromId = id =>
{
    return api( `location/${id}` )
}

/**
 * Extract nested post meta object data from location object
 *
 * @param location
 * @param order_type
 * @returns {*}
 */
export const extractWindowOfTime = (location = {}, order_type) => {

    const { post = { post_meta } } = location
    const { post_meta = {} } = post
    const {
        delivery_time_end,
        delivery_time_start,
        pickup_time_end,
        pickup_time_start
    } = post_meta;

    switch(order_type) {
        case 'delivery':
            if( delivery_time_start !== "" && delivery_time_end !== ""  )
                return [
                    delivery_time_start,
                    delivery_time_end,
                ]
            break;
        case 'pickup':
            if( pickup_time_start !== ""  && pickup_time_end !== ""  )
                return [
                    pickup_time_start,
                    pickup_time_end
                ]
            break;
    }

    // Return default value of 9am to 9pm
    return [ "9:00", "21:00"];
}

/**
 * Return error message
 *
 * @param error
 * @param minOrderTime
 * @param maxOrderTime
 * @param and
 * @returns {string}
 */
export const windowOfTimeError = (error, minOrderTime, maxOrderTime, and) => {
    return `${error} ${militaryToStandard( minOrderTime )} ${and} ${militaryToStandard( maxOrderTime )}`
}

/**
 * Set WooCommerce set session tax location id
 *
 * @param location_id
 */
export const setTaxRateBasedOnLocation = location_id => {
    return ajax('set_tax_by_location', { location_id: location_id }, 'POST', false, true)
}