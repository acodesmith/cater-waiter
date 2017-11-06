import {
    SET_LOCATIONS,
    SET_LOCATION
} from '../constansts/locations'

const data = (state, action) => {

    switch(action.type) {
        case SET_LOCATIONS:
            return Object.assign( {}, state, {
                locations: action.locations,
            })
            break;
    }

    return Object.assign({}, state)
}

export default data