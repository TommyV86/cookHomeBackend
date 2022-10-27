const express = require('express')
const routes = express.Router()
const { postUser, getUser, getEmailforNewPswd, modifyPswd, deleteUser } = require('../controllers/userControllers')

routes.post('/postUser', postUser)
routes.post('/getUser', getUser)
routes.post('/getEmailforNewPswd', getEmailforNewPswd)
routes.put('/modifyPswd/:token', modifyPswd)
routes.delete('/deleteUser/:id', deleteUser)

module.exports = { routes }