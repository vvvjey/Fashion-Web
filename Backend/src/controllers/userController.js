// import { DOUBLE } from 'sequelize';
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var randToken = require('rand-token');
var userService = require('../services/userServices')

const saltRounds = 10;
const accessTokenLife = "10m";
const accessTokenSecret = "abc";

let db = require('../models/index');
let createUser = async(req,res)=>{
    try{
        console.log(req.body.data)
        let data = await userService.createUser(req.body.data,res);
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
let login = async(req,res)=>{
    try{
        console.log(req.body.data)
        let data = await userService.login(req.body.data,res);
        return res.status(200).json({
            data
        })
        
    } catch(e){
        console.log('error',e)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
} 
let test = async(req,res)=>{
    try {
        let accessTokenRaw = req.headers.authorization;
        accessTokenRaw = accessTokenRaw.split(" ")
        let accessToken = accessTokenRaw[1]
        if(accessToken){
            return res.status(200).json({
                errCode:0,
                errMessage:"Hello"
            })
        } else {
            return res.status(401).json({
                errCode:0,
                errMessage:"Unauthorize"
            })
        }
        
    } catch (error) {
        console.log(e)
        return res.status(200).json({
            errCode:2,
            errMessage:"Error from server"
        })
    }
}
let refreshAccessToken = async(req,res)=>{
    try {

        let data = await userService.refreshAccessToken(req.body.refreshToken,res);
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
let getAllUser = async(req,res)=>{
    try {
        let data = await userService.getAllUser();
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
let deleteUser = async(req,res)=>{
    try {
        let data = await userService.deleteUser(req.body.userId);
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
let createAdmin = async(req,res)=>{
    try {
        let data = await userService.createAdmin(req.body.data);
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
let loginAdmin = async(req,res)=>{
    try {
        let data = await userService.loginAdmin(req.body.data);
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
// ADMIN

module.exports={
    createUser,
    login,
    test,
    refreshAccessToken,
    getAllUser,
    deleteUser,
    createAdmin,
    loginAdmin
}