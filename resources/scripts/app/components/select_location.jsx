import React, { Component } from 'react'
import { batchActions } from 'redux-batched-actions'
import FormLocationSearch from '../forms/location_search'
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
    setLocations,
    setLocation,
    clearLocations
} from '../../constansts/locations'
import {
    setCurrentScreen,
    VIEW_SCHEDULE_ORDER
} from '../../constansts/view'
import BackButton from '../elements/back_button'
import Button from '../elements/button'

export default class SelectLocation extends Component
{
    submit = (values) => {

        let { dispatch } = this.props

        dispatch( batchActions([
            setLoadingState( REQUEST_LOADING_LOCATIONS ),
            clearLocations()
        ]) )

        getLocationsFromZip( values.zip_code )
            .then(data => {

                let locations = extractDataFromResults( data.results )

                dispatch( batchActions([
                    setLocations( locations ),
                    clearLoadingState()
                ]) )
            })
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
            <section className="cw__select_location">
                <h2>{select_pickup_location}</h2>
                { history && history.length ? <BackButton dispatch={this.props.dispatch}>Back</BackButton> : null }
                <FormLocationSearch onSubmit={ this.submit } {...{ settings, labels }} />
                { loading === REQUEST_LOADING_LOCATIONS ? <div>Loading...</div> : '' }
                { locations.map( (location) => (
                    <Location key={location.id} {...location} >
                        <Button onClick={event => {
                            event.preventDefault()
                            dispatch( batchActions([
                                setLocation( location ),
                                setCurrentScreen( VIEW_SCHEDULE_ORDER )
                            ]) )
                        }}>{ select_this_location }</Button>
                    </Location>
                ) ) }
            </section>
        )
    }
}