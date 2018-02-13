import React from 'react'
import { connect } from 'react-redux'
import { IconHelp } from "../elements/icon_help"
import {
    ORDER_TYPE_PICKUP,
    VIEW_CONFIRM,
    setCurrentScreen,
    showHelpInfo
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

const HelpTrigger = ({ dispatch }) => (
    <button 
        className='cw__help_info_trigger'
        onClick={event => {
            event.preventDefault()
            dispatch( showHelpInfo() )
        }}
    >
        <IconHelp/>
    </button>
)

let OrderDetails = props =>
{
    let {
        dispatch,
        labels: {
            order_details_title,
            review_order_button
        },
        order: {
            order_type,
            order_cart = {
                items: []
            }
        },
    } = props

    const { items } = order_cart

    if( ! display( props ) )
        return null

    return (
        <div className="cw__order_details">
            <section>
                <header>{ order_details_title } <HelpTrigger dispatch={dispatch} /></header>
                <OrderType {...props} />
                { order_type === ORDER_TYPE_PICKUP ?
                    <PickupLocation {...props} /> :
                    <DeliveryLocation {...props} /> }
                <OrderTime {...props} />
            </section>
            <MenuItems {...props} />
            { ! items.length ? null : <Button onClick={event => {
                event.preventDefault()
                dispatch( setCurrentScreen( VIEW_CONFIRM ) )
            }}>{ review_order_button }</Button> }
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