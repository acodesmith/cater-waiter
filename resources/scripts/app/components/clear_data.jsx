import React from 'react'
import PropTypes from 'prop-types'
import { clearData, clearCart } from '../../utilities'
import { Button } from '../elements/button_no_event'

const ClearData = ({ labels: { need_help_clear_data, delete_cart, delete_cart_confirmation } }) => (
    <div className="cw__help_info_clear_data">
        <p dangerouslySetInnerHTML={{ __html: need_help_clear_data }}></p>
        <Button
            className='cw__clear_data'
            onClick={() => {
                const confirmation = confirm(delete_cart_confirmation)

                if(confirmation) {
                    clearCart().then(clearData)
                }
            }}
        >{delete_cart}</Button>
    </div>
)

ClearData.propTypes = {
    labels: PropTypes.object.isRequired
}

export { ClearData }