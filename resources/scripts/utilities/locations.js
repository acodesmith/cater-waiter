/*global jQuery*/

import { api, ajax } from './request'

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

        data.push({
            id: result.id,
            latitude: result.latitude,
            longitude: result.longitude,
            permalink: result.permalink,
            title: result.title,
            distance: jQuery( 'em', $output ).text()
        })
    })

    return data
}

export const getLocationFromId = id =>
{
    return api( `location/${id}` )
}