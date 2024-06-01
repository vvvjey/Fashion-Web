import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import './login.scss';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLoginAction } from "../../../store/actions/adminAction";
function AdminLogin() {
    let [username,setUsername] = useState('');
    let [password,setPassword] = useState('');
    let [statusLogin,setStatusLogin] = useState('2');
    
    let test1 = async () =>{
        try {
            
            let a = await test();
            console.log('a ne ',a) 
        } catch (error) {
            console.log('error',error)
        }
    }
    // useEffect(() => {
    //     // This effect will run whenever statusLogin changes
    //     // You can perform any actions here based on the updated state
    //     console.log('statusLogin updated:', statusLogin);
    //   }, [statusLogin]);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    
    function handleLogin(){
        if(!username || !password){
            toast.error("Please,enter username and password!")
        } else {
            dispatch(adminLoginAction({
                username:username,
                password:password
            })).then((response) => {
                console.log('response',response)
                if (response && response.error) {
                    toast.error(response.error.message);
                } else {
                    toast.success("Login successful");
                    window.location.href="/admin/dashboard"
                }
            });
        }
    }
    function handleKeyPress (event) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };
    return (
        <>
            <div className="main" style={{paddingBottom:"40px"}}>
                <p className="sign" align="center">Sign in for admin</p>
                <form className="form1"></form>
                    <input 
                        type='text' 
                        className='un'
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={handleKeyPress}

                    ></input>
                    <input 
                        type='password' 
                        className='pass'
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}

                    ></input>
                    <a onClick={()=>{handleLogin()}} className="submit" align="center" >Sign in</a>
                {/* <p className="forgot" align="center"><a href="#"></a>Forgot Password?</p>
                <Link to="/register" className="sign-up" align="center">Sign up</Link> */}
            </div>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
        </>
    )
}
export default AdminLogin;
