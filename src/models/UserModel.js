require('dotenv').config()
let mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let crypto = require('crypto') // builtin module

let userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [40, "cannot exeed 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, 'please Enter valid email'],
  },
  password:{
    type : String, required : [true, 'Please Enter password'],
    minLength : [8, 'password must contain atleast 8 characters'],
    select : false  // it will not return password when we will find user 
  },
  avatar : { // not array of object because avtar only allow to 1
    public_id : {
        type : String 
    },
    url : {
        type : String 
    }
  },
  role : {
    type : String , default : 'user' // or admin,
  },
  createdAt : {
    type : Date, default : Date.now()
  },
  resetPasswordToken : String , // OTP for reseting email
  resetPasswordExpire : Date , // OTP for reseting email
});

userScheme.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10) 
    next()
})
// jwt

userScheme.methods.getToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRETKEY,{
        expiresIn : '30d'
    })
}

// forget password

userScheme.methods.forgetPasswordToken = function () {
  let resetToken = crypto.randomBytes(20).toString("hex") // to make regular string
  
  // Hashing and adding to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
 
  // sha256 is an algoritham
  this.resetPasswordExpire =  Date.now() + 30 * 60 * 1000 // expire the rendom otp 30 minutes

  return resetToken
}

let userModel = mongoose.model('user', userScheme)

module.exports = userModel