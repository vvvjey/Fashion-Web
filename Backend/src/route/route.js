const express = require("express");
let userController = require('../controllers/userController');
let productController = require('../controllers/productController');
let cartController = require('../controllers/cartController');
let orderController = require('../controllers/orderController')

let router=express.Router()
let {verifyAccessToken} = require('../middlewares/verifyToken')
let initWebRoutes = (app) => {
    router.post('/api/create-user',userController.createUser);
    router.post('/api/create-admin',userController.createAdmin);
    router.post('/api/login-admin',userController.loginAdmin);
    router.get('/api/get-all-user',userController.getAllUser);
    router.delete('/api/delete-user',userController.deleteUser);
    router.post('/api/login',userController.login);
    router.post('/api/test',verifyAccessToken,userController.test);
    router.post('/api/refresh-token',userController.refreshAccessToken);



    //Product
    router.post('/api/create-product',productController.createProduct);
    router.get('/api/get-all-product',productController.getAllProduct);
    router.get('/api/get-all-product-by-category',productController.getAllProductByCategory);
    router.get('/api/get-product-by-id',productController.getProductById);
    router.get('/api/get-five-newest-products',productController.getFiveNewestProducts);
    router.delete('/api/delete-product',productController.deleteProduct);

    //Cart
    router.get('/api/get-products-from-cart-by-id',cartController.getProductsById);
    router.post('/api/add-product-to-cart',cartController.addProductToCart);
    router.put('/api/modify-product-quantity-in-cart',cartController.modifyProductQuantityInCart);
    router.delete('/api/delete-product-in-cart',cartController.deleteProductInCart);

    // Order
    router.post('/api/create-order',orderController.createOrder);
    router.get('/api/get-all-order',orderController.getAllOrder);
    router.put('/api/modify-state-order',orderController.modifyStateOrder);


    return app.use("/",router)
}
module.exports=  initWebRoutes