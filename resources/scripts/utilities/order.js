import { ajax } from '../utilities'

export function extractOrderDataForSession({ order_type, order_location, order_delivery_address, order_pickup_time }) {
    return { order_type, order_location, order_delivery_address, order_pickup_time }
}

export function syncOrderDataToSession(order) {

    const data = extractOrderDataForSession(order)

    return ajax('sync_order_data_to_session', { data: data }, 'POST', true, true)
}