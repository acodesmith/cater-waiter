import {
    SET_LOADING_STATE,
    CLEAR_LOADING_STATE
} from '../constansts/request'

const api = (state, action) => {

    switch(action.type) {
        case SET_LOADING_STATE:
            return Object.assign( {}, state, {
                loading: action.text,
            })
            break;
        case CLEAR_LOADING_STATE:
            return Object.assign( {}, state, {
                loading: false
            })
    }

    return Object.assign( {}, state )
}

export default api