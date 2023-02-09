const express = require('express')
const mongoose = require('mongoose')
const planeRoute = require('./routes/planes.routes')
const cors = require('cors')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/assets'))

app.use('/api/planes', planeRoute)

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    })
  })