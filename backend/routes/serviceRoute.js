const express = require('express')
const router = express.Router()
const pages = require('../controllers/serviceController.js')
const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create').post(isAuthenticatedUser,authorizeRoles("superadmin"),pages.createServiceController)
router.route('/update/:id').put(isAuthenticatedUser,authorizeRoles("superadmin"),pages.updateServiceController)
router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles("superadmin"),pages.deleteServiceController)
router.route('/get-all').get(isAuthenticatedUser,pages.getServiceController)
router.route('/get-single/:id').get(isAuthenticatedUser,pages.getSingleServiceController)
module.exports = router