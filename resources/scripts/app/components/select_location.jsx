import React, { Component } from 'react'
import FormLocationSearch from '../forms/location_search'
import { Location } from './location'
import { REQUEST_LOADING_LOCATIONS, } from '../../constansts/request'
import { loadLocations, selectLocation } from '../../thunks/locations'
import { BackButton } from '../elements/back_button'
import { Button } from '../elements/button'

class SelectLocation extends Component
{
    submit = (values = { zip_code }) => {
        this.props.dispatch( loadLocations( values.zip_code ) )
    }

    render()
    {
        const {
            settings,
            labels,
            data: { locations = [] },
            request = { },
            history,
            dispatch,
        } = this.props

        const {
            select_pickup_location,
            select_this_location
        } = labels

        const { loading } = request

        return (
            <section className="cw__select_location text-center">
                <h2>{select_pickup_location}</h2>
                { history && history.length ? <BackButton dispatch={this.props.dispatch}>Back</BackButton> : null }
                <FormLocationSearch onSubmit={ this.submit } {...{ settings, labels }} />
                { loading === REQUEST_LOADING_LOCATIONS ? <div>Loading...</div> : '' }
                { locations.map( (location) => (
                    <Location key={location.id} {...location} >
                        <Button onClick={event => {
                            event.preventDefault()
                            dispatch( selectLocation( location ) )
                        }}>{ select_this_location }</Button>
                    </Location>
                ) ) }
            </section>
        )
    }
}

export { SelectLocation }