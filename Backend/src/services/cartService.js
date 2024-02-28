const db = require('../models/index')
let getProductsById = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            console.log(data)
            if(!data.userId){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                let cart = await db.Cart.findOne({
                    where:{
                        userId:data.userId
                    }
                })
                if(!cart){
                    resolve({
                        errCode:1,
                        errMessage:"Not found cart for this user"
                    }) 
                }
                let carts = await db.Cart_detail.findAll({
                    where:{
                        cartId:cart.cartId
                    },
                    include:[
                        {
                            model:db.Product_detail,
                            include: [
                                {
                                  model: db.Product
                                }
                            ]
                        }
                    ]

                })
                if(carts){
                    resolve({
                        errCode:0,
                        errMessage:"Ok",
                        carts
                    })
                } else {
                    resolve({
                        errCode:1,
                        errMessage:"Cannot find!"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
let addProductToCart = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.size || !data.color || !data.quantity || !data.cartId || !data.productId){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                // Logic add quantity
                let productDetail = await db.Product_detail.findOne({
                    where:{
                        size:data.size,
                        color:data.color,
                        productId:data.productId
                    }
                })
                if(!productDetail){
                    resolve({
                        errCode:1,
                        errMessage:"Cannot find this product detail"
                    })
                }

                let isExistedProductInCart = await db.Cart_detail.findOne({
                    where:{
                        cartId:data.cartId,
                        productDetailId:productDetail.productDetailId
                    }
                })
                if(!isExistedProductInCart){
                    console.log('4')
                    await db.Cart_detail.create({
                        cartId:data.cartId,
                        productDetailId:productDetail.productDetailId,
                        quantity:data.quantity
                    })
                } else {
                    console.log('5')
                    isExistedProductInCart.quantity += data.quantity
                    await isExistedProductInCart.save()
                }
                resolve({
                    errCode:0,
                    errMessage:"Add product successfully"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteProductInCart = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            console.log('dat ne',data)
            if(!data.productDetailId || !data.cartId){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                let isExistedProductInCart = await db.Cart_detail.findOne({
                    where:{
                        cartId:data.cartId,
                        productDetailId:data.productDetailId
                    }
                })
                if(!isExistedProductInCart){
                    resolve({
                        errCode:1,
                        errMessage:"There no product like this in your cart"
                    })
                } else {
                    await isExistedProductInCart.destroy()
                }
                resolve({
                    errCode:0,
                    errMessage:"Delete product in cart successfully"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let modifyProductQuantityInCart = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            console.log('4',data)
            if(!data.productDetailId || !data.cartId || !data.action){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                let isExistedProductInCart = await db.Cart_detail.findOne({
                    where:{
                        cartId:data.cartId,
                        productDetailId:data.productDetailId
                    }
                })
                if(!isExistedProductInCart){
                    resolve({
                        errCode:1,
                        errMessage:"There no product like this in your cart"
                    })
                } else {
                    if(data.action=="add"){
                        isExistedProductInCart.quantity+=1;
                        await isExistedProductInCart.save();
                    } else if(data.action=="subtract"){
                        isExistedProductInCart.quantity-=1;
                        await isExistedProductInCart.save();
                    } else {
                        resolve({
                            errCode:1,
                            errMessage:"Action fail"
                        })
                    }
                }
                resolve({
                    errCode:0,
                    errMessage:"Modify product in cart successfully"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports={
    addProductToCart,
    getProductsById,
    deleteProductInCart,
    modifyProductQuantityInCart
}