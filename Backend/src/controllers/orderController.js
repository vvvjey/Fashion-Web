var orderService = require('../services/orderService')
let createOrder = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await orderService.createOrder(req.body.data);
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
let getAllOrder = async(req,res)=>{
    try {
        let data = await orderService.getAllOrder();
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
let getAllOrderUser = async(req,res)=>{
    try {
        let data = await orderService.getAllOrderUser(req.query.userId,req.query.contentSelection);
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
let modifyStateOrder = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await orderService.modifyStateOrder(req.body.data);
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
    createOrder,
    getAllOrder,
    getAllOrderUser,
    modifyStateOrder
 }