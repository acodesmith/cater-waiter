export const request = (action,data) => {
    return fetch(
        `${cw__config.api.baseurl}/${action}`,
        {
            method: 'GET',
            body: Object.assign({}, { action: action }, data),
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        }
    ).then((res) => res.json())
    .catch((err) => console.error(err))
};