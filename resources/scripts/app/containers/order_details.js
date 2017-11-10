import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrderType from '../components/order_details/order_type'
import PickupLocation from '../components/order_details/pickup_location'

//TEMP
import Button from '../elements/button'
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

    render()
    {
        let {
            labels: {
                order_details_title,
                order_type_title
            }
        } = this.props

        return (
            <div className="cw__order_details">
                <section>
                    <header>{ order_details_title }</header>
                    <OrderType {...this.props} />
                    <PickupLocation {...this.props} />
                </section>
                <Button onClick={this.clearData}>Clear Data</Button>
            </div>
        )
    }
}

export default connect(
    state => state
)(OrderDetails)