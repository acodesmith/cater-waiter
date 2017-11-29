import React, { Component } from 'react'
import Pathway from './containers/pathway'
import OrderDetails from './containers/order_details'

const App = () => {
    return (
        <div className="cw__app_base">
            <div className="container">
                <div className="col-md-8">
                    <Pathway/>
                </div>
                <div className="col-md-4">
                    <OrderDetails/>
                </div>
            </div>
        </div>
    )
}

export default App