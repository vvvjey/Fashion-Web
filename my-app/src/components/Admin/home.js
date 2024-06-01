import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar/sidebar';
import AdminHeader from './Header/header';
import './home.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { faWallet,faBox,faTruck,faBan } from "@fortawesome/free-solid-svg-icons"; 
function AdminHome() {
    return (
        <div className='admin-home-container'>
            <Sidebar className="sidebar"></Sidebar>
            <div className='content-right'>
                <AdminHeader></AdminHeader>
                <div className='number-monthly'>
                        <div className='number-monthly-item'>
                            <div className='icon revenue'>
                                <FontAwesomeIcon icon={faWallet} className=''></FontAwesomeIcon>
                            </div>
                            <div className='number'>
                                $236.18k
                            </div>
                            <div className='name'>
                                Total revenue
                            </div>
                        </div>
                        <div className='number-monthly-item'>
                            <div className='icon '>
                                <FontAwesomeIcon icon={faBox} className=''></FontAwesomeIcon>
                            </div>
                            <div className='number'>
                                6.180
                            </div>
                            <div className='name'>
                                Total orders
                            </div>
                        </div>
                        <div className='number-monthly-item'>
                            <div className='icon '>
                                <FontAwesomeIcon icon={faBan} className=''></FontAwesomeIcon>
                            </div>
                            <div className='number'>
                                18
                            </div>
                            <div className='name'>
                                Total cancelled
                            </div>
                        </div>
                        <div className='number-monthly-item'>
                            <div className='icon '>
                                <FontAwesomeIcon icon={faTruck} className=''></FontAwesomeIcon>
                            </div>
                            <div className='number'>
                                1.180
                            </div>
                            <div className='name'>
                                Total delivered
                            </div>
                        </div>
                </div>
                <div className='content'>
                    Content here
                </div>

            </div>
        </div>
    );
}
export default AdminHome;
