let express = require('express')
let router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const { paymentProcess, SecretStripe } = require('../controllers/payment.controller');

router.route('/payment/process').post(auth, paymentProcess)
router.route('/stripeApiKey').get(auth, SecretStripe)

module.exports = router