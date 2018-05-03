import { ajax } from "./request"

export const setTaxSessionRequest = location_id => {
    return ajax('set_tax_by_location', { location_id: location_id }, 'POST', false, true)
}

export const setTaxSession = location_id => {

    setTaxSessionRequest(location_id).then(data => {
            if( !data.success ) {
                console.error(data.error);
            }
        })
}