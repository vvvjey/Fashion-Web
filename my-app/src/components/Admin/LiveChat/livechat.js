import {useState,useEffect,useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Sidebar from '../Sidebar/sidebar';
import AdminHeader from '../Header/header';
import './livechat.scss';
import socketIOClient from "socket.io-client";

import {userChats,getMessage,addMessage} from '../../../services/userServices';
const host = "http://localhost:5000";

function LiveChat() {
    let [userChatList,setUserChatList] = useState(null);
    let [receiverInfor,setReceiverInfor] = useState(null);
    let [chatId,setChatId] = useState(null);
    let [messagesChatBox,setMessagesChatBox] = useState(null);
    let [onlineUsers,setOnlineUsers] = useState([]);
    let [receiveMessage,setReceiveMessage] = useState(null);
    let [messageInput,setMessageInput] = useState("");


    const scroll = useRef();
    const socketRef = useRef();

    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messagesChatBox])
    useEffect(()=>{
        const loadChatUserList = async()=>{
            let chatUsers = await userChats(14);
            console.log(chatUsers)
            if(chatUsers.data.data.errCode==0){
                setUserChatList(chatUsers.data.data.chats);
            }
        }
        loadChatUserList();
    },[])    
    useEffect(() => {
        socketRef.current = socketIOClient(host);

        socketRef.current.emit("new-user-add", 14);

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
    let checkOnlineStatus = (userId)=>{
        let status = onlineUsers.some((user)=>user.userId==userId);
        if(status){
            return "Online"
        } else {
            return "Offline"
        }
    }
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
            senderId:14,
            text:messageInput
        })
        if(response.data.data.errCode==0){
            setMessageInput("")
        }
        const dataMsg = {
            chatId:chatId,
            receiverId:receiverInfor.id,
            senderId:14,
            text:messageInput,
            chatId:chatId
        }
        socketRef.current.emit('sendMsgClient', dataMsg)
        setMessagesChatBox([...messagesChatBox,dataMsg])
    }
    return (
        <div className='live-chat-container'>
            <Sidebar className="sidebar"></Sidebar>
            <div className='content-right'>
                <AdminHeader></AdminHeader>
                <div className='content'>
                    <div className='user-list'>
                    {
                        userChatList && userChatList.map((item,index)=>{
                            return(
                                <div 
                                    key={index}
                                    className='user-item' 
                                    onClick={()=>{handleChooseUser(item.chatId,14 == item.UserA.id ? item.UserB : item.UserA )}}
                                >
                                    <div className='content-left'>
                                        <img className='user-item-img' src='https://cdn.iconscout.com/icon/free/png-256/free-account-2375512-1989469.png'></img>
                                    </div>
                                    <div className='content-right'>
                                        <span>{14 == item.UserA.id ? item.UserB.username : item.UserA.username}</span>
                                        <span>{checkOnlineStatus(14 == item.UserA.id ? item.UserB.id : item.UserA.id)}</span>
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
                                            className={`message-item ${14==item.senderId ? "admin" : "client"}`}
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
        </div>
    );
}
export default LiveChat;
