const { Model } = require('sequelize');
const db = require('../models/index')
let createOrder = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
           if(!data.userId || !data.addressShipping || !data.productsInfor || !data.total ){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter"
                });
           } else {
                let order = await db.Order.create({
                    userId:data.userId,
                    addressShipping:data.addressShipping,
                    total:data.total,
                    state:"Pending",
                    isRate:false
                })
                await data.productsInfor.map(async(item)=>{
                    await db.Order_detail.create({
                        orderId:order.orderId,
                        productDetailId:item.productDetailId,
                        quantity:item.quantity,
                    })
                })
                // DELETE CART
                let cart = await db.Cart.findOne({
                    where:{
                        userId:data.userId
                    }
                }) 
                if(!cart){
                    resolve({
                        errCode: 1,
                        message: "Cannot find cart"
                    });
                }
                await db.Cart_detail.destroy({
                    where: {
                        cartId: cart.cartId
                    }
                });
                resolve({
                    errCode: 0,
                    message: "Create success"
                });
           }
           
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrder = () =>{
    return new Promise(async(resolve, reject) => {
        try {
            let orders = await db.Order.findAll({
                include: [
                    {
                        model: db.Order_detail,
                        include:[
                            {
                                model:db.Product_detail,
                                include:[
                                    {
                                        model:db.Product
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            
        //    console.log(orders[0].Order_details)
    
           if(!orders) {
                resolve({
                    errCode: 0,
                    message: "There no order"
                });
           } else {
                resolve({
                    errCode: 0,
                    message: "Success",
                    orders
                });
           }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrderUser = (userId,contentSelection) => {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(contentSelection)
            if(!userId && !contentSelection){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter"
                });
            }
            let orders=null;
            if(contentSelection=="Order"){
                 orders = await db.Order.findAll({
                    where:{
                        userId:userId
                    },
                    include: [
                        {
                            model: db.Order_detail,
                            include:[
                                {
                                    model:db.Product_detail,
                                    include:[
                                        {
                                            model:db.Product
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
            } else {
                 orders = await db.Order.findAll({
                    where:{
                        userId:userId,
                        state:contentSelection
                    },
                    include: [
                        {
                            model: db.Order_detail,
                            include:[
                                {
                                    model:db.Product_detail,
                                    include:[
                                        {
                                            model:db.Product
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
            }
            
        //    console.log(orders[0].Order_details)
    
           if(!orders) {
                resolve({
                    errCode: 0,
                    message: "There no order"
                });
           } else {
                resolve({
                    errCode: 0,
                    message: "Success",
                    orders
                });
           }
        } catch (error) {
            reject(error)
        }
    })
}
let modifyStateOrder = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.orderId || !data.state){
                resolve({
                    errCode: 1,
                    message: "Missing required parameter",
                    
                });
            } else {
                console.log(data)
                let order = await db.Order.findOne({
                    where:{
                        orderId:data.orderId
                    }
                })
                if(!order){
                    resolve({
                        errCode: 1,
                        message: "Cannot find this order",
                    });
                }
                order.state = data.state
                let res = await order.save()
                resolve({
                    errCode: 0,
                    message: "Modify state successfully",
                    res
                });
           }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports={
    createOrder,
    getAllOrder,
    modifyStateOrder,
    getAllOrderUser
}