var cartService = require('../services/cartService')
let getProductsById = async(req,res)=>{
    try {
        let data = await cartService.getProductsById(req.query);
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
let addProductToCart = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await cartService.addProductToCart(req.body.data);
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
let deleteProductInCart = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await cartService.deleteProductInCart(req.body);
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
let modifyProductQuantityInCart = async(req,res)=>{
    try {
        console.log('3')
        console.log('modify',req.body)
        let data = await cartService.modifyProductQuantityInCart(req.body.data);
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
    addProductToCart,
    getProductsById,
    deleteProductInCart,
    modifyProductQuantityInCart
}