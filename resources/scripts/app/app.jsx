import React from 'react'
import { Pathway, OrderDetails } from './containers'
import { Loading } from './components'
import { BackButton } from "./elements/back_button";

const App = () => {
    return (
        <div className="cw__app_base">
            <Loading />
            <div className="container">
                <div className="row">
                    <Pathway/>
                    <div className="col-md-4">
                        <OrderDetails/>
                    </div>
                </div>
                <div className="row">
                    <BackButton>Back</BackButton>
                </div>
            </div>
        </div>
    )
}

export default App