const express = require('express')
const routes = express.Router()
const { postUser, getUser, modifyUser, deleteUser } = require('../controllers/userControllers')

routes.post('/postUser', postUser)
routes.post('/getUser', getUser)
routes.put('/modifyUser/:id', modifyUser)
routes.delete('/deleteUser/:id', deleteUser)

module.exports = { routes }