import React from 'react'
import { connect } from 'react-redux'

let Loading = props => {

    const {
        display,
        label,
        default_label
    } = props

    if( ! display )
        return null

    return (
        <div className="cw__loading">
            { label ? label : default_label }
        </div>
    )
}

Loading = connect(
    state => {

        const {
            labels: {
                loading: label_loading
            },
            data: {
                loading_message,
                loading: loading_toggle
            }
        } = state

        return {
            default_label: label_loading,
            label: loading_message,
            display: loading_toggle
        }
    }
)(Loading)

export { Loading }