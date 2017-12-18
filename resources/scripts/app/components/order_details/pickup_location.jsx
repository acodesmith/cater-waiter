import React from 'react'
import { Button } from '../../elements/button_no_event'
import { LocationAddress } from '../index'
import {
    VIEW_SELECT_LOCATION,
    jumpToView
} from '../../../constansts'
import {
    getLocationPostById,
    jumpToView as jumpToViewUtility
} from '../../../utilities'

const PickupLocation = props =>
{
    let {
        dispatch,
        labels: {
            pickup_location_title,
            change_pickup_location
        },
        order: {
            order_location
        },
        data: {
            location_posts
        },
        view: {
            history
        }
    } = props

    if( ! order_location )
        return null


    const location = getLocationPostById( order_location.id, location_posts )

    const {
        address_one,
        address_two,
        city,
        state,
        zip,
        phone_number,
    } = location.post_meta

    return (
        <div className="cw__pickup_location">
            <h3>{ pickup_location_title }</h3>
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
                className='btn btn-xs btn-link'
                onClick={() => dispatch( jumpToView( VIEW_SELECT_LOCATION, history ) )}>
                { change_pickup_location }
            </Button>
        </div>
    )
}

export { PickupLocation }