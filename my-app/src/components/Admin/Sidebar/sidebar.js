import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './sidebar.scss'
function Sidebar() {
    return (
            <div className='sidebar'>
                <h1 className='logo'>LOGO</h1>
                <div className='menu-container'>
                    <h4 className='title'>Dashboard</h4>
                    <ul className='function'>
                        <li className='item'>
                            <Link to="/admin/dashboard">
                                Dashboard 1
                            </Link>
                        </li>
                    </ul>
                    <h4 className='title'>Product</h4>
                    <ul className='function'>
                        <li className='item'>
                            <Link to="/admin/product">
                                View product
                            </Link>
                        </li>   
                       
                    </ul>
                    <h4 className='title'>User</h4>
                    <ul className='function'>
                        <li className='item'>
                            <Link to="/admin/user">
                                View user
                            </Link>
                        </li> 
                    </ul>
                    <h4 className='title'>Order</h4>
                    <ul className='function'>
                        <li className='item'>
                            <Link to="/admin/order">
                                View order
                            </Link>
                        </li> 
                    </ul>
                    <h4 className='title'>Chat</h4>
                    <ul className='function'>
                        <li className='item'>
                            <Link to="/admin/chat">
                                Contact to customer
                            </Link>
                        </li> 
                    </ul>
                </div>
            </div>
    );
}
export default Sidebar;
