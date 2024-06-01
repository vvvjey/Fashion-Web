import actionTypes from './actionsType';
import { loginAdmin } from '../../services/userServices';
export const adminLoginAction = (data) => {
    return async (dispatch)=>{
        try {
            console.log('2')
            let res = await loginAdmin(data);
            console.log('res',res)
            if(res){
                if(res.data.data.errCode==0) {
                    console.log(res.data.data)
                    dispatch({
                        type:actionTypes.ADMIN_LOGIN_SUCCESS,
                        userInfor:res.data.data.user
                    })
                } else {
                    dispatch({
                        type:actionTypes.ADMIN_LOGIN_FAIL,
                    })
                    return { error: { message: res.data.data.errMessage } };
                }
            } 
        } catch (error) {
            console.log(error);
        }
    }
}
export const adminLogoutAction = (data) => {
    return async (dispatch)=>{
        try {
            dispatch({
                type:actionTypes.ADMIN_LOGOUT
            })
        } catch (error) {
            console.log(error);
        }
    }
}