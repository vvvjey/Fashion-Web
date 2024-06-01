import {useState,useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/sidebar'; 
import AdminHeader from '../Header/header';
import {deleteUser,getAllUser} from '../../../services/userServices'
import './user.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminUser() {
    const [users, setUsers] = useState(null);
    const [deleteAction,setDeleteAction] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            let res = await getAllUser();
            if (res.data.data.errCode === 0) {
                setUsers(res.data.data.users);
            }
            // Handle response data here
        };
        fetchData();
    }, [deleteAction]);
    console.log(users)
    async function deleteUserAction(userId){
        let res = await deleteUser({
            userId:userId
        })
        if (res.data.data.errCode==0){
            toast.success("Delete successfully")
            setDeleteAction(!deleteAction)
        } else {
            toast.error("Something fail")
        }
        console.log(res)
    }
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
                                    <td>Id</td>
                                    <td className='name'>Name</td>
                                    <td>Email</td>
                                    <td>Role</td>
                                    <td colSpan={2}>Action</td>
                                </tr>
                                {
                                    users && 
                                    users.map((item,index)=>{
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td className='name'>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role=='R01' ? "User" : "Admin"}</td>
                                                <td colSpan={2}>
                                                    <button className='delete-btn'>Ban</button>
                                                    <button className='delete-btn' onClick={()=>{deleteUserAction(item.id)}}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
export default AdminUser;
