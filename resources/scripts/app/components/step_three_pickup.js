import React, { Component } from 'react'
import BackButton from '../elements/back_button'

export default class StepThreePickup extends Component
{
    render()
    {
        const {
            labels: {
                delivery_address_title
            },
            dispatch
        } = this.props

        return (
            <section className="cw__step_three_pickup">
                <BackButton dispatch={dispatch}>Back</BackButton>
                <h2>{ delivery_address_title }</h2>
            </section>
        )
    }
}