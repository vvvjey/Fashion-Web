import actionTypes from '../actions/actionsType';
let initialState = {
    isLogin:false,
    adminInfor:null,
} 
const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS :
            return {
                ...state,
                isLogin : true,
                adminInfor:action.userInfor
            }
        case actionTypes.ADMIN_LOGIN_FAIL :
            return {
                ...state,
                isLogin : false,
                adminInfor:null
            }
        case actionTypes.ADMIN_LOGOUT :
            return {
                ...state,
                isLogin : false,
                adminInfor:null
            }
        default:
            return state;
    }
}
export default adminReducer;
