const express = require('express');
const pages = require('../controllers/subscriptionController.js');

const router = express.Router();

router.route('/create-subscription-checkout').post(pages.createSubscriptionCheckoutController);
router.route('/payment-success').post(pages.paymentSuccessController);

module.exports = router;
