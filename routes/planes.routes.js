const express = require('express')
const route = express.Router()
const { getPlanes, createPlane, getOnePlane } = require('../controllers/planeController')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './assets',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage})

route.get('/', getPlanes)
route.get('/:id', getOnePlane)
route.post('/', upload.single('planeImage'), createPlane)


module.exports = route