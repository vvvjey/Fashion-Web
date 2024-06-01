import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./infor.scss"
import Header from '../Header/header';
import Footer from '../Footer/footer';
function Infor() {
    return (
        <div className='infor-container'>
            <Header></Header>
            <div className='infor-content'>
                <h1>Infor here </h1>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default Infor;
