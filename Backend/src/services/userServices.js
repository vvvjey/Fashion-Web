const db = require('../models/index')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var randToken = require('rand-token');
const saltRounds = 10;
const accessTokenLife = "1h";
const refreshTokenLife = "10h";
const TokenSecret = "abc";
let createUser = async(data,res)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            console.log('data ne ',data.username)
            if(!data.username || !data.password || !data.email){
                resolve(
                    {
                        errCode:1,
                        errMessage:"Missing required parameter"
                    }
                ) 
            }
            // Check Exist
            let isExist = await db.User.findOne({
                where:{
                    username:data.username,
                }
            })
            if(isExist){
                resolve({
                    errCode:1,
                    errMessage:"Username or email existed"
                })
            }

            let hashPassword = bcrypt.hashSync(data.password, saltRounds);

            // Create refreshToken
            const dataForRefreshToken = {
                username: data.username,
                email:data.email
            };
            let refreshToken = await getJWTToken(dataForRefreshToken,refreshTokenLife)
            let userRaw = await db.User.create({
                username:data.username,
                password:hashPassword,
                email:data.email,
                refreshToken:refreshToken,
                role:"R01",
                address:data.address
            })
            await db.Cart.create({
                userId:userRaw.id
            })

            let user = await db.User.findOne({
                where:{
                    id:userRaw.id
                },
                include: [
                    {
                      model: db.Cart
                    }
                ]
            })

            const dataForAccessTokenAction = {
                email:userRaw.email
            };
            const dataForRefreshTokenAction = {
                email:userRaw.email,
                username: userRaw.username,

            };

            let accessTokenAction = await getJWTToken(dataForAccessTokenAction,accessTokenLife);
            let refreshTokenAction = userRaw.refreshToken

            

            if (!refreshToken) {
                console.log('tao refreshToken')
                refreshToken = await getJWTToken(dataForRefreshTokenAction,refreshTokenLife);
                // Nếu userRaw này chưa có refresh token thì lưu refresh token đó vào database
                userRaw.refreshToken = refreshToken;
                await userRaw.save();
            }
            resolve({
                errCode:0,
                user,
                errMessage:"Create successfully",
                accessToken:accessTokenAction,
                refreshToken:refreshTokenAction
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
let login = async (data, res) => {
    try {
        if (!data.username || !data.password) {
            return {
                errCode: 1,
                errMessage: "Missing required parameter"
            };
        }

        let user = await db.User.findOne({
            where: {
                username: data.username,
            },
            include: [{
                model: db.Cart
            }]
        });

        if (!user) {
            return {
                errCode: 1,
                errMessage: "Username or password is incorrect"
            };
        }

        const isPasswordValid = await bcrypt.compareSync(data.password, user.password);

        if (!isPasswordValid) {
            return {
                errCode: 1,
                errMessage: "Password is incorrect"
            };
        }

        const dataForAccessToken = {
            username: user.username,
            email: user.email
        };
        const dataForRefreshToken = {
            email: user.email
        };

        const accessToken = await getJWTToken(dataForAccessToken, accessTokenLife);
        const refreshToken = user.refreshToken || await getJWTToken(dataForRefreshToken, refreshTokenLife);

        // Set the expiration time for access token
        // const accessTokenExpTime = Date.now() + (10 * 60 * 1000); // 10 minutes in milliseconds
        // // Set the expiration time for refresh token
        // const refreshTokenExpTime = Date.now() + (100 * 60 * 1000); // 100 minutes in milliseconds

        // Set cookies with expiration time
        // res.cookie('access-token', accessToken, {
        //     expires: new Date(accessTokenExpTime),
        //     // httpOnly: true
        // });
        // res.cookie('refresh-token', refreshToken, {
        //     expires: new Date(refreshTokenExpTime),
        //     // httpOnly: true
        // });

        return {
            errCode: 0,
            errMessage: "Login successfully",
            user,
            accessToken,
            refreshToken
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};



let refreshAccessToken = (refreshToken,res)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{
                    refreshToken:refreshToken
                }
            })
            if(!user){
                resolve({
                    errCode:1,
                    errMessage:"refresh token expired or not exist",
                })
            } else{
                if(refreshToken==user.refreshToken){
                    const dataForAccessToken = {
                        username: user.username,
                        email:user.email
                    };
                    let accessToken = await getJWTToken(dataForAccessToken,accessTokenLife);
                    res.cookie('access-token',accessToken,{
                        maxAge:1000*60*1
                    })
                    resolve({
                        errCode:0,
                        errMessage:"refresh access token successfully",
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = () =>{
    return new Promise (async(resolve,reject)=>{
        try {
            let users = await db.User.findAll({
            })
            if(!users){
                resolve({
                    errCode:1,
                    errMessage:"There no users existed",
                })
            } else {
                resolve({
                    errCode:0,
                    errMessage:"Success",
                    users
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (data) =>{
    return new Promise (async(resolve,reject)=>{
        try {
            i
            let user = await db.User.findOne({
                where:{
                    id:data
                }
            })
            if(!user){
                resolve({
                    errCode:1,
                    errMessage:"There no user existed",
                })
            } else {
                await user.destroy();
                resolve({
                    errCode:0,
                    errMessage:"Delete successfully",
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let createAdmin = async (data) =>{
    return new Promise (async(resolve,reject)=>{
        try {
            console.log(data)
            if(!data.username || !data.password){
                resolve({
                    errCode:1,
                    errMessage:"Misssing required parameter",
                })
            }
            let isExist = await db.User.findOne({
                where:{
                    username:data.username,
                    role:"R02"
                }
            })
            if(isExist){
                resolve({
                    errCode:1,
                    errMessage:"Username existed",
                })
            } else {
                let hashPassword = bcrypt.hashSync(data.password, saltRounds);
                let user = await db.User.create({
                    username:data.username,
                    password:hashPassword,
                    role:"R02",
                })
                resolve({
                    errCode:0,
                    errMessage:"Create successfully",
                    user
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let loginAdmin = async (data) =>{
    return new Promise (async(resolve,reject)=>{
        try {
            if(!data.username || !data.password){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter",
                })
            } else {
                let user = await db.User.findOne({
                    where:{
                        username:data.username,
                        role:"R02",
                    }
                })
                if(!user){
                    resolve({
                        errCode:1,
                        errMessage:"Username or password was incorrect",
                    })
                } else {
                    const isPasswordValid = await bcrypt.compareSync(data.password, user.password);
                    if(isPasswordValid){
                        resolve({
                            errCode:0,
                            errMessage:"login successfully",
                            user
                        })
                    } else {
                        resolve({
                            errCode:1,
                            errMessage:"Username or password was incorrect",
                        })
                    }
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getJWTToken = async (dataForToken,time) =>{
    let accessToken = await jwt.sign(
        dataForToken,
        TokenSecret,{
            algorithm: 'HS256',
            expiresIn:time
        }
    );
    return accessToken
}




module.exports = {
    createUser,
    login,
    refreshAccessToken,
    getAllUser,
    deleteUser,
    createAdmin,
    loginAdmin
}