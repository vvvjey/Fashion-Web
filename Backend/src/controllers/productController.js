var productService = require("../services/productService")




let createProduct = async(req,res) =>{
    try{
        let data = await productService.createProduct(req.body,req.file);
        return res.status(200).json({
            data
        })
    } catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}  
let getAllProduct = async(req,res) =>{
    try {
        console.log(req.body.data)
        let data = await productService.getAllProduct(req.body.data);
        return res.status(200).json({
            data
        })
    } catch (error) {
        console.log(e)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let getAllProductByCategory = async(req,res) =>{
    try {
        console.log(req.query)
        let data = await productService.getAllProductByCategory(req.query);
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
let getProductById = async(req,res) =>{
    try {
        console.log(req.query)
        let data = await productService.getProductById(req.query);
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
let getFiveNewestProducts = async(req,res) => {
    try {
        let data = await productService.getFiveNewestProducts(req.body);
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
let deleteProduct = async(req,res) => {
    try {
        let data = await productService.deleteProduct(req.body);
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
let fiveMostRatingProduct = async(req,res) => {
    try {
        let data = await productService.fiveMostRatingProduct();
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
    createProduct,
    getAllProduct,
    getAllProductByCategory,
    getProductById,
    getFiveNewestProducts,
    deleteProduct,
    fiveMostRatingProduct
}