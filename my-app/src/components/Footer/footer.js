import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./footer.scss"
function Footer() {
    return (
        <div className='footer-container'>
            <div className='content-left'>
                <ul className='left-item'>
                    <li>Discover</li>
                    <li>About us</li>
                    <li>Privacy notice</li>
                </ul>
                <ul className='left-item'>
                    <li>Follow us</li>
                    <li>FB</li>
                    <li>INSTA</li>
                </ul>
                <ul className='left-item'>
                    <li>Contact</li>
                    <li>hoangtu@gmail.com</li>
                    <li>Mon-Sat 9am-5:30pm GMT +7</li>
                </ul>
            </div>
            <div className='content-right'>
                <h1>LEAVE A LEAD</h1>
                <input placeholder='email'></input>
            </div>
        </div>
    );
}
export default Footer;
