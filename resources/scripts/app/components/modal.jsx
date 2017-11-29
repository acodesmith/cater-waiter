import React from 'react'
import PropTypes from 'prop-types'

const Modal = props => {

    props = Object.assign({}, {
        display_footer: true
    }, props)

    const {
        heading,
        children,
        close,
        display_footer,
    } = props

    return (
        <div className="modal fade in" tabIndex="-1" style={{display: 'block'}} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            onClick={close}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{ heading }</h4>
                    </div>
                    <div className="modal-body">{ children }</div>
                    {(()=>{

                        if( ! display_footer )
                            return null

                        return (
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    onClick={close}
                                    data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        )
                    })()}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}


export { Modal }