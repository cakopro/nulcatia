require('dotenv').config()
const express = require('express')
const routes = require('./router/index')

const app = express()
const port = process.env.PORT || 3000

app.use(routes)

app.listen(port, () => {
    console.log(`servidor levantado en http://localhost:${port}`)
})