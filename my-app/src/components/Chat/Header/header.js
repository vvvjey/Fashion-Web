import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import './header.scss'
function Header() {
    return (
        <div className='chat-header'>
            <input className='find-user-input' type='text' placeholder='Find someone'></input>
        </div>
    );
}
export default Header;
