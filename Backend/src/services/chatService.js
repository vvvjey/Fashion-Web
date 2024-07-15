const db = require('../models/index');
const { Op } = require('sequelize');

let createChat = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            }
            let chat = await db.Chat.create({
                senderId:data.senderId,
                receiverId:data.receiverId
            })
            if (!chat){
                resolve({
                    errCode:1,
                    errMessage:"Cannot create"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Create success",
                    chat
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let findChat = (data)=>{
    return new Promise(async(resolve, reject) => {
        console.log('data chat',data);
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            }
            let chat = await db.Chat.findOne(
                {
                    where: {
                        [Op.or]: [
                            {
                                senderId: data.senderId,
                                receiverId: data.receiverId
                            },
                            {
                                senderId: data.receiverId,
                                receiverId: data.senderId
                            }
                        ]
                    }
                
                }
            )
            if (!chat){
                resolve({
                    errCode:1,
                    errMessage:"There no chat for this data"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Find success",
                    chat
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let userChats = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            }
            let chats = await db.Chat.findAll(
                {
                    where: {
                        [Op.or]: [
                            { senderId: data.userId },
                            { receiverId: data.userId }
                        ]
                    },
                    include: [
                        {
                          model: db.User,
                          as: "UserB"
                        },
                        {
                          model: db.User,
                          as: "UserA"
                        }
                      ]
                }   
            )
            resolve({
                errCode:0,
                errMessage:"Find success",
                chats
            })

        } catch (error) {
            reject(error)
        }
    })
}
let addMessage = (data) =>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            }
            let message = await db.Message.create(
                {
                    senderId:data.senderId,
                    chatId:data.chatId,
                    text:data.text
                }
            )
            resolve({
                errCode:0,
                errMessage:"create success",
                message
            })

        } catch (error) {
            reject(error)
        }
    })
}
let getMessage = (data) =>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            };
            let message = await db.Message.findAll(
                {
                    where:{
                        chatId:data.chatId,
                    }
                }
            );
            if(!message) {
                resolve({
                    errCode:1,
                    errMessage:"Error in finding"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"find success",
                    message
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports={
    createChat,
    findChat,
    userChats,
    addMessage,
    getMessage
}