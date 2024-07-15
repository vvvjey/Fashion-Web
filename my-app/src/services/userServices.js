import axios from '../axios';
let createUser = (data) => {
    return axios.post(`/api/create-user`, {data})
}
let getAllUser = () => {
    return axios.get(`/api/get-all-user`)
}
let deleteUser = (data) => {
    return axios.delete(`/api/delete-user`,{data})
}
let login = (data) => {
    return axios.post(`/api/login`, {data})
}
let loginAdmin = (data) => {
    return axios.post(`/api/login-admin`, {data})
}
let register = (data) => {
    return axios.post(`/api/create-user`, {data})
}
let test = () => {
    return axios.post(`/api/test`)
}
let refreshAccessToken = (refreshToken) => {
    return axios.post(`/api/refresh-token`,{refreshToken})
}
// PRODUCT
let getAllProduct = () => {
    return axios.get(`/api/get-all-product`)
}
let getAllProductByCategory = (categoryId) => {
    return axios.get(`/api/get-all-product-by-category?categoryId=${categoryId}`)
}
let getProductById = (productId) => {
    return axios.get(`/api/get-product-by-id?productId=${productId}`)
}
let getFiveNewestProducts = () => {
    return axios.get(`/api/get-five-newest-products`)
}
let getFiveMostRatingProducts = () => {
    return axios.get(`/api/get-five-most-rating-product`)
}
let createNewProduct = (data) => {
    return axios.post(`/api/create-product`,data)
}
let deleteProduct = (data) => {
    return axios.delete(`/api/delete-product`,{data})
}

// CART
let getProductsCartById = (data) => {
    return axios.get(`/api/get-products-from-cart-by-id?userId=${data}`)
}
let modifyProductQuantityInCart = (data) => {
    return axios.put(`/api/modify-product-quantity-in-cart`,{data})
}
let addProductToCart = (data) => {
    return axios.post(`/api/add-product-to-cart`,{data})
}
let deleteProductInCart = (data) => {
    return axios.delete(`/api/delete-product-in-cart`,{data})
}
// Order
let createOrder = (data) => {
    return axios.post(`/api/create-order`,{data})
}
let getAllOrder = () => {
    return axios.get(`/api/get-all-order`)
}
let getAllOrderUser = (userId,contentSelection) => {
    return axios.get(`/api/get-all-order-user?userId=${userId}&contentSelection=${contentSelection}`)
}
let modifyStateOrder = (data) => {
    return axios.put(`/api/modify-state-order`,{data})
}
// Comment
let createComment = (data) => {
    return axios.post(`/api/create-comment`,{data})
}
let getCommentByProductId = (productId) => {
    return axios.get(`/api/get-comment-by-product-id?productId=${productId}`)
}
// Chat
let userChats = (userId) => {
    return axios.get(`/api/user-chats?userId=${userId}`)
}
let getMessage = (chatId) => {
    return axios.get(`/api/get-message?chatId=${chatId}`)
}
let addMessage = (data) => {
    return axios.post(`/api/add-message`,{data})
}
let findChat = (senderId,receiverId) => {
    return axios.get(`/api/find-chat?senderId=${senderId}&receiverId=${receiverId}`)
}
let createChat = (data) => {
    return axios.post(`/api/create-chat`,{data})
}
export {
    createUser,
    test,
    login,
    register,
    refreshAccessToken,
    getAllProduct,
    getAllProductByCategory,
    getProductById,
    getProductsCartById,
    modifyProductQuantityInCart,
    addProductToCart,
    deleteProductInCart,
    getFiveNewestProducts,
    createNewProduct,
    deleteProduct,
    getAllUser,
    deleteUser,
    createOrder,
    getAllOrder,
    modifyStateOrder,
    loginAdmin,
    getAllOrderUser,
    createComment,
    getCommentByProductId,
    userChats,
    getMessage,
    addMessage,
    findChat,
    createChat,
    getFiveMostRatingProducts
}
