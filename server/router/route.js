const express = require('express')
const router = express.Router()

const UserCtrl = require('../controllers/appController')
// let Auth = require('../middleware/auth')
let functions = require('../middleware/auth')
const { registerMail } = require('../controllers/mailer')

/** POST Methods */
//POST  http://localhost:8080/api/register

router.route('/register').post(UserCtrl.register) //register user
router.route('/registerMail').post(registerMail) //send the email
router.route('/authenticate').post(UserCtrl.verifyUser, (req, res) => res.end()) //authenticate user
//ici 2 fcts : verifyUser et login
router.route('/login').post(UserCtrl.verifyUser, UserCtrl.login) //login in app

/** GET Methods */
router.route('/user').get(UserCtrl.getAllUsers) // all the users
router.route('/user/:username').get(UserCtrl.getUser) //user with username
router
  .route('/generateOTP')
  .get(UserCtrl.verifyUser, functions.localVariables, UserCtrl.generateOTP) // generate random OTP
router.route('/verifyOTP').get(UserCtrl.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(UserCtrl.createResetSession) // reset all the variables

/** PUT Methods */
router.route('/updateuser').put(functions.Auth, UserCtrl.updateUser) // is use to update the user profile
router.route('/resetPassword').put(UserCtrl.verifyUser, UserCtrl.resetPassword) // to reset password

module.exports = router
