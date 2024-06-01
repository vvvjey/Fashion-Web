import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./payment.scss"
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import { removeProductInCart,checkoutAction } from "../../../store/actions/userAction"
import { createOrder } from '../../../services/userServices';
import _ from "lodash"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PaymentPage() {
    const [carts,setCarts] = useState(null)
    const [subtotal,setSubtotal] = useState(null)
    const [total,setTotal] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('COD'); 
    const [selectedAddress, setSelectedAddress] = useState('UserAddress'); 
    const [addressShipping,setAddressShipping] = useState('')
    const [name,setName] = useState('')

    const user = useSelector((state) => state.userReducer);
    let dispatch = useDispatch()
    console.log(user)
    useEffect(()=>{
        if(selectedAddress == 'UserAddress'){
            setAddressShipping(user.userInfor.address)
            setName(user.userInfor.username)
        } else {
            setAddressShipping("")
            setName("")
        }
    },[selectedAddress])
    useEffect(()=>{
        setCarts(user.carts)
        calculateSubTotal()

    },[user.carts])
    function deleteProductInCart(productDetailId,cartId){
        const data = {
            productDetailId:productDetailId,
            cartId:cartId
        }
        dispatch(removeProductInCart(data))
    }
    function calculateSubTotal(){
        let total=0;
        user.carts.map((item)=>{
            total+=item.quantity*item.Product_detail.Product.price
        })
        setSubtotal(total)
        setTotal(total+2)
    }
    async function handleCheckout(){
        if (_.isEmpty(carts)){
            toast.error("Pls add product to checkout !")
        } else {
            dispatch(checkoutAction({
                userId:user.userInfor.id,
                addressShipping:addressShipping,
                total:total,
                productsInfor:user.carts,
            }))
            window.location.href="/"
        }
    }
    console.log(user)
    return (
        <div>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
            <Header></Header>
            <div className='payment-container'>
                <div className='content-left'>
                    <div className='heading'>
                        Shopping Cart.
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th colSpan={2}>
                                    Product
                                </th>
                                <th>
                                    Size
                                </th>
                                <th>
                                    Color
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Total price
                                </th>
                                <th>
                                </th>
                            </tr>
                            {
                                carts && 
                                carts.map((item,index)=>{
                                    return (
                                    <tr className='row-payment' key={index}>
                                        <th >
                                            <img className='img' src={`${item.Product_detail.img}`}></img>
                                        </th>
                                        <th className='name'>
                                            <span>{item.Product_detail.Product.name}</span>
                                        </th>
                                        <th>{item.Product_detail.size}</th>
                                        <th>{item.Product_detail.color}</th>
                                        <th>{item.quantity}</th>
                                        <th>{item.Product_detail.Product.price}</th>
                                        <th>{item.Product_detail.Product.price * item.quantity}</th>
                                        <th className='delete-btn' onClick={()=>{deleteProductInCart(item.Product_detail.productDetailId,item.cartId)}}>x</th>
                                </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                    <div className='total'>
                        <div className='continue-shopping' onClick={()=>{window.location.href="/"}}>
                            Continue shopping
                        </div>
                        <div className='cost'>
                            <div className='sub-total'>Subtotal : 
                                {subtotal} $
                            </div>
                            <div className='shipping-cost'>Shipping : 2 $</div>
                            <div className='total-cost'>Total : 
                                {total} $
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content-right'>
                    <div className='heading'>
                        Payment Infor.
                    </div>
                    <div className='method'>
                        <span>Payment Method</span>
                        <div className={`payment-method ${paymentMethod === 'COD' ? 'active' : ''}`} onClick={() => setPaymentMethod('COD')}>
                            <input type="checkbox" name="paymentMethod" checked={paymentMethod === 'COD'} onChange={() => {}} />
                            <span>COD</span>
                        </div>
                        <div className={`payment-method ${paymentMethod === 'Banking' ? 'active' : ''}`} onClick={() => setPaymentMethod('Banking')}>
                            <input type="checkbox" name="paymentMethod" checked={paymentMethod === 'Banking'} onChange={() => {}} />
                            <span>Banking</span>
                        </div>
                    </div>
                    <div className='method'>
                        <span>Address</span>
                        <div className={`payment-method ${selectedAddress === 'UserAddress' ? 'active' : ''}`} onClick={() => setSelectedAddress('UserAddress')}>
                            <input type="checkbox" name="addressOption" checked={selectedAddress === 'UserAddress'} onChange={() => {}} />
                            <span>User address</span>
                        </div>
                        <div className={`payment-method ${selectedAddress === 'CustomAddress' ? 'active' : ''}`} onClick={() => setSelectedAddress('CustomAddress')}>
                            <input type="checkbox" name="addressOption" checked={selectedAddress === 'CustomAddress'} onChange={() => {}} />
                            <span>Custom</span>
                        </div>
                    </div>
                    <div className='user-infor'>
                        <h4>User Infor</h4>
                        <div className='address'>
                            <input type='text' placeholder='Address' value={addressShipping} onChange={(e)=>{setAddressShipping(e.target.value)}}></input>
                        </div>
                        <div className='name'>
                            <input type='text' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                        </div>
                    </div>
                    <button className='checkout-btn' onClick={handleCheckout}>Check out</button>
                 </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default PaymentPage;
