const http = require('http')
const app = require('./database/conn')
const router = require('./router/route')

const server = http.createServer(app)
const port = 8080

/** HTTP GET Request */
app.get('/', (req, res) => {
  res.status(201).json('Home GET Request')
})

/** API routes */
app.use('/api', router)

server.listen(port, () => {
  console.log(`Server is running at localhost:${port}`)
})
