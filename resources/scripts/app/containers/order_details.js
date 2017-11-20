import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ORDER_TYPE_PICKUP } from '../../constansts/order'
import { OrderType } from '../components/order_details/order_type'
import { PickupLocation } from '../components/order_details/pickup_location'
import { DeliveryLocation } from '../components/order_details/delivery_location'

//TEMP
import { Button } from '../elements/button'
import { LOCAL_STORAGE_KEY } from '../../constansts/local_storage'
import { clear } from '../../utilities/local_storage'

class OrderDetails extends Component
{
    constructor()
    {
        super()

        this.clearData = this.clearData.bind(this)
    }

    clearData = (event) => {
        event.preventDefault()
        clear( LOCAL_STORAGE_KEY )
        window.location.reload()
    }

    display()
    {
        const { view: { current } } = this.props
            ,views = [ 'cart' ]

        return views.indexOf( current ) !== -1
    }

    render()
    {
        let {
            labels: {
                order_details_title,
                order_type_title
            },
            order: {
                order_type
            },
        } = this.props

        if( ! this.display() )
            return null

        return (
            <div className="cw__order_details">
                <section>
                    <header>{ order_details_title }</header>
                    <OrderType {...this.props} />
                    { order_type === ORDER_TYPE_PICKUP ?
                        <PickupLocation {...this.props} /> :
                        <DeliveryLocation {...this.props} /> }
                </section>
                <Button onClick={this.clearData}>Clear Data</Button>
            </div>
        )
    }
}

export default connect(
    state => state
)(OrderDetails)