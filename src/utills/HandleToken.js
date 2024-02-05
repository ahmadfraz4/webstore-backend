// creating token and saving in cookie
let HandleToken = (user,statusCode, res) =>{
    let token = user.getToken()
    const options = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days in the future
        httpOnly: true,
        secure: true // set to true if using https
    }
    res.status(statusCode).cookie('token', token , options).json({ // storing in cookies
        success : true, user, token,
    });
}

module.exports = HandleToken