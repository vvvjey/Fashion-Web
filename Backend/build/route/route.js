"use strict";

var express = require("express");
var userController = require('../controllers/userController');
var productController = require('../controllers/productController');
var cartController = require('../controllers/cartController');
var orderController = require('../controllers/orderController');
var commentController = require('../controllers/commentController');
var router = express.Router();
var _require = require('../middlewares/verifyToken'),
  verifyAccessToken = _require.verifyAccessToken;
var initWebRoutes = function initWebRoutes(app) {
  router.post('/api/create-user', userController.createUser);
  router.post('/api/create-admin', userController.createAdmin);
  router.post('/api/login-admin', userController.loginAdmin);
  router.get('/api/get-all-user', userController.getAllUser);
  router["delete"]('/api/delete-user', userController.deleteUser);
  router.post('/api/login', userController.login);
  router.post('/api/test', verifyAccessToken, userController.test);
  router.post('/api/refresh-token', userController.refreshAccessToken);

  //Product
  router.post('/api/create-product', productController.createProduct);
  router.get('/api/get-all-product', productController.getAllProduct);
  router.get('/api/get-all-product-by-category', productController.getAllProductByCategory);
  router.get('/api/get-product-by-id', productController.getProductById);
  router.get('/api/get-five-newest-products', productController.getFiveNewestProducts);
  router["delete"]('/api/delete-product', productController.deleteProduct);

  //Cart
  router.get('/api/get-products-from-cart-by-id', cartController.getProductsById);
  router.post('/api/add-product-to-cart', cartController.addProductToCart);
  router.put('/api/modify-product-quantity-in-cart', cartController.modifyProductQuantityInCart);
  router["delete"]('/api/delete-product-in-cart', cartController.deleteProductInCart);

  // Order
  router.post('/api/create-order', orderController.createOrder);
  router.get('/api/get-all-order', orderController.getAllOrder);
  router.get('/api/get-all-order-user', orderController.getAllOrderUser);
  router.put('/api/modify-state-order', orderController.modifyStateOrder);

  // Comment
  router.post('/api/create-comment', commentController.createComment);
  router.get('/api/get-comment-by-product-id', commentController.getCommentbyProductId);
  return app.use("/", router);
};
module.exports = initWebRoutes;