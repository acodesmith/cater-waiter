/*global jQuery */

import React, { Component } from 'react'
import FormLocationSearch from './form_location_search'

export default class StepTwoPickup extends Component
{
    submit = (values) => {
        // print the form values to the console
        console.log(values)
    }

    render()
    {
        const {
            settings,
            labels
        } = this.props

        const { select_pickup_location } = labels

        return (
            <section className="cw__step_two_pick_up">
                <h2>{select_pickup_location}</h2>
                <FormLocationSearch onSubmit={ this.submit } {...{ settings, labels }} />
            </section>
        )
    }
}