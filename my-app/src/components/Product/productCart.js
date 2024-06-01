import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import './productCart.scss'
import { modifyCartQuantity,removeProductInCart } from "../../../src/store/actions/userAction";
import { getCart } from "../../store/actions/userAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ProductCart(data) {
    let dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer);

    useEffect(() => {
        console.log('trigger',user.carts)
    }, [user.carts]);
    function modifyQuantity(productDetailId,action){
        let cartId = data.productCart[0].cartId
        dispatch(modifyCartQuantity({productDetailId,cartId,action}))
    }
    function deleteProductInCart(productDetailId,cartId){
        const data = {
            productDetailId:productDetailId,
            cartId:cartId
        }
        dispatch(removeProductInCart(data))
    }
    return (
        <>
            {
                user.carts &&
                user.carts.map((item,index)=>{
                    return (
                        <div key={index} className='product-cart-container'>
                            <div className='content-left'>
                                <img src={item.Product_detail.img}></img>
                            </div>
                            <div className='content-right'>
                                <div className='delete-button'>
                                    <FontAwesomeIcon className="close-button" icon={faXmark} onClick={()=>{deleteProductInCart(item.productDetailId,item.cartId)}}/>
                                </div>
                                <div className='name'>
                                    {item.Product_detail.Product.name}
                                </div>
                                <div className='color'>
                                    color : {item.Product_detail.color}
                                </div>
                                <div className='size'>
                                    size : {item.Product_detail.size}
                                </div>
                                <div className='quanitity-price'>
                                    <div className='quantity'>
                                        <div className="number-counter">
                                            <button className="counter-button" data-action="decrement" onClick={()=>{modifyQuantity(item.Product_detail.productDetailId,'subtract')}}>-</button>
                                            <input type="number" className="counter-input" value={item.quantity}  min="0"></input>
                                            <button className="counter-button" data-action="increment" onClick={()=>{modifyQuantity(item.Product_detail.productDetailId,'add')}}>+</button>
                                        </div>
                                    </div>
                                    <div className='price'>
                                        {item.Product_detail.Product.price}$
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </>
    );
}
export default ProductCart;
