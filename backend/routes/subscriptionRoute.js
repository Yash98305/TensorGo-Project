const express = require('express');
const pages = require('../controllers/subscriptionController.js');
const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/authMiddlewaresUser.js")

const router = express.Router();

router.route('/create-subscription-checkout').post(pages.createSubscriptionCheckoutController);
router.route('/create-basic-subscription').post(pages.createBasicController);
router.route('/payment-success').post(pages.paymentSuccessController);
router.route('/get-plan').get(isAuthenticatedUser,pages.getSubscriptionController);
router.route('/get-all-active').get(isAuthenticatedUser,authorizeRoles("superadmin"),pages.getAllSubscriptionController);
router.route('/get-all-expire').get(isAuthenticatedUser,authorizeRoles("superadmin"),pages.getAllExpireSubscriptionController);

module.exports = router;
