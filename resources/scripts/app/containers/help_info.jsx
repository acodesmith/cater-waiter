import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '../components/'
import { hideHelpInfo } from "../../constansts/"

let HelpInfo = ({ dispatch, data: { help_info }, labels: { need_help } }) => {
    return !help_info ? null : (
        <div className="cw__help_info">
            <Modal
                heading={need_help}
                close={event => {
                    event.preventDefault()
                    dispatch( hideHelpInfo() )
                }}
            />
        </div>
    )
}

HelpInfo = connect(
    state => state
)(HelpInfo)

export { HelpInfo }