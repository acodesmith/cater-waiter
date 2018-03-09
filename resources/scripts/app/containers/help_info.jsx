import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../components/'
import { clearData } from '../../utilities/'
import { Button } from "../elements/button"
import { hideHelpInfo } from "../../constansts/"
import { ClearData } from '../components'


let HelpInfo = ({ dispatch, data: { help_info: display_help_info }, labels, settings: { help_info: help_info_settings } }) => {

    const { need_help } = labels

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
                <ClearData labels={labels} />
            </Modal>
        </div>
    )
}

HelpInfo = connect(
    state => state
)(HelpInfo)

export { HelpInfo }