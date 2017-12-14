/*global jQuery*/
let { request } = cw__config;

request.ajax.baseurl = request.ajax.baseurl.replace( request.ajax.site_url, '' )

/**
 * Interact with the WordPress Rest API
 *
 * @param action
 * @param data
 * @param method
 */
export const api = (action,data=null,method = 'GET') => {
    return fetch(
        `${ request.api.baseurl }/${ action }`,
        {
            method: method,
            body: data ? data : undefined,
        }
    ).then((res) => res.json())
    .catch((err) => console.error(err))
};

/**
 * Interact with the WordPress Admin Ajax page
 *
 * @param action
 * @param data
 * @param method
 * @param json_data
 * @param cookies
 */
export const ajax = ( action, data, method = 'POST', json_data = false, cookies = false) => {

    let request_data = '';

    if( ! json_data )
        Object.keys( data ).forEach((key) => {
            request_data = `${ request_data }&${ key }=${ data[key] }`
        })

    if( ! cookies )
        return fetch(
            `${request.ajax.baseurl}/?action=${action}`,
            {
                method: method,
                body: ! json_data ? request_data : JSON.stringify( data ),
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                }
            }
        ).then((res) => res.json())
        .catch((err) => console.error(err))

    /**
     * Having trouble with the fetch() api and sending cookies. :(
     * So I'm falling back to jQuery XRHRequest :)
     **/
    return jQuery.ajax({
        url: `${request.ajax.baseurl}/?action=${action}`,
        contentType : 'application/json',
        data: json_data ? JSON.stringify( data ) : request_data,
        method: method
    })
}