import { SET_CURRENT_SCREEN } from '../constansts/view'

const view = (state, action) => {

    switch(action.type) {
        case SET_CURRENT_SCREEN:
            return Object.assign({},state,{
                current: action,
            })
            break;
    }

    return Object.assign({}, state)
}

export default view