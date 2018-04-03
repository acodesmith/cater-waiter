import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({
    children,
    close,
    display_footer,
    loading,
    loading_message,
    loading_default_message,
    heading,
    heading_format,
}) => (
    <div className="modal fade in" tabIndex="-1" style={{display: 'block'}} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                { loading &&
                <div className="cw__modal_loading">
                    <div className="cw__modal_loading_content">
                        { loading_message ? loading_message : loading_default_message }
                    </div>
                </div>
                }
                <div className="modal-header">
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={close}
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">
                        {(() => {
                          switch(heading_format) {
                              case 'html':
                                return <span dangerouslySetInnerHTML={{__html: heading}}></span>
                              case 'string':
                              default:
                                return heading
                          }
                        })()}
                    </h4>
                </div>
                <div className="modal-body">{ children }</div>
                {display_footer && (
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={close}
                            data-dismiss="modal">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
)

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}

Modal.defaultProps = {
    display_footer: true,
    heading_format: 'string',
    loading: false
}

export { Modal }