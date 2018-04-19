import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Modal extends Component {

    static defaultProps = {
        display_footer: true,
        heading_format: 'string',
        loading: false
    }

    state = {
        body_height: null
    }

    componentWillMount() {
        this.setState({
            body_height: jQuery('body').height()
        });
    }

    render() {

        const {
            children,
            close,
            display_footer,
            loading,
            loading_message,
            loading_default_message,
            heading,
            heading_format,
        } = this.props;

        const { body_height } = this.state;

        const styles = {
            display: 'block'
        }

        if(body_height) {
            styles.height = `${body_height}px`
        }

        const window_scroll_top = jQuery(window).scrollTop();

        return ReactDOM.createPortal(
            (
                <div className="cw__modal modal fade in" tabIndex="-1" style={styles} role="dialog">
                    <div className="modal-dialog modal-lg" role="document" style={{ marginTop: `${window_scroll_top + 60}px` }}>
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
            ),
            document.getElementById('cw__modal_wrapper')
        )
    }
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
}

export { Modal }