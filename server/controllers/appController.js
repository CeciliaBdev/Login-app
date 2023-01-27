// j'apelle le modele userschema
const UserModel = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = require('../config.js')
// dans le gitignore

/** POST */
/**
 * http://localhost:8080/api/register
  @param :{
      "username":"example123",
      "password": "admin123",
      "email":"text@gmail.com",
      "firstName":"First",
      "lastName":"Last",
      "mobile": 123456,
      "address":"test adress",
      "profile":""
  }*/
exports.register = (req, res) => {
  try {
    const { username, password, profile, email } = req.body

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err))
        if (user) reject({ error: 'Please use unique username' })

        resolve()
      })
    })

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err))
        if (email) reject({ error: 'Please use unique Email' })

        resolve()
      })
    })

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email,
              })

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: 'User Register Successfully' })
                )
                .catch((error) => res.status(500).send({ error }))
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Enable to hashed password',
              })
            })
        }
      })
      .catch((error) => {
        return res.status(500).send({ error })
      })
  } catch (error) {
    return res.status(500).send(error)
  }
}

/** POST */
/**
 * http://localhost:8080/api/login
  @param :{
      "username":"example123",
      "password": "admin123"
  }*/
exports.login = (req, res) => {
  const { username, password } = req.body

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" })

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              //   'secret',
              //   { expiresIn: '24h' }
              ENV.JWT_SECRET,
              { expiresIn: '24h' }
            )

            return res.status(200).send({
              msg: 'Login Successful...!',
              username: user.username,
              token,
            })
          })
          .catch((error) => {
            return res.status(400).send({ error: 'Password does not Match' })
          })
      })
      .catch((error) => {
        return res.status(404).send({ error: 'Username not Found' })
      })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

/** GET */
/**
 * http://localhost:8080/api/user/example123
 */
exports.getUser = (req, res) => {
  res.json('getUser route')
}

/** GET */
/**
 * http://localhost:8080/api/generateOTP
 */
exports.generateOTP = (req, res) => {
  res.json('generateOTP route')
}

/** GET */
/**
 * http://localhost:8080/api/verifyOTP
 */
exports.verifyOTP = (req, res) => {
  res.json('verifyOTP route')
}

/** GET */
/**
 * http://localhost:8080/api/createResetSession
 */
// successfully redirect user when OTP is valid
exports.createResetSession = (req, res) => {
  res.json('createResetSession route')
}

/** PUT */
/**
 * http://localhost:8080/api/updateuser
  @param :{
      "id":"<userid>"
  }
  body:{
      firstName:'',
      address:'',
      profile:''
  }*/
exports.updtateUser = (req, res) => {
  res.json('updateUser route')
}
/** PUT */
/**
 * http://localhost:8080/api/resetPassword
 */
// update the password when we have valid session
exports.resetPassword = (req, res) => {
  res.json('resetPassword route')
}
