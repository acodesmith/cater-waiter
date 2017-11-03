import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  } from '../../constansts/view'
import StepOne from '../components/step_one'
import StepTwoPickUp from '../components/step_two_pickup'
import { VIEW_STEP_ONE, VIEW_STEP_TWO_DELIVERY, VIEW_STEP_TWO_PICK_UP } from '../../constansts/view'

class Steps extends Component
{
    render()
    {
        let {
            dispatch,
            settings,
            labels,
            view: { current }
        } = this.props

        switch( current.text ) {
            case VIEW_STEP_ONE:
                return <StepOne dispatch={ dispatch } {...{ settings, labels }} />
                break;
            case VIEW_STEP_TWO_PICK_UP:
                return <StepTwoPickUp dispatch={ dispatch } {...{ settings, labels }} />
                break;
            case VIEW_STEP_TWO_DELIVERY:
                return <StepTwoPickUp dispatch={ dispatch } {...{ settings, labels }} />
                break;
            default:
                return <div className="cw_error">Something has gone wrong!</div>
        }
    }
}

export default connect(
    state => state
)(Steps)