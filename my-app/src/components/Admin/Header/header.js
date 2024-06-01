import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import './header.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.css';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { adminLogoutAction } from '../../../store/actions/adminAction';
function AdminHeader() {
    const [admin, setAdmin] = useState(null);
    const user = useSelector((state) => state.adminReducer);
    let dispatch = useDispatch()

    useEffect(() => {
        setAdmin(user.adminInfor);
    }, [user]); // Make sure to update admin state when user changes
    
    return (
        <div className='header'>
            <div className='infor'>
                Xin chào, {admin?.username ? admin.username : ""} <FontAwesomeIcon className="infor-nav-down" icon={faAngleDown} />
                <ul className='infor-menu'>
                    <li onClick={()=>{
                        window.location.href="/admin";
                        dispatch(adminLogoutAction())
                    }}>
                        Log out
                    </li>
                </ul>
            </div>
            {/* Use optional chaining (?) to prevent accessing properties of null */}
        </div>
    );
}

export default AdminHeader;
