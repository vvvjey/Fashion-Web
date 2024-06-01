import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from 'react';
import './header.scss';
import Button from 'react-bootstrap/Button';
import ProductCart from "../Product/productCart";
import { Link } from "react-router-dom";
import { logoutAction,getCart } from "../../store/actions/userAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { faAngleDown,faCartShopping,faXmark } from "@fortawesome/free-solid-svg-icons";
import {login,getProductsCartById} from '../../services/userServices'
import Cookies from "js-cookie";

function Header() {
    const [isShowCart,setIsShowCart] = useState(false)
    let dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer);
    console.log(user)
    useEffect(()=>{
        if(user.isLogin){
            dispatch(getCart(user.userInfor.id))
        }
        console.log(user)
    },[])
    function handleCheckout(){
        window.location.href = "/payment"
    }
    console.log('access-token',Cookies.get('access-token'))
    return (
        <>
            <div className="header-container">
                <Link className="home" to="/">Home</Link>
                <div className="search">
                    <input
                        placeholder="Search sthing"
                    ></input>
                </div>
                <div className="infor-bar">
                    {user.isLogin &&
                        <div className="infor-container">
                            <div className="cart">
                                <FontAwesomeIcon className="cart-icon" icon={faCartShopping} onClick={()=>{setIsShowCart(true)}}/>
                            </div>
                            <div className="infor">
                                <div className="infor-name">
                                    {user.userInfor.username}
                                </div>
                                <FontAwesomeIcon className="infor-nav-down" icon={faAngleDown} />
                                <ul className="infor-menu">
                                    <li>
                                        <Link to="/infor">Infor</Link>
                                    </li>
                                    <li>
                                        <Link to="/order">Orders</Link>
                                    </li>
                                    <li onClick={()=>{
                                        window.location.href="/";
                                        dispatch(logoutAction())}
                                        }>Log out</li>
                                </ul>
                            </div>
                        </div> 
                        
                    }
                    {
                        !user.isLogin && 
                        <Link to="/login" className="login">Login</Link>
                    }
                </div>
            </div>
            {
                isShowCart &&
                <div className="cart-container">
                    <div className="cart-overlay"></div>
                    <div className="cart-content">
                        <div className="cart-heading">
                            <h1 className="cart-title">CART</h1>
                            <FontAwesomeIcon className="close-button" icon={faXmark} onClick={()=>{setIsShowCart(false)}}/>
                        </div>
                        <ProductCart productCart={user.carts}/>
                        <button className="checkout" onClick={handleCheckout}>Check out</button>
                    </div>
                </div>
            }
        </>
    )
}
export default Header;
