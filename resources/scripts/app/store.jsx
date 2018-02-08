/*global cw__config*/

import createStore from '../configs/store'
import {LOCAL_STORAGE_KEY} from '../constansts/local_storage'
import {storeLocal, retrieve} from '../utilities/local_storage'

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
locally_stored_data.data                        = locally_stored_data.data ? locally_stored_data.data : {}
locally_stored_data.data.products               = cw__config.data.products
locally_stored_data.data.location_posts         = cw__config.data.location_posts
locally_stored_data.data.grouped_products       = cw__config.data.grouped_products
locally_stored_data.data.catering_categories    = cw__config.data.catering_categories
locally_stored_data.settings                    = cw__config.settings
locally_stored_data.order                       = locally_stored_data.order ? locally_stored_data.order : {}
locally_stored_data.order.order_cart            = cw__config.order.order_cart

/**
 * In case someone is stuck in a loading state after a failed request
 * clear loading state
 */
locally_stored_data.data.loading = false
locally_stored_data.data.modal_loading = false

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