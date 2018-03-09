import React from 'react'
import { ClearData } from './index'

export const ViewError = ({ labels, view: { current } }) => (
    <div className="cw__view_error">
        <h2>Oops!</h2>
        <p>Something has gone wrong! {current && (`Trying to render view <strong>${current}</strong>`)}</p>
        <hr/>
        <ClearData labels={labels} />
    </div>
)