const db = require('../models/index')
const {runPythonScript} = require('../helper/python');
const { Op } = require('sequelize');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

let createProduct = (data,imgFile) => {
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
                console.log('data ne : ',data)
                
                // Handle upload image
                const b64 = Buffer.from(imgFile.buffer).toString("base64");
                let dataURI = "data:" + imgFile.mimetype + ";base64," + b64;
                const imgUrl = await handleUpload(dataURI);
                // 

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
                        img:imgUrl.secure_url

                    })
                } else {
                    newProduct = isExistProduct;
                    newProductDetail = await db.Product_detail.create({
                        productId:isExistProduct.productId,
                        size:data.size,
                        color:data.color,
                        stock:data.stock,
                        img:imgUrl.secure_url
                    })
                }
                resolve(
                    {
                        errCode:0,
                        errMessage:"Ok!",
                        // newProduct,
                        // newProductDetail
                    }
                )
            }
        } catch (error) {
            if (error.errors && error.errors.length > 0 && error.errors[0].message === "uniqueConstraint must be unique") {
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
let fiveMostRatingProduct = () =>{
    return new Promise(async(resolve,reject)=>{
        try {
            runPythonScript()
            .then(async result=>{
                let products = await db.Product.findAll({
                    where: {
                      productId: {
                        [Op.in]: result
                      }
                    },
                    include:[
                        {
                            model : db.Product_detail
                        }
                    ]
                  });
                resolve({
                    errCode:0,
                    products
                })
            })
            .catch(error=>{
                reject({
                    error
                })
            })
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
    deleteProduct,
    fiveMostRatingProduct
}