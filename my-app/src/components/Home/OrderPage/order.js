import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./order.scss"
import Header from '../../Header/header'
import Footer from '../../Footer/footer'
import { getAllOrderUser,modifyStateOrder,createComment } from '../../../services/userServices';
import _ from "lodash"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { faL, faStar } from "@fortawesome/free-solid-svg-icons";

function OrderPage() {
    const [contentSelection,setContentSelection] = useState('Order')
    const [orders, setorders] = useState(null);
    const [modifyAction, setModifyAction] = useState(false);
    const [isShowRateModal,setIsShowRateModal] = useState(false)
    const [highlightedStars, setHighlightedStars] = useState(5);
    const [commentContent,setCommentContent] = useState('')
    const [orderRate,setOrderRate] = useState(null)

    const user = useSelector((state) => state.userReducer);
    let dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            if(user.isLogin==true){
                let res = await getAllOrderUser(user.userInfor.id,contentSelection);
                console.log(res)
                if (res.data.data.errCode === 0) {
                    setorders(res.data.data.orders);
                } else {
                    setorders(null)
                }
            }
        };
        fetchData();
    }, [contentSelection]);
    useEffect(() => {
        const fetchData = async () => {
            if(user.isLogin==true){
                let res = await getAllOrderUser(user.userInfor.id,contentSelection);
                console.log(res)
                if (res.data.data.errCode === 0) {
                    setorders(res.data.data.orders);
                } else {
                    setorders(null)
                }
            }
        };
        fetchData();
    }, [modifyAction]);
    async function handleCancel(orderId,state){
        if(state!=="Pending"){
            toast.error("Only pending state can cancel!")
        } else {
            let res = await modifyStateOrder({
                orderId:orderId,
                state:'Canceled'
            })
            if(res.data.data.errCode===0){
                toast.success("Cancel order succesfully !")
                setModifyAction(!modifyAction)
            } else {
                toast.error("Cancel order fail !")
            }
        }
    }
    async function handleRate(item){
        setIsShowRateModal(true)
        setOrderRate(item.orderId)
    }
    async function handleSubmitFeedBack(){
        if(!highlightedStars || !commentContent || !orderRate){
            toast.error("Pls fill the rest information")
        } else {
            console.log(highlightedStars,commentContent,orderRate)
            let comment = await createComment({
                description:commentContent,
                starRate:highlightedStars,
                orderId:orderRate
            })
            console.log('commment ne',comment)
            setIsShowRateModal(false)
            setCommentContent(null)
            setHighlightedStars(5)
            setOrderRate(null)
            toast.success("Send feedback successfully")
        }
    }
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={i <= highlightedStars ? 'star-icon highlighted' : 'star-icon'}
              onClick={() => {setHighlightedStars(i);
              }}
            />
          );
        }
        return stars;
      };
    return (
        <div>
            <Header ></Header>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
            <div className='order-container'>
                
                <div className='heading'>
                    <span className='title'>Order</span>
                    <input type='text' className='search' placeholder='Search for sthing'></input>
                </div>
                <div className='category'>
                <span className={contentSelection === 'Order' ? 'item active' : 'item'} onClick={() => setContentSelection('Order')}>Order</span>
                <span className={contentSelection === 'Pending' ? 'item active' : 'item'} onClick={() => setContentSelection('Pending')}>Pending</span> 
                <span className={contentSelection === 'Delivery' ? 'item active' : 'item'} onClick={() => setContentSelection('Delivery')}>Delivery</span>
                <span className={contentSelection === 'Paymented' ? 'item active' : 'item'} onClick={() => setContentSelection('Paymented')}>Payment</span>
                <span className={contentSelection === 'Canceled' ? 'item active' : 'item'} onClick={() => setContentSelection('Canceled')}>Canceled</span>
            </div>
                <div className='content'>
                    <div className='order-content'>
                        {
                            _.isEmpty(orders) ? 
                            <div>Nothing here !</div>
                            :
                            <table>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Products</th>
                                        <th>Price</th>
                                        <th>State</th>
                                        {
                                            contentSelection == "Order" ?
                                            <></>
                                            :
                                            <th>Action</th>
                                        }
                                    </tr>
                                    {
                                        orders &&
                                        orders.map((item,index)=>{
                                            return(
                                                <tr>
                                                    <th>{index+1} </th>
                                                    <th className='products'>
                                                        {
                                                            item.Order_details.map((itemChildren,indexChildren)=>{
                                                                return(
                                                                    <div className='item'>
                                                                        <div className='item-product'>
                                                                            <img src={`${itemChildren.Product_details[0] ? itemChildren.Product_details[0].img : ""}`}></img>
                                                                        </div>
                                                                        <span className='item-quantity'>x{itemChildren ? itemChildren.quantity : ""}</span>
                                                                        <span className='item-name'>{itemChildren.Product_details[0] ? itemChildren.Product_details[0].Product.name : ""}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </th>
                                                    <th>{item.total}$</th>
                                                    <th>{item.state}</th>
                                                    <th>
                                                        {
                                                            console.log('he',item)
                                                        }
                                                        {
                                                            !item.isRate && contentSelection == "Paymented" 
                                                            ? 
                                                            <button className='cancel-btn' onClick={()=>{handleRate(item)}}>Rate</button>
                                                            : 
                                                            item.isRate && contentSelection == "Paymented"
                                                            ?
                                                            <button className='cancel-btn' onClick={()=>{}}>Rated!</button>
                                                            :
                                                            contentSelection =="Delivery" 
                                                            ?
                                                            <div>Waiting</div>
                                                            :
                                                            contentSelection =="Canceled" 
                                                            ?
                                                            <div></div>
                                                            : 
                                                            contentSelection =="Order" ?
                                                            <></>
                                                            :
                                                            <button className='cancel-btn' onClick={()=>{handleCancel(item.orderId,item.state)}}>Cancel</button>
                                                        }
                                                    </th>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                    {
                        isShowRateModal && 

                        <div className='create-modal'>
                            <div className='modal-overlay'></div>
                            <div className='modal-container'>
                                <div className='modal-heading'>
                                    <span >Give us your idea!</span>
                                    <span className='close-btn' onClick={()=>{setIsShowRateModal(false)}}>x</span>
                                </div>
                                <div className='modal-content'>
                                    <div className='rate-section'>
                                        <label>Quality : </label>  {renderStars()}
                                        
                                    </div>
                                    <div className='comment-section'>
                                        <div className='comment-heading'>Your idea</div>
                                        <textarea 
                                            className='comment-content'
                                            onChange={(e)=>{setCommentContent(e.target.value)}}
                                        ></textarea>
                                    </div>
                                    {/* <div className='form-input'>
                                        <label>Name</label>
                                        <input
                                            type='text'
                                            className='modal-input'
                                            placeholder='Name of product'
                                            value={modalName}
                                            onChange={(e) => setModalName(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className='form-input'>
                                        <label>Size</label>
                                        <input
                                            type='text'
                                            className='modal-input'
                                            placeholder='Size of product'
                                            value={modalSize}
                                            onChange={(e) => setModalSize(e.target.value)}
                                        ></input>
                                    </div> */}

                                </div>
                                <div className='modal-create'>
                                    <button onClick={()=>{handleSubmitFeedBack()}}>Send</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer ></Footer>
        </div>
    );
}
export default OrderPage;
