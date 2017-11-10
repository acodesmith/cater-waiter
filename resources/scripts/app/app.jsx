import React, { Component } from 'react'
import Pathway from './containers/pathway'
import OrderDetails from './containers/order_details'

const App = () => {
    return (
        <div className="cw__app_base">
            <Pathway/>
            <OrderDetails/>
        </div>
    )
}

export default App