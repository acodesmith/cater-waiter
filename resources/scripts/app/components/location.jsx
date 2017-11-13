import React from 'react'

const Location = props => {

    let {
        distance,
        id,
        permalink,
        title,
        children
    } = props

    return (
        <div className="cw_location">
            <h4>{ title }</h4>
            <p>{ distance }</p>
            { children }
        </div>
    )
}

export { Location }