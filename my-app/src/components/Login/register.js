import { useSelector, useDispatch } from "react-redux";
import {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import './login.scss';
import {login,test} from '../../services/userServices'
import { registerAction } from "../../store/actions/userAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    let [username,setUsername] = useState('');
    let [gmail,setGmail] = useState('');
    let [password,setPassword] = useState('');
    let [repassword,setRepassword] = useState('');
    let [address,setAddress] = useState('');

    
    // useEffect(() => {
    //     // This effect will run whenever statusLogin changes
    //     // You can perform any actions here based on the updated state
    //     console.log('statusLogin updated:', statusLogin);
    //   }, [statusLogin]);
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    console.log('user ne :',user)
    function handleRegister(){
        if(password!==repassword){
            toast.error("Repassword isn't the same to password")
        } else {
            dispatch(registerAction({
            username:username,
            email:gmail,
            password:password,
            address:address
            })).then((response) => {
                console.log('response',response)
                if (response && response.error) {
                    toast.error(response.error.message);
                } else {
                    toast.success("Registration successful");
                }
            });
        }
    }
    return (
        <>
            <div className="main">
                <p className="sign" align="center">Sign up</p>
                <form className="form1"></form>
                    <input 
                        type='text' 
                        className='un'
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <input 
                        type='text' 
                        className='un'
                        value={gmail}
                        placeholder="Gmail"
                        onChange={(e) => setGmail(e.target.value)}
                    ></input>
                    <input 
                        type='password' 
                        className='pass'
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <input 
                        type='password' 
                        className='pass'
                        value={repassword}
                        placeholder="Re-Password"
                        onChange={(e) => setRepassword(e.target.value)}
                    ></input>
                    <input 
                        type='text' 
                        className='pass'
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                    <a onClick={()=>{
                        handleRegister()
                    }} className="submit" align="center">Sign up</a>
                <Link to="/login" className="sign-up" align="center" style={{marginTop:"20px"}}>Sign in</Link>
            </div>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
    
            />
        </>
        
    )
}
export default Login;
