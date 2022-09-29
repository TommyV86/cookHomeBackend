const express = require('express')
const routes = express.Router()
const { postRecipe, getRecipe, updateRecipe} = require('../controllers/recipeControllers')


routes.post('/postRecipe', postRecipe)
routes.get('/getRecipe', getRecipe)
routes.put('/updateRecipe', updateRecipe)

module.exports = { routes }