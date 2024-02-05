// https://www.youtube.com/watch?v=BZPrK1nQcFI 
// see this video to understand

class ErrorHandler extends Error{ // Error is predefined Class in node js otherwise we can also use common function 
    constructor(message, statusCode){ // we will pass message and statusCode of response here
        super(message);  // : This line calls the constructor of the parent class (Error) with the provided message parameter. This is necessary when extending a class in JavaScript.
        this.statusCode = statusCode;
        console.log(message)
        Error.captureStackTrace(this, this.constructor)
        // Error.captureStackTrace(object, function.. where we want to start catching error)
        // The captureStackTrace method is used to capture and customize the stack trace of an error in Node.js
        // in simple words captureStackTrace is use to customize errors
        // captureStackTrace is the type of error , like uncaught 
    }
}
module.exports = ErrorHandler