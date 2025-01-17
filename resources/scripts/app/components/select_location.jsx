import React, { Component } from 'react'
import FormLocationSearch from '../forms/location_search'
import {
    Location,
    LocationAddress
} from './index'
import { REQUEST_LOADING_LOCATIONS, } from '../../constansts'
import { getLocationPostById, } from '../../utilities'
import { loadLocations, selectLocation } from '../../thunks'
import { Button } from '../elements/button'

class SelectLocation extends Component
{
    submit = (values = { zip_code }) => {

        const {
            dispatch,
            labels: {
                pickup_out_of_range_error
            }
        } = this.props

        dispatch( loadLocations( values.zip_code, pickup_out_of_range_error ) )
    }

    render()
    {
        const {
            settings,
            labels,
            data: {
                locations = [],
                location_posts
            },
            request = { },
            history,
            dispatch,
        } = this.props

        const {
            select_pickup_location,
            select_this_location,
            loading: loading_label,
        } = labels

        const { loading } = request

        return (
            <section className="cw__select_location text-center">
                <h2>{select_pickup_location}</h2>
                <FormLocationSearch onSubmit={ this.submit } {...{ settings, labels }} />
                { loading === REQUEST_LOADING_LOCATIONS ? <div>Loading...</div> : '' }
                <div className="cw__locations">
                    { locations.map( (location) => {

                        const location_post = getLocationPostById( location.id, location_posts )

                        const {
                            address_one,
                            address_two,
                            city,
                            state,
                            zip,
                            phone_number,
                        } = location_post.post_meta

                        return (
                            <Location key={location.id} {...location} >
                                <LocationAddress
                                    address_one={ address_one }
                                    address_two={ address_two }
                                    city={ city }
                                    state={ state }
                                    zip={ zip }
                                    phone={ phone_number }
                                    wrapper_class={'cw__pickup_address'}
                                />
                                <Button
                                    className='cw__select_location'
                                    onClick={event => {
                                        event.preventDefault()
                                        dispatch( selectLocation( location, loading_label ) )
                                    }}
                                >{ select_this_location }</Button>
                            </Location>
                        )
                    } ) }
                </div>
            </section>
        )
    }
}

export { SelectLocation }