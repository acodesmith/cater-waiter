import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../elements/button_no_event'
import {
    clearNotification
} from '../../constansts'

const NOTIFICATION_TYPE_ERROR    = 'danger'
const NOTIFICATION_TYPE_WARNING  = 'warning'
const NOTIFICATION_TYPE_SUCCESS  = 'success'
const NOTIFICATION_TYPE_INFO     = 'info'

const Notifications = props =>
{
    const {
        notifications = [],
        dispatch
    } = props

    return (
        <div className="cw__notifications">
            {notifications.map((n, i) => {

                if( typeof n === 'string' )
                    n = { message: n, type: NOTIFICATION_TYPE_INFO, id: i }

                const {
                    message,
                    type,
                    id
                } = n

                return <div key={ id } className={`alert alert-${ type }`} id={`notification-${ id }`}>
                    { message }
                    <Button className='btn btn-close pull-right' onClick={() => {
                        dispatch( clearNotification(id) )
                    }}>X</Button>
                </div>
            })}
        </div>
    )
}

Notifications.propTypes = {
    notifications: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

export {
    Notifications,
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_INFO
}