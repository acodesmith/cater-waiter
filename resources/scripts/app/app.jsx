import React from 'react'
import {
    BackButton,
    HelpInfo,
    Loading,
    OrderDetails,
    Pathway,
} from './containers'

const App = () => {
    return (
        <div className="cw__app_base">
            <Loading />
            <HelpInfo/>
            <div className="container-fluid">
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