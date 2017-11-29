import React from 'react'

const TotalRow = props =>
{
    const { formData: {
        values = {}
    } } = props

    let { quantity } = values

    if( quantity && quantity.length )
        quantity = quantity.map(value => Number( value ))

    return (
        <div className="row">
            <div className="col-sm-12">
                <hr/>
                 { ! quantity ? null : `TOTAL: ${quantity.reduce((a, b) => a + b, 0)}` }
            </div>
        </div>
    )
}

export { TotalRow }