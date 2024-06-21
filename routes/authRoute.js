const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/authController.js')
// const upload = require("../utils/upload.js")
const {isAuthenticatedUser, isLoggedIn} = require("../middlewares/authMiddlewaresUser.js")

router.route('/login').post(isLoggedIn,pages.userLoginController)
router.route('/register').post(isLoggedIn,pages.userRegisterController)
router.route('/updateprofile/:id').put(formidable(),pages.updateProfile)
// router.route('/getallusers').post(pages.getAllUserController)
router.route('/photo/:pid').get(pages.getAllUsersPhotoController)
router.route('/myprofile').get(isAuthenticatedUser,pages.getUserDetailsController)

module.exports = router