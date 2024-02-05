let ErrorHandler = require('../utills/errorHandler')

// const {ErrorHandler} = require("../utills/errorHandler");

module.exports = (err, req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error'
    // wrong mongodb id error
    // if(err.name === 'CastError'){
    //     const message = `Resources not found. ${err.path}`
    //     err = new ErrorHandler(message, 400)
    // }
    if (err.name === 'CastError') {
        console.log('abc')
        const message = `Invalid ${err.kind}: ${err.value} for path ${err.path}`;
        err = next(new ErrorHandler(message, 500))
    }
    if(err.code === 11000){
        let message = `Duplicate  ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }
    if(err.name == 'JsonWebTokenError'){
        let message = `jsonweb token is invalid try again later`;
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success : false,
        error : err.message
    })
}
// commonly the sequence is (req,res,next,err)
// but in case of error handling (err,req,res,next)
// If there is an error that you want to pass to the error-handling middleware, you typically use next(err) to trigger the error-handling middleware. In the error-handling middleware, the order is (err, req, res, next).