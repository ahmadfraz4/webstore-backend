let express = require('express');
const { createUser, loginUser,logoutUser, forgotPassword, resetPassword, getUserDetails,updatePassword, updateUser, AllUsers, deleteUser} = require('../controllers/UserController');
const {auth, authorizeRole} = require('../middleware/auth');
let {upload} = require('../middleware/multer.upload')
let router = express.Router();

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }])

router.route('/register').post(cpUpload,createUser)
router.route('/all').get(auth,authorizeRole("admin"),AllUsers)
router.route('/update').put(auth,cpUpload,updateUser)
router.route('/remove/:id').delete(auth,authorizeRole('admin'),deleteUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/me').post(auth, getUserDetails)
router.route('/password/update').put(auth, updatePassword)

module.exports = router
