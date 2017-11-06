import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  } from '../../constansts/view'
import StepOne from '../components/step_one'
import StepTwoPickUp from '../components/step_two_pickup'
import StepThreePickUp from '../components/step_three_pickup'
import {
    VIEW_STEP_ONE,
    VIEW_STEP_TWO_DELIVERY,
    VIEW_STEP_TWO_PICKUP,
    VIEW_STEP_THREE_PICKUP
} from '../../constansts/view'

//TEMP
import Button from '../elements/button'
import { LOCAL_STORAGE_KEY } from '../../constansts/local_storage'
import { clear } from '../../utilities/local_storage'

class Steps extends Component
{
    debugButton = () => {
        return <Button onClick={event => {
            event.preventDefault()
            clear( LOCAL_STORAGE_KEY )
            window.location.reload()
        }}>Clear Data</Button>
    }

    render()
    {
        let {
            dispatch,
            settings,
            labels,
            view: { current, history },
            request,
            data
        } = this.props

        let props = {
            settings,
            labels,
            request,
            locations: data.locations,
            history,
            dispatch
        }

        switch( current ) {
            case VIEW_STEP_ONE:
                return ( <div>
                    <StepOne dispatch={ dispatch } {...props} />
                    {this.debugButton()}
                </div> )
                break;
            case VIEW_STEP_TWO_PICKUP:
                return (
                    <div>
                        <StepTwoPickUp {...props} />
                        {this.debugButton()}
                    </div>
                )
                break;
            // case VIEW_STEP_TWO_DELIVERY:
            //     return <StepTwoPickUp dispatch={ dispatch } {...{ settings, labels }} />
            //     break;
            case VIEW_STEP_THREE_PICKUP:
                return (
                    <div>
                        <StepThreePickUp {...props} />
                        {this.debugButton()}
                    </div>
                )
                break;
            default:
                return <div className="cw_error">Something has gone wrong! {this.debugButton()}</div>
        }
    }
}

export default connect(
    state => state
)(Steps)