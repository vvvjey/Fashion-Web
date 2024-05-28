let commentService = require('../services/commentService')
let createComment = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await commentService.createComment(req.body.data);
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
let getCommentbyProductId = async(req,res)=>{
    try {
        console.log(req.body)
        let data = await commentService.getCommentbyProductId(req.query.productId);
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
    createComment,
    getCommentbyProductId
}