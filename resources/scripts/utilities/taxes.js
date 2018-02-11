import { ajax } from "./request"

export const set_tax_session = location_id => {

    ajax('set_tax_by_location', { location_id: location_id }, 'POST', false, true)
        .then(data => {
            if( !data.success ) {
                console.error(data.error);
            }
        })
}