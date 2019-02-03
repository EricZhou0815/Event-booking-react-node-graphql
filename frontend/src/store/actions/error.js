import {REMOVE_ERROR,ADD_ERROR} from '../actionTypes';


export const addErr=error=>({
    type:ADD_ERROR,
    error
});

export const removeError=()=>({
    type:REMOVE_ERROR,
});