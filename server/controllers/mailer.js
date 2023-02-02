const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const ENV = require('../config.js')

// https://ethereal.email/create
let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
}

let transporter = nodemailer.createTransport(nodeConfig)

//initialise Mailgen
let MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
module.exports.registerMail = registerMail
async function registerMail(req, res) {
  //values
  const { username, userEmail, text, subject } = req.body

  // body of the email
  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }

  let emailBody = MailGenerator.generate(email)

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || 'Signup Successful',
    html: emailBody,
  }

  // send mail
  let info = await transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: 'You should receive an email from us.' })
    })
    .catch((error) => res.status(500).send({ error: 'erreur !' }))

  console.log('Message sent: %s', info.messageId)
}
