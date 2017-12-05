import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ORDER_TYPE_PICKUP,
    VIEW_CONFIRM,
    setCurrentScreen
} from '../../constansts/'
import {
    OrderType,
    PickupLocation,
    DeliveryLocation,
    OrderTime,
    MenuItems
} from '../components/order_details/'

//TEMP
import { Button } from '../elements/button'
import { LOCAL_STORAGE_KEY } from '../../constansts/local_storage'
import { clear } from '../../utilities/local_storage'

const display = props =>
{
    const { view: { current } } = props
        ,views = [ 'cart' ]

    return views.indexOf( current ) !== -1
}

const clearData = () => {
    clear( LOCAL_STORAGE_KEY )
    window.location.reload()
}

let OrderDetails = props =>
{
    let {
        dispatch,
        labels: {
            order_details_title,
            review_order_button
        },
        order: {
            order_type
        },
    } = props

    if( ! display( props ) )
        return null

    return (
        <div className="cw__order_details">
            <section>
                <header>{ order_details_title }</header>
                <OrderType {...props} />
                { order_type === ORDER_TYPE_PICKUP ?
                    <PickupLocation {...props} /> :
                    <DeliveryLocation {...props} /> }
                <OrderTime {...props} />
            </section>
            <MenuItems {...props} />
            <Button onClick={event => {
                event.preventDefault()
                dispatch( setCurrentScreen( VIEW_CONFIRM ) )
            }}>{ review_order_button }</Button>
            <Button onClick={event => {
                event.preventDefault()
                clearData();
            }}>Clear Data</Button>
        </div>
    )
}

OrderDetails = connect(
    state => state
)(OrderDetails)

export { OrderDetails }