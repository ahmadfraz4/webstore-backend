require('dotenv').config()
let jwt = require('jsonwebtoken')
const AsyncErrorHandler = require('./AsyncErrorHandler');
const ErrorHandler = require('../utills/errorHandler');
const userModel = require('../models/UserModel');

let auth = AsyncErrorHandler(async(req,res,next)=>{
    let {token} = req.cookies;
   
    if(!token){
        return next(new ErrorHandler('Please login to access products', 401))
    }
    let decodeData = jwt.verify(token, process.env.JWT_SECRETKEY)
    
    let user = await userModel.findById(decodeData.id)
    if(!user){
        return next(new ErrorHandler('Invalid User', 401)) 
    }
    req.user = user
    req.token = token
    next()
})
let authorizeRole = (...roles) =>{ // making the roles to array
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`${(req.user.role)} is not allow to access this resource`,403))
        }
        next();
    };
}
module.exports = {auth, authorizeRole}