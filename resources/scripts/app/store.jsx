/*global cw__config*/

import createStore from '../configs/store'
import { LOCAL_STORAGE_KEY } from '../constansts/local_storage'
import {
    storeLocal,
    retrieve,
    getLocationPostById
} from '../utilities/'

/**
 * Retrieve the locally stored data to rehydrate the redux application.
 * Only use part of the locally stored data in case labels or settings
 * have changed.
 *
 * @type {*}
 */
let locally_stored_data = Object.assign({}, cw__config, retrieve(LOCAL_STORAGE_KEY))

/**
 * Always pull most recent labels, products and cart data
 */
locally_stored_data.labels                      = cw__config.labels
locally_stored_data.request                     = cw__config.request
locally_stored_data.data                        = locally_stored_data.data ? locally_stored_data.data : {}
//locally_stored_data.data.locations              = cw__config.data.locations
locally_stored_data.data.products               = cw__config.data.products
locally_stored_data.data.location_posts         = cw__config.data.location_posts
locally_stored_data.data.grouped_products       = cw__config.data.grouped_products
locally_stored_data.data.catering_categories    = cw__config.data.catering_categories
locally_stored_data.settings                    = cw__config.settings
locally_stored_data.order                       = locally_stored_data.order ? locally_stored_data.order : {}
locally_stored_data.order.order_cart            = cw__config.order.order_cart

/**
 * In case someone is stuck in a loading state after a failed request clear loading state.
 */
locally_stored_data.data.loading = false
locally_stored_data.data.modal_loading = false

/**
 * Validate the location is in the wp_post table.
 */
const { order_location } = locally_stored_data.order
    , { locations } = cw__config.data

if( order_location && locations.length ) {
    const location = getLocationPostById( order_location.id, locations )

    /**
     * The stored location data does not match what is in the wp_post table.
     * Clear the order data and view data to trigger a restart.
     */
    if( !location ) {
        locally_stored_data.order   = cw__config.order
        locally_stored_data.view    = cw__config.view
    }
}

/**
 * Create the Redux Store
 */
const store = createStore(locally_stored_data)

/**
 * Subscribe to Redux changes then write
 * state to the localStorage
 */
store.subscribe(() => {
    storeLocal(LOCAL_STORAGE_KEY, store.getState())
})

export { store }