import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, className = '', children }) => (
    <button
        onClick={event => {
            event.preventDefault()
            onClick(event)
        }}
        className={ className }
    >
        {children}
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export { Button }