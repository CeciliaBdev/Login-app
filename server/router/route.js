const express = require('express')
const router = express.Router()

const UserCtrl = require('../controllers/appController')

/** POST Methods */
//POST  http://localhost:8080/api/register

router.route('/register').post(UserCtrl.register) //register user
// router.route('/registerMail').post() //send the email
router.route('/authenticate').post((req, res) => res.end()) //authenticate user
router.route('/login').post(UserCtrl.login) //login in app

/** GET Methods */
router.route('/user/:username').get(UserCtrl.getUser) //user with username
router.route('/generateOTP').get(UserCtrl.generateOTP) // generate random OTP
router.route('/verifyOTP').get(UserCtrl.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(UserCtrl.createResetSession) // reset all the variables

/** PUT Methods */
router.route('/updateuser').put(UserCtrl.updtateUser) // is use to update the user profile
router.route('/resetPassword').put(UserCtrl.resetPassword) // to reset password

module.exports = router
