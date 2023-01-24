const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
mongoose.set('strictQuery', false)

mongoose
  .connect(
    'mongodb+srv://user_database:la07b7vKr6p1Lvwh@cluster0.w6uy9pj.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connexion à MongoDb réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(cors())
app.use(bodyparser.json())

module.exports = app
