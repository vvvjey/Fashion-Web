import actionTypes from '../actions/actionsType';
let initialState = {
    isLogin:false,
    userInfor:null,
    carts:[]
} 
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS :
            return {
                ...state,
                isLogin : true,
                userInfor:action.userInfor
            }
        case actionTypes.LOGIN_FAIL :
            return {
                ...state,
                isLogin : false,
                userInfor:null
            }
        case actionTypes.REGISTER :
            return {
                ...state,
                isLogin : true,
                userInfor:action.userInfor
            }
        case actionTypes.REGISTER_FAIL :
            return {
                ...state,
                isLogin : false,
                userInfor:null
            }
        case actionTypes.LOGOUT :
            console.log('logout')
            return {
                ...state,
                isLogin : false,
                userInfor:null,
                carts:[]
            }
        case actionTypes.SET_IS_LOGIN :
            return {
                ...state,
                isLogin : false,
                userInfor:null,
                carts:[]
            }
        case actionTypes.GET_CART :
            return {
                ...state,
                carts:action.carts
            }
        case actionTypes.MODIFY_PRODUCT_QUANTITY_IN_CART :
            const {productDetailId,cartId} = action.payload
            return {
                ...state,
                carts: state.carts.map(item=>{
                    if(item.productDetailId == productDetailId){
                        return {
                            ...item,
                            quantity: action.payload.action == 'add' ? item.quantity+1 : item.quantity-1
                        }
                    }
                    return item;
                })
            }
        case actionTypes.DELETE_PRODUCT_IN_CART :
            return {
                ...state,
                carts: state.carts.filter(item => !(item.productDetailId === action.payload.productDetailId && item.cartId === action.payload.cartId))
            }
        case actionTypes.CREATE_ORDER :
            return {
                ...state,
                carts:[]
            }
        default:
            return state;
    }
}
export default userReducer;
