import React from 'react'
import PropTypes from 'prop-types'

const LocationAddress = props =>
{
    const {
        address_one,
        address_two = null,
        city,
        state,
        zip,
        phone = null,
        wrapper_class = ''
    } = props

    return (
        <div className={`cw__location_address ${ wrapper_class }`}>
            { address_one } {address_two}<br/>
            { city } { state }, { zip }<br/>
            <a href={ phone ? `tel:${ phone.replace(/[^0-9.]/g, '')}` : null }>{ phone }</a>
        </div>
    )
}

LocationAddress.propTypes = {
    address_one: PropTypes.string.isRequired,
    address_two: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    phone: PropTypes.string,
    wrapper_class: PropTypes.string,
}

export { LocationAddress }