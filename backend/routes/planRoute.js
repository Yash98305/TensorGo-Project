const express = require('express')
const router = express.Router()
const pages = require('../controllers/planController.js')
const {isAuthenticatedUser,authorizeRoles} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create').post(isAuthenticatedUser,authorizeRoles("superadmin"),pages.createPlanController)
router.route('/update/:id').put(isAuthenticatedUser,authorizeRoles("superadmin"),pages.updatePlanController)
router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles("superadmin"),pages.deletePlanController)
router.route('/get-all').get(pages.getPlanController)
router.route('/get-single/:id').get(isAuthenticatedUser,pages.getSinglePlanController)
module.exports = router