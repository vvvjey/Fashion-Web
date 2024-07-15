import {useState,useEffect,useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Header from './Header/header';
import Sidebar from './Sidebar/sidebar';
import './chat.scss'
import socketIOClient from "socket.io-client";

import {userChats,getMessage,addMessage} from '../../services/userServices';
const host = "http://localhost:5000";

function Chat() {
    let [userChatList,setUserChatList] = useState(null);
    let [messagesChatBox,setMessagesChatBox] = useState(null);
    let [receiverInfor,setReceiverInfor] = useState(null);
    let [messageInput,setMessageInput] = useState("");
    let [chatId,setChatId] = useState(null);
    let [onlineUsers,setOnlineUsers] = useState([]);
    let [receiveMessage,setReceiveMessage] = useState(null);
    let dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer);
    useEffect(()=>{
        const loadChatUserList = async()=>{
            let chatUsers = await userChats(user.userInfor.id);
            if(chatUsers.data.data.errCode==0){
                setUserChatList(chatUsers.data.data.chats);
            }
        }
        loadChatUserList();
    },[])    

    const scroll = useRef();
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(host);

        socketRef.current.emit("new-user-add", user.userInfor.id);

        socketRef.current.on('get-users',(data)=>{
            setOnlineUsers(data)
        })

        socketRef.current.on('receive-message',(data)=>{
            setReceiveMessage(data);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    
    useEffect(()=>{
        if(receiveMessage !== null && receiveMessage.chatId === chatId)
        setMessagesChatBox([...messagesChatBox,receiveMessage])


    },[receiveMessage]);
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messagesChatBox])
    let handleChooseUser = async (chatId,userInfor)=>{
        let response = await getMessage(chatId);
        if(response.data.data.errCode==0){
            setMessagesChatBox(response.data.data.message);
            setReceiverInfor(userInfor);
            setChatId(chatId);
        }
    }
    let handleSendChat = async ()=>{
        let response = await addMessage({
            chatId:chatId,
            senderId:user.userInfor.id,
            text:messageInput
        })
        if(response.data.data.errCode==0){
            setMessageInput("")
        }
        const dataMsg = {
            chatId:chatId,
            receiverId:receiverInfor.id,
            senderId:user.userInfor.id,
            text:messageInput,
            chatId:chatId
        }
        socketRef.current.emit('sendMsgClient', dataMsg)
        setMessagesChatBox([...messagesChatBox,dataMsg])
    }

    let checkOnlineStatus = (userId)=>{
        let status = onlineUsers.some((user)=>user.userId==userId);
        if(status){
            return "Online"
        } else {
            return "Offline"
        }
    }

    console.log(messagesChatBox)
    return (
        <div className='chat-container'>
            <Header></Header>
            <div className='content'>
                <div className='user-list'> 
                    <h2 style={{marginBottom:"20px"}}>Chats</h2>
                    {
                        userChatList && userChatList.map((item,index)=>{
                            return(
                                <div 
                                    key={index}
                                    className='user-item' 
                                    onClick={()=>{handleChooseUser(item.chatId,user.userInfor.id == item.UserA.id ? item.UserB : item.UserA )}}
                                >
                                    <div className='content-left'>
                                        <img className='user-item-img' src='https://cdn.iconscout.com/icon/free/png-256/free-account-2375512-1989469.png'></img>
                                    </div>
                                    <div className='content-right'>
                                        <span>{user.userInfor.id == item.UserA.id ? item.UserB.username : item.UserA.username}</span>
                                        <span>{checkOnlineStatus(user.userInfor.id == item.UserA.id ? item.UserB.id : item.UserA.id)}</span>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                <div className='chatbox'>
                    <div className='chatbox-header'>
                        {
                            receiverInfor ? (
                                <>
                                    <img className='chatbox-img' src="https://cdn.iconscout.com/icon/free/png-256/free-account-2375512-1989469.png"></img>
                                    <p className="chatbox-name">{receiverInfor.username}</p>
                                </>
                                
                            )
                            : 
                            <div></div>

                        }
                        
                    </div>
                    <div className='chat-section'>
                        {
                            messagesChatBox ? messagesChatBox.map((item,index)=>{
                                return(
                                    <div 
                                        className={`message-item ${user.userInfor.id==item.senderId ? "send" : "receive"}`}
                                        key={index}
                                        ref={scroll}
                                    >
                                        <span className='message-item-text'>
                                            {item.text}
                                        </span>
                                        <span className='message-item-time'>
                                            3 min ago
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <div>
                                Pick a conversation to chat !
                            </div>
                        }
                    </div>
                    <div className='input-enter'>
                        <input 
                            className='input-chat'
                            type='text'
                            placeholder='Type a message'
                            value={messageInput}
                            disabled={receiverInfor ? false : true}
                            onChange={(e)=>{setMessageInput(e.target.value)}}
                        >

                        </input>
                        <button 
                            className='send-message'
                            onClick={handleSendChat}
                        >Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat;
