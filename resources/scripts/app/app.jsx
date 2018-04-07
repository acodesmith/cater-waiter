import React from 'react'
import {
    BackButton,
    HelpInfo,
    Loading,
    OrderDetails,
    Pathway,
} from './containers'

const App = props => (
    <div className="cw__app_base">
        <Loading />
        <HelpInfo/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <BackButton className='cw__back_button_top'>
                        Back
                    </BackButton>
                </div>
            </div>
            <div className="row">
                <Pathway />
                <div className="col-md-4">
                    <OrderDetails />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <BackButton>Back</BackButton>
                </div>
            </div>
        </div>
    </div>
)

export default App