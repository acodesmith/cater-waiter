import {
    SET_CURRENT_SCREEN,
    BACK_TO_PREVIOUS_SCREEN
} from '../constansts/view'

const view = (state, action) => {

    switch(action.type) {
        case SET_CURRENT_SCREEN:

            state.history.push( state.current );

            return Object.assign({},state,{
                current: action.text,
                history: state.history
            })
            break;
        case BACK_TO_PREVIOUS_SCREEN:

            const current = state.history[ state.history.length - 1 ]

            state.history.pop()

            return Object.assign({},state,{
                current: current,
                history: state.history
            })
            break;
    }

    return Object.assign({}, state)
}

export default view