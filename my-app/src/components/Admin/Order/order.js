import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar';
import AdminHeader from '../Header/header';
import './order.scss'
import { getAllOrder,modifyStateOrder } from '../../../services/userServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminOrder() {
    const [orders, setorders] = useState(null);
    const [states, setStates] = useState(["Pending","Delivery","Paymented","Canceled"]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await getAllOrder();
            if (res.data.data.errCode === 0) {
                setorders(res.data.data.orders);
            }
            // Handle response data here
        };
        fetchData();
    }, []);
    let  handleStateChange = async (e, orderId) => {
        const newState = e.target.value;
        let res = await modifyStateOrder({
            orderId:orderId, 
            state :newState
        }); 
        if(res.data.data.errCode ==0 ){
            toast.success("Change state succesfully")
        } else {
            toast.error("Fail to change")
        }
    };
    console.log(orders)
    return (
        <div className='admin-home-container'>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
            <Sidebar className="sidebar"></Sidebar>
            <div className='content-right'>
                <AdminHeader></AdminHeader>
                <div className='content'>
                    <div className='heading'>
                        <span>User</span>
                    </div>
                    <table className='table'>
                            <tbody>
                                <tr>
                                    <td>OrderId</td>
                                    <td >UserId</td>
                                    <td>Total</td>
                                    <td>State</td>
                                    <td >Address Shipping</td>
                                </tr>
                                {   orders &&
                                    orders.map((item,index)=>{
                                        return (
                                            <tr>
                                                <td>{item.orderId}</td>
                                                <td >{item.userId}</td>
                                                <td>{item.total}</td>
                                                <td>
                                                    <select className='select' defaultValue={item.state} onChange={(e) => handleStateChange(e, item.orderId)}>
                                                        {states.map((state, index) => (
                                                            <option key={index} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td >{item.addressShipping}</td>
                                            </tr>
                                        )
                                })}
                            </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
export default AdminOrder;
