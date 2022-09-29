const express = require('express')
const routes = express.Router()
const { postRecipe, getRecipes, updateRecipe} = require('../controllers/recipeControllers')


routes.post('/postRecipe', postRecipe)
routes.get('/getRecipes', getRecipes)
routes.put('/updateRecipe', updateRecipe)

module.exports = { routes }