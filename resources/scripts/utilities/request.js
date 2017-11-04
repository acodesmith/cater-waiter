const { request } = cw__config;

/**
 * Interact with the WordPress Rest API
 *
 * @param action
 * @param data
 * @param method
 */
export const api = (action,data,method = 'GET') => {
    return fetch(
        `${ request.api.baseurl }/${ action }`,
        {
            method: method,
            body: Object.assign({}, { action: action }, data),
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
 */
export const ajax = (action,data,method = 'POST') => {

    let request_data = '';

    Object.keys( data ).forEach((key) => {
        request_data = `${ request_data }&${ key }=${ data[key] }`
    })

    return fetch(
        `${request.ajax.baseurl}/?action=${action}`,
        {
            method: method,
            body: request_data,
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
        }
    ).then((res) => res.json())
    .catch((err) => console.error(err))
}