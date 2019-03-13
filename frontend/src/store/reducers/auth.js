import {SET_CURRENT_USER} from '../actionTypes';

const DEFAULT_STATE={
    isAuthenticated:false,
    user:{}
};

export default (state=DEFAULT_STATE,action)=>{
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated:!!Object.keys(action.user).length, //if user is empty, return false, if there is a user, return true
                user:action.user
            };
        default:
            return state;
    }
}