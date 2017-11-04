/*global jQuery */

import React, { Component } from 'react'
import FormLocationSearch from './form_location_search'
import Location from './location'
import {
    getLocationsFromZip,
    extractDataFromResults
} from '../../utilities/locations'
import {
    setLoadingState,
    clearLoadingState,
    REQUEST_LOADING_LOCATIONS,
} from '../../constansts/request'
import {
    setLocations
} from '../../constansts/locations'

export default class StepTwoPickup extends Component
{
    submit = (values) => {

        let { dispatch } = this.props

        dispatch( setLoadingState( REQUEST_LOADING_LOCATIONS ) )

        getLocationsFromZip( values.zip_code )
            .then(data => {

                let locations = extractDataFromResults( data.results )

                dispatch( setLocations( locations ) )
                dispatch( clearLoadingState() )
            })
    }

    render()
    {
        const {
            settings,
            labels,
            locations = [],
            request = { }
        } = this.props

        const { select_pickup_location } = labels
        const { loading } = request

        return (
            <section className="cw__step_two_pick_up">
                <h2>{select_pickup_location}</h2>
                <FormLocationSearch onSubmit={ this.submit } {...{ settings, labels }} />
                { loading === REQUEST_LOADING_LOCATIONS ? <div>Loading...</div> : '' }
                { locations.map( (location) => (
                    <Location key={location.id} {...location} >CHILD</Location>
                ) ) }
            </section>
        )
    }
}