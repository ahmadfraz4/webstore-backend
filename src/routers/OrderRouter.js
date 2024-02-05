let express = require('express');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, cancelOrder } = require('../controllers/OrderController');
const { auth, authorizeRole } = require('../middleware/auth');

let router = express.Router();

router.route('/order/new').post(auth,newOrder)
router.route('/order/me').get(auth,myOrders)
// to find who place the order
router.route('/order/details/:id').get(auth,getSingleOrder)
router.route('/order/all').get(auth,authorizeRole("admin"),allOrders)
router.route('/order/update/:id').put(auth,authorizeRole("admin"),updateOrder)
router.route('/order/cancel/:id').delete(auth,authorizeRole("admin"),cancelOrder)

module.exports = router