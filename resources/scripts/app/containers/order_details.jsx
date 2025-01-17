import React, {Component} from 'react'
import { connect } from 'react-redux'
import { IconHelp } from "../elements/icon_help"
import { Button } from '../elements/button_no_event'
import {
    ORDER_TYPE_PICKUP,
    VIEW_CONFIRM,
    setCurrentScreen,
    showHelpInfo
} from '../../constansts/'
import {
    clearData,
    clearCart
} from '../../utilities'
import {
    OrderType,
    PickupLocation,
    DeliveryLocation,
    OrderTime,
    MenuItems
} from '../components/order_details/'


const display = props =>
{
    const { view: { current } } = props
        ,views = [ 'cart' ]

    return views.indexOf( current ) !== -1
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

class OrderDetails extends Component {

    render() {
        let {
            dispatch,
            labels: {
                order_details_title,
                review_order_button,
                delete_cart,
                delete_cart_confirmation
            },
            order: {
                order_type,
                order_cart = {
                    items: []
                }
            },
        } = this.props

        const { items } = order_cart

        if( ! display( this.props ) )
            return null

        return (
            <div className="cw__order_details" id='cw__order_details'>
                <section>
                    <header>{ order_details_title } <HelpTrigger dispatch={dispatch} /></header>
                    <OrderType {...this.props} />
                    { order_type === ORDER_TYPE_PICKUP ?
                        <PickupLocation {...this.props} /> :
                        <DeliveryLocation {...this.props} /> }
                    <OrderTime {...this.props} />
                </section>
                <MenuItems {...this.props} />
                <div className="cw__buttons text-center">
                    { !!items.length &&
                    <React.Fragment>
                        <Button
                            className='cw__review_order'
                            onClick={() => { dispatch( setCurrentScreen( VIEW_CONFIRM ) ) }}
                        >
                            { review_order_button }
                        </Button>
                        <Button
                            className='cw__clear_data'
                            onClick={() => {
                                const confirmation = confirm(delete_cart_confirmation)

                                if(confirmation) {
                                    clearCart().then(clearData)
                                }
                            }}
                        >{delete_cart}</Button>
                    </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}


OrderDetails = connect(
    state => state
)(OrderDetails)

export { OrderDetails }