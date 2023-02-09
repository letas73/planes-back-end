const Plane = require('../models/plane')

const getPlanes = async (req, res) => {
  try {
    const planes = await Plane.find()
    res.status(200).json(planes)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось получить список самолетов'
    })
  }
}

const createPlane = async (req, res) => {
  const errors = {}
  if (!req.body.name) {
    errors.name = {message: 'Пожалуйста, укажите название самолета'}
  }
  if (!req.body.price) {
    errors.price = { message: 'Пожалуйста, укажите цену самолета' }
  }
  if (!req.body.description) {
    errors.description = { message: 'Пожалуйста, укажите описание самолета' }
  }
  if (!req.body.capacity) {
    errors.capacity = { message: 'Пожалуйста, укажите вместимость самолета' }
  }
  if (!req.file) {
    errors.planeImage = { message: 'Пожалуйста, добавьте фото самолета' }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }
  

  try {
    const { name, price, description, capacity } = req.body
    const plane = await Plane.create({
      name,
      price,
      description,
      capacity,
      planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`
    })
    res.status(201).json(plane)
  } catch (error) {
    res.status(500).json({
      message: 'Не удалось создать самолет'
    })
  }
}

const getOnePlane = async (req, res) => {
  try {
    const plane = await Plane.find({ _id: req.params.id })
    res.status(200).json(plane)
  } catch (error) {
    res.status(400).json({
      message: 'Не удалось найти самолет'
    })
  }
}


module.exports = {
  getPlanes,
  createPlane,
  getOnePlane
}