import actionTypes from '../actions/actionsType';
import Cookies from 'js-cookie';
import {login,register,getProductsCartById,modifyProductQuantityInCart,deleteProductInCart,createOrder} from '../../services/userServices'
export const loginAction = (data) => {
    return async (dispatch)=>{
        try {
            let res = await login(data);
            console.log('res',res)
            if(res){
                if(res.data.data.errCode==0) {
                    console.log("abcc",res.data.data)
                    Cookies.set('access-token',res.data.data.accessToken,{
                        expires:0.1,
                        secure:false,
                        sameSite:"Lax"
                    })
                    Cookies.set('refresh-token',res.data.data.refreshToken,{
                        expires:5,
                        secure:false,
                        sameSite:"Lax"

                    })
                    dispatch({
                        type:actionTypes.LOGIN_SUCCESS,
                        userInfor:res.data.data.user
                    })
                } else {
                    dispatch({
                        type:actionTypes.LOGIN_FAIL,
                    })
                    return { error: { message: res.data.data.errMessage } };
                }
            } 
        } catch (error) {
            console.log(error);
        }
    }
}
export const registerAction = (data) => {
    return async (dispatch)=>{
        try {
            let res = await register(data);
            console.log('res',res)
            if(res){
                console.log('res',res)
                if(res.data.data.errCode==0) {
                    Cookies.set('access-token',res.data.data.accessToken,{
                        expires:0.1,
                        secure:true
                    })
                    Cookies.set('refresh-token',res.data.data.refreshToken,{
                        expires:5,
                        secure:true
                    })
                    dispatch({
                        type:actionTypes.REGISTER,
                        userInfor:res.data.data.user
                    })
                } else {
                    dispatch({
                        type:actionTypes.REGISTER_FAIL
                    })
                    return { error: { message: res.data.data.errMessage } };
                }

            } else {
                dispatch({
                    type:actionTypes.REGISTER_FAIL
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
// actions/userActions.js

export const setIsLogin = (isLogin) => ({
    type: 'SET_IS_LOGIN',
    payload: isLogin,
  });
export const logoutAction = () => {
    return async (dispatch) =>{
        try {
            console.log('logout')
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            dispatch({
                type:actionTypes.LOGOUT
            })
        } catch (error) {
            console.log(error);
        }
    }
}
// Cart User
export const getCart = (userId) =>{
    return async (dispatch) => {
        try {
            let data = await getProductsCartById(userId)
            console.log('cart',data)
            if(data.data.data.errCode==0){
                dispatch({
                    type:actionTypes.GET_CART,
                    carts:data.data.data.carts
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
}
export const modifyCartQuantity = (infor) => {
    return async (dispatch) => {
        try {
            let data = await modifyProductQuantityInCart(infor)
            console.log(data)
            if(data.data.data.errCode==0){
                dispatch({
                    type:actionTypes.MODIFY_PRODUCT_QUANTITY_IN_CART,
                    payload:infor
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
}
export const removeProductInCart = (infor) =>{
    return async (dispatch) => {
        try {
            let data = await deleteProductInCart(infor)
            if(data.data.data.errCode==0){
                dispatch({
                    type:actionTypes.DELETE_PRODUCT_IN_CART,
                    payload:infor
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
} 
export const checkoutAction = (infor) => {
    return async (dispatch) => {
        try {
            let data = await createOrder(infor)
            console.log(data)
            if(data.data.data.errCode==0){
                console.log('create order success')
                dispatch({
                    type:actionTypes.CREATE_ORDER,
                    payload:infor
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
}