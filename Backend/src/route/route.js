const express = require("express");
const upload = require("../middlewares/multerUpload");

let userController = require('../controllers/userController');
let productController = require('../controllers/productController');
let cartController = require('../controllers/cartController');
let orderController = require('../controllers/orderController');
let commentController = require('../controllers/commentController');
let chatController = require('../controllers/chatController');

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
    router.post('/api/create-product',upload.single('img'),productController.createProduct);
    router.get('/api/get-all-product',productController.getAllProduct);
    router.get('/api/get-all-product-by-category',productController.getAllProductByCategory);
    router.get('/api/get-product-by-id',productController.getProductById);
    router.get('/api/get-five-newest-products',productController.getFiveNewestProducts);
    router.delete('/api/delete-product',productController.deleteProduct);
    router.get('/api/get-five-most-rating-product',productController.fiveMostRatingProduct);


    //Cart
    router.get('/api/get-products-from-cart-by-id',cartController.getProductsById);
    router.post('/api/add-product-to-cart',cartController.addProductToCart);
    router.put('/api/modify-product-quantity-in-cart',cartController.modifyProductQuantityInCart);
    router.delete('/api/delete-product-in-cart',cartController.deleteProductInCart);

    // Order
    router.post('/api/create-order',orderController.createOrder);
    router.get('/api/get-all-order',orderController.getAllOrder);
    router.get('/api/get-all-order-user',orderController.getAllOrderUser);
    router.put('/api/modify-state-order',orderController.modifyStateOrder);

    // Comment
    router.post('/api/create-comment',commentController.createComment);
    router.get('/api/get-comment-by-product-id',commentController.getCommentbyProductId);


    // Chat
    router.post('/api/create-chat',chatController.createChat);
    router.get('/api/find-chat',chatController.findChat);
    router.get('/api/user-chats',chatController.userChats);
    router.post('/api/add-message',chatController.addMessage);
    router.get('/api/get-message',chatController.getMessage);


    return app.use("/",router)
}
module.exports=  initWebRoutes