const db = require('../models/index')
let createComment = (data)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.description || !data.orderId || !data.starRate){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                // Set isRate
                let order = await db.Order.findOne({
                    where:{
                        orderId:data.orderId
                    }
                })
                order.isRate=true;
                await order.save()
                // Create comment
                let comment = await db.Comment.create({
                    description:data.description,
                    orderId:data.orderId,
                    starRate:data.starRate
                })
                if(!comment){
                    resolve({
                        errCode:1,
                        errMessage:"Cannot create bcz error"
                    })
                } else {
                    resolve({
                        errCode:0,
                        errMessage:"Create successfully",
                        comment
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
} 
let getCommentbyProductId = (productId)=>{
    return new Promise(async(resolve, reject) => {
        try {
            if(!productId){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            } else {
                let comments = await db.Comment.findAll({
                    include:[
                        {
                            attributes:["orderId","userId"],
                            model:db.Order,
                            include:[
                                {
                                    attributes:["orderId","orderDetailId"],
                                    model:db.Order_detail,
                                    include:[
                                        {
                                            attributes:["productId"],
                                            model:db.Product_detail
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
                
                // Take array each comment has array of productId
                const commentWithProducts = comments.map(comment => ({
                    commentId: comment.commentId,
                    description:comment.description,
                    userId:comment.Order.userId,
                    starRate:comment.starRate,
                    date:(new Date(comment.createdAt)).toDateString(),
                    productIds: [...new Set(comment.Order.Order_details.map(orderDetail => orderDetail.Product_details[0].productId))]
                }));
                // Take array result of which comment has PICKED productId 
                let commentResult = [];
                for (const item of commentWithProducts) {
                    console.log(item)
                    for (const itemChild of item.productIds) {
                        if (itemChild == productId) {
                            let user = await db.User.findOne({
                                where: {
                                    id: item.userId
                                }
                            });
                            let object = {
                                commentId: item.commentId,
                                description: item.description,
                                userId: user.dataValues.id,
                                username: user.dataValues.username,
                                starRate:item.starRate,
                                date:item.date
                            };
                            commentResult.push(object);
                        }
                    }
                }
                resolve({
                    errCode:0,
                    errMessage:"ok",
                    commentResult
                })
            }
        } catch (error) {
            reject(error)
        }
    })
} 
module.exports={
    createComment,
    getCommentbyProductId
}