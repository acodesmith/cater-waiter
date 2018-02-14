import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../components/'
import { clear } from '../../utilities/local_storage'
import { Button } from "../elements/button"
import {
    hideHelpInfo,
    LOCAL_STORAGE_KEY
} from "../../constansts/"

const clearData = () => {
    clear( LOCAL_STORAGE_KEY )
    window.location.reload()
}

let HelpInfo = ({ dispatch, data: { help_info: display_help_info }, labels: { need_help, need_help_clear_data }, settings: { help_info: help_info_settings } }) => {
    return !display_help_info ? null : (
        <div className="cw__help_info">
            <Modal
                heading={need_help}
                close={event => {
                    event.preventDefault()
                    dispatch( hideHelpInfo() )
                }}
            >
                <div className="cw__help_info_settings">
                    <p dangerouslySetInnerHTML={{ __html: help_info_settings }}></p>
                </div>
                <hr/>
                <div className="cw__help_info_clear_data">
                    <p dangerouslySetInnerHTML={{ __html: need_help_clear_data }}></p>
                    <Button
                        className='cw__clear_data'
                        onClick={event => {
                            event.preventDefault()
                            clearData();
                        }}
                    >Clear Data</Button>
                </div>
            </Modal>
        </div>
    )
}

HelpInfo = connect(
    state => state
)(HelpInfo)

export { HelpInfo }