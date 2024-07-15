import {useState,useEffect,useRef} from 'react';
import { useSelector, useDispatch } from "react-redux";
import './livechat.scss';
import livechatImg from '../../../assets/img/Jey_chat-removebg-preview.png';
import socketIOClient from "socket.io-client";
import {getMessage,findChat,addMessage,createChat} from '../../../services/userServices';


function LiveChat() {
    const host = "http://localhost:5000";
    let [isChatBoxOpen,setIsChatBoxOpen] = useState(false);
    let [receiveMessage,setReceiveMessage] = useState(null);
    let [messagesChatBox,setMessagesChatBox] = useState(null);
    let [chatId,setChatId] = useState(null);
    let [messageInput,setMessageInput] = useState("");

    let dispatch = useDispatch()
    const user = useSelector((state) => state.userReducer);
    const socketRef = useRef();
    const scroll = useRef();

    useEffect(() => {
        if(user.userInfor){

            socketRef.current = socketIOClient(host);
    
            socketRef.current.emit("new-user-add", user.userInfor.id);
    
    
            socketRef.current.on('receive-message',(data)=>{
                setReceiveMessage(data);
            });
    
            return () => {
                socketRef.current.disconnect();
            };
        }
    }, []);
    useEffect(()=>{
        if(user.userInfor){
            let getChat = async( )=>{
                let chat = await findChat(user.userInfor.id,14);
                console.log('chat',chat)
                if(chat.data.data.errCode==0){
                    setChatId(chat.data.data.chat.chatId);
                } else {
                    let newChat = await createChat(
                        {senderId:user.userInfor.id,
                            receiverId:14
                        });
                    console.log(newChat)
                    setChatId(newChat.data.data.chat.chatId);
                }
    
            } 
            getChat();
        }
    },[])
    useEffect(()=>{
        if(receiveMessage !== null && receiveMessage.chatId === chatId)
        setMessagesChatBox([...messagesChatBox,receiveMessage])


    },[receiveMessage]);
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messagesChatBox])
    let handleOpenChatbox = async () =>{
        setIsChatBoxOpen(true);
        let response = await getMessage(chatId);
        if(response.data.data.errCode==0){
            setMessagesChatBox(response.data.data.message);
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
            receiverId:14,
            senderId:user.userInfor.id,
            text:messageInput,
            chatId:chatId
        }
        socketRef.current.emit('sendMsgClient', dataMsg)
        setMessagesChatBox([...messagesChatBox,dataMsg])
    }
    return (
        <div className='livechat-container'>
            <img className={`livechat-logo ${isChatBoxOpen == true ? "hide" : ""}`} src={livechatImg} onClick={()=>{handleOpenChatbox()}}></img>
            <div className={`chatbox ${isChatBoxOpen == true ? "active" : ""}`} >
                <div className='header'>
                    <span className='name'>Chat to us</span>
                    <span className='turn-off-btn' onClick={()=>{setIsChatBoxOpen(false)}}>X</span>
                </div>
                <div className='content'>
                        {
                            messagesChatBox ? messagesChatBox.map((item,index)=>{
                                return(
                                    <div 
                                        className={`message-item ${user.userInfor.id==item.senderId ? "client" : "admin"}`}
                                        key={index}
                                        ref={scroll}
                                    >
                                        <span className='message-item-text'>
                                            {item.text}
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <div>
                                If u have question , feel free to ask us
                            </div>
                        }
       
                </div>
                <div className='input-message'>
                    <input 
                        type='text' 
                        className='input' 
                        onChange={(e)=>{setMessageInput(e.target.value)}}
                        value={messageInput}

                    ></input>
                    <button className='send' onClick={handleSendChat}>Send</button>
                </div>
            </div>
        </div>
    );
}
export default LiveChat;
