const db = require('../models/index')
let createProduct = (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.name || !data.size || !data.color || !data.stock){
                resolve(
                    {
                        errCode:1,
                        errMessage:"Missing required parameter"
                    }
                ) 
            } else {
                let isExistProduct = await db.Product.findOne({
                    where:{
                        name:data.name
                    }
                })
                
                let newProduct=null;
                let newProductDetail=null;
                if(!isExistProduct) {
                    newProduct = await db.Product.create({
                        name:data.name,
                        categoryId:data.categoryId,
                        collectionId:data.collectionId,
                        price:data.price,
                        description:data.description,
                        salePercent:data.salePercent
                    })
                    newProductDetail = await db.Product_detail.create({
                        productId:newProduct.productId,
                        size:data.size,
                        color:data.color,
                        stock:data.stock,
                        img:data.img

                    })
                } else {
                    newProduct = isExistProduct;
                    newProductDetail = await db.Product_detail.create({
                        productId:isExistProduct.productId,
                        size:data.size,
                        color:data.color,
                        stock:data.stock,
                        img:data.img
                    })
                }
                resolve(
                    {
                        errCode:0,
                        errMessage:"Ok!",
                        newProduct,
                        newProductDetail
                    }
                )
            }
        } catch (error) {
            if(error.errors[0].message == "uniqueConstraint must be unique"){
                resolve({
                    errCode:1,
                    errMessage:"Existed product in size,color"
                })
            }
            reject(error)
        }
    })
}
let getAllProduct = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let product = await db.Product.findAll({
                include:[
                    {
                        model:db.Product_detail
                    }
                ]
            })
            if(!product){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Success!",
                    product
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllProductByCategory = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.categoryId){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            }
            let product = await db.Product.findAll({
                where:{
                    categoryId:data.categoryId
                },
                include:[
                    {
                        model:db.Product_detail,
                        attributes:['img'],
                        limit:1
                    }
                ]
            })
            if(!product){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Success",
                    product
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getProductById = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.productId){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            }
            let product = await db.Product.findOne({
                where:{
                    productId:data.productId
                },
                include:[
                    {
                        model:db.Product_detail
                    }
                ]
            })
            if(!product){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Success",
                    product
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getFiveNewestProducts = (data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            let products = await db.Product.findAll({
                order: [['createdAt', 'DESC']],
                limit: 5 ,
                include:[
                    {
                        model : db.Product_detail
                    }
                ]
              });
            if(!products){
                resolve({
                    errCode:1,
                    errMessage:"There no existed product"
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Success",
                    products
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteProduct = (data) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.productDetailId){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                let productDetail = await db.Product_detail.findOne({
                    where:{
                        productDetailId:data.productDetailId
                    }
                })
                if (!productDetail){
                    resolve({
                        errCode:1,
                        errMessage:"find nothing product like this"
                    })
                }
                await productDetail.destroy();
                resolve({
                    errCode: 0,
                    message: "Product detail deleted successfully"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports={
    createProduct,
    getAllProduct,
    getAllProductByCategory,
    getProductById,
    getFiveNewestProducts,
    deleteProduct
}