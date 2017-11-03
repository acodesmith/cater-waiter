/*global jQuery */

import React, { Component } from 'react'
import { map_value } from '../../utilities/labels'
import { setCurrentScreen, VIEW_STEP_TWO_PICK_UP, VIEW_STEP_TWO_DELIVERY } from '../../constansts/view'
import Button from '../elements/button'

export default class StepOne extends Component
{
    render()
    {
        let { labels: {
            welcome_title,
            delivery_minimum: label_delivery_minimum,
            hours_in_advance: label_hours_in_advance,
            button_pickup,
            button_delivery
        } } = this.props

        let { settings: {
            delivery_minimum: settings_delivery_minimum,
            hours_in_advance: settings_hours_in_advance,
        } } = this.props

        return (
            <section className="cw__step_one">
                <h2>{welcome_title}</h2>
                { label_delivery_minimum && settings_delivery_minimum ?
                    <p className="delivery_minimum">{ map_value( settings_delivery_minimum, label_delivery_minimum ) }</p>
                    : null
                }
                { label_hours_in_advance && settings_hours_in_advance && parseFloat( settings_hours_in_advance ) ?
                    <p className="hours_in_advance">{ map_value( settings_hours_in_advance, label_hours_in_advance ) }</p>
                    : null
                }
                <div className="cw__next_step_selector">
                    <Button onClick={() => {
                        this.props.dispatch( setCurrentScreen( VIEW_STEP_TWO_PICK_UP ) );
                    }}>
                        { button_pickup }
                    </Button>
                    <Button onClick={() => {
                        this.props.dispatch( setCurrentScreen( VIEW_STEP_TWO_DELIVERY ) );
                    }}>
                        { button_delivery }
                    </Button>
                </div>
            </section>
        )
    }
}