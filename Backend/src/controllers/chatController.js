let chatService = require('../services/chatService');
let createChat = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await chatService.createChat(req.body.data);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let findChat = async(req,res)=>{
    try {
        console.log(req.query)
        let data = await chatService.findChat(req.query);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let userChats = async(req,res)=>{
    try {
        console.log(req.query)
        let data = await chatService.userChats(req.query);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let addMessage = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await chatService.addMessage(req.body.data);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let getMessage = async(req,res)=>{
    try {
        let data = await chatService.getMessage(req.query);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}   
module.exports={
    createChat,
    findChat,
    userChats,
    addMessage,
    getMessage
}