import React from 'react'
import PropTypes from 'prop-types'
import { clearData } from '../../utilities'
import { Button } from '../elements/button_no_event'

const ClearData = ({ labels: { need_help_clear_data } }) => (
    <div className="cw__help_info_clear_data">
        <p dangerouslySetInnerHTML={{ __html: need_help_clear_data }}></p>
        <Button
            className='cw__clear_data'
            onClick={() => {
                clearData();
            }}
        >Clear Data</Button>
    </div>
)

ClearData.propTypes = {
    labels: PropTypes.object.isRequired
}

export { ClearData }