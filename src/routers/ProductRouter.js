let express = require('express')
const { getProducts, createProduct,updateProduct, deleteProduct, getProductDetails, createProductReviews, getProductReviews, deleteProductReview, getAllProductsAdmin } = require('../controllers/ProductController')
const {auth, authorizeRole} = require('../middleware/auth')
let router = express.Router()
let {upload} = require('../middleware/multer.upload')

const cpUpload = upload.fields([{ name: 'images', maxCount: 8 }])
router.route('/products').get(getProducts)
router.route('/products/new').post(auth,authorizeRole("admin"),cpUpload ,createProduct)
router.route('/products/admin/all').get(getAllProductsAdmin)
router.route('/products/edit/:id').put(auth,authorizeRole("admin"),cpUpload, updateProduct)
router.route('/products/delete/:id').delete(auth,authorizeRole("admin"),deleteProduct)
router.route('/products/getProduct/:id').get(getProductDetails)
router.route('/products/reviews').put(auth,createProductReviews)
router.route('/products/reviews').get(auth,getProductReviews)
router.route('/products/reviews/delete').put(auth,deleteProductReview)

module.exports = router