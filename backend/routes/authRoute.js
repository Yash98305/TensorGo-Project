const express = require('express')
const router = express.Router()
const pages = require('../controllers/authController.js')
// const upload = require("../utils/upload.js")
const {isAuthenticatedUser, isLoggedIn} = require("../middlewares/authMiddlewaresUser.js")

router.route('/login').post(pages.userLoginController)
router.route('/register').post(pages.userRegisterController)
router.route('/get-all-users').get(pages.getAllUserController)
router.route('/myprofile').get(isAuthenticatedUser,pages.getUserDetailsController)
router.route('/user-create').post(pages.userCreateController)
router.route('/user-get/:id').get(pages.userGetController)
router.route('/user-delete/:id').delete(pages.deleteUserController)

module.exports = router