import React from 'react'

const TotalRow = props =>
{
    const { formData: {
        values = { items: [] }
    } } = props

    const { items } = values

    let quantity = 0

    if( items && items.length )
        quantity = items.map(item => Number( item.quantity )).reduce((a, b) => a + b, 0)

    if(!quantity)
        return null

    return (
        <div className="row">
            <div className="col-sm-12">
                <hr/>
                <div className="cw__add_to_cart_quantity_total">
                    TOTAL: <span>{quantity}</span>
                </div>
            </div>
        </div>
    )
}

export { TotalRow }