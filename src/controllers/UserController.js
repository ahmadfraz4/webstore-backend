let userModel = require('../models/UserModel')
let ErrorHandler = require('../utills/errorHandler')
let AsyncErrorHandler = require('../middleware/AsyncErrorHandler')
let bcrypt = require('bcryptjs')
const HandleToken = require('../utills/HandleToken')
let { sendingEmail} = require('../utills/sendEmail')
let crypto = require('crypto')
const { cloudinary, destroyCloudinaryImage } = require('../utills/cloudinary')
let createUser = AsyncErrorHandler(async (req,res,next) =>{
    let {name, email , password} = req.body;
    // let avatarPath = req.files.avatar && req.files.avatar[0] && req.files.avatar[0].buffer;
    // // let avatar;
    // let avatar;
    // if(avatarPath){
    //     avatar = await cloudinary(avatarPath, 'Webstore/users');
    // }
    // if(avatar && avatar != null && avatar != undefined && avatar.url != null && avatar.url != undefined ){
    //     avatar = {
    //         public_id : avatar.public_id,
    //         url :  avatar.url
    //     }
    // }else{
    //     avatar = {}
    // }
    console.log(req.files.avatar[0].buffer)
    if (req.files && req.files.avatar[0]){
        let uploadResult = await cloudinary(req.files.avatar[0].buffer, 'Webstore/users');
        if (uploadResult && uploadResult.url) {
            avatar = {
                public_id: uploadResult.public_id,
                url: uploadResult.url
            };
        } else {
            avatar = {};
        }
    } else {
        avatar = {};
    }
    const user =await userModel.create({name, email, password, avatar});
    
    HandleToken(user, 200, res)
})

let loginUser = AsyncErrorHandler(async (req,res,next)=>{
    let {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('please fill out all the fields', 400))
    }

    let user =await userModel.findOne({email}).select("+password")
    
    if(!user){
        return next(new ErrorHandler('User dont exist', 401))
    }
    let matchPassword =await bcrypt.compare(password, user.password)
    if(!matchPassword){
        return next(new ErrorHandler('Invalid password or email', 401))
    }
    HandleToken(user, 200, res)
    
})
let logoutUser = AsyncErrorHandler(async (req,res,next)=>{
  res.cookie('token',null,{
    expires : new Date(Date.now()),
    httpOnly : true,
  })
  res.status(200).json({success:true, message : 'Logout Successfully'})
})

// forgot password
// let forgotPassword =AsyncErrorHandler(async(req,res,next)=>{
//     let user =await userModel.findOne({email : req.body.email})
//     if(!user){
//         return next(new ErrorHandler("User not found", 404))
//     }
//     // get reset password token
    
//     let resetToken = await user.forgetPasswordToken();
//      await user.save({ validateBeforeSave: false });

//      let resetPasswordUrl = `${req.protocol || 'http'}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

//     //  let resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
//     let message = `Your password reset token :- \n\n ${resetPasswordUrl}`
//     try {
//         await sendEmail({
//             email : user.email,
//             subject : `E-commerce password recovery`,
//             message: message
//         })
//       return  res.status(200).json({success : true, message : `Email sent to ${user.email} successfully`})
//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined; // to avoid any hack
//         // await  user.save({validateBeforeSave:false});
//         return next(new ErrorHandler(error, 500))
//         // res.status(400).json({
//         //     success : false, message : error
//         // })
//     }

// })

let forgotPassword = AsyncErrorHandler(async (req, res, next) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // get reset password token
        let resetToken = await user.forgetPasswordToken(); // it will guve a token to reset password
        // user.resetPasswordToken = resetToken; // this will store into database after token generation
        // user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // expire the random otp 30 minutes
        // let resetPasswordUrl = `${req.protocol || 'http'}://${req.get("host")}/api/v1/password/reset/${resetToken}`; --todo before deploy
        let resetPasswordUrl = `${req.protocol || 'http'}://${req.get("host")}/resetPassword/${resetToken}`;
        let message = `Your password reset token :- \n\n ${resetPasswordUrl}`;

        
        await user.save({ validateBeforeSave: false });
        await sendingEmail({email : user.email, resetPasswordUrl})
        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return next(new ErrorHandler(error.message || "Internal Server Error", 500));
    }
});

let resetPassword = AsyncErrorHandler(async (req,res,next)=>{
    // creating token hash
    let resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    // console.log(resetPasswordToken)
    let user = await userModel.findOne({
        resetPasswordToken: resetPasswordToken,
         resetPasswordExpire : {$gt:Date.now()}, 
    });
    if(!user){
        return next(new ErrorHandler("Reset Password token has been expired", 400));
    };
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave:true});
    HandleToken(user,200,res)
})

let getUserDetails = AsyncErrorHandler(async (req,res,next)=>{
    let user = await userModel.findById(req.user.id)
    res.status(200).json({
        success : true,
        user
    })
})
let updateUser = AsyncErrorHandler(async (req,res, next)=>{
    let {name, email} = req.body;
   
    let updateData = {
        name: name,
        email:email,
        avatar : {
            public_id : '',
            url : ''
        }
    };
    let user = await userModel.findById(req.user._id)
    
    if(req.user._id.toString() !== user._id.toString()){
        return next(new ErrorHandler('Unauthorized user', 401))
    }
    let avatarPath = req.files.avatar && req.files.avatar[0] && req.files.avatar[0].buffer;
    // let avatar;
    
    let avatar;
    if(avatarPath){
        avatar = await cloudinary(avatarPath, 'Webstore/users');
        updateData.avatar.public_id = avatar.public_id
        updateData.avatar.url = avatar.url;
    }else{
         updateData = {
            name: name,
            email:email
        }
    }
    if(avatar){
       await destroyCloudinaryImage(user.avatar.public_id)
    }
    let updatedUser = await userModel.findByIdAndUpdate(req.user._id, updateData, {new : true});
    res.json({
        success : true, updatedUser
    })

})



let deleteUser = AsyncErrorHandler(async (req,res, next)=>{
    

    
    console.log(req.params.id)
    let user = await userModel.findById(req.params.id);

    if(!user){
       return res.json({
            success:false, message : 'User not exist'
        })
    }  

    if(user.avatar){
        await destroyCloudinaryImage(user.avatar.public_id)
    }
    // console.log(user)
     await userModel.findByIdAndDelete(req.params.id);
     
    res.json({
        success : true, message:'user deleted'
    })

})



let updatePassword = async (req,res)=>{
    try {
    let newPassword = req.body.newPassword;
    let user = await userModel.findById(req.user.id).select("+password");

    let isPasswordMatch = await bcrypt.compare(req.body.oldPassword, user.password)

    if(!isPasswordMatch){
        return res.json({success:false, error: 'Old Password is Invalid'})
    }
    user.password = req.body.newPassword;
    await user.save()
    res.json({
        success:true, user
    })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            error
        })
    }
    // HandleToken(user,200,res)
}

let AllUsers = async (req,res) => {
    try {
        let allUsers = await userModel.find()
        res.json({
            success:true, allUsers
        })
    } catch (error) {
        res.json({
            success:false, message:error
        })
    }
}

module.exports = { createUser,AllUsers,deleteUser, loginUser,logoutUser,forgotPassword,resetPassword,getUserDetails, updatePassword, updateUser}
