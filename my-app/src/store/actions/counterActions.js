import actionTypes from '../actions/actionsType';
import {login} from '../../services/userServices'
export const increase = (payload) => {
    return async (dispatch)=>{
        try{
            dispatch({
                type:actionTypes.INCREMENT,
                payload:payload
            })
        } catch(e){
            console.log(e);
        }
    }
}
export const decrease = (payload) => {
    return async (dispatch)=>{
        try{
            dispatch({
                type:actionTypes.DECREMENT,
                payload:payload
            })
        } catch(error){
            console.log(error);
        }
    }
}
