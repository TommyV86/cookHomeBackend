const express = require('express')
const routes = express.Router()
const { postRecipe, getRecipe, getRecipes, updateRecipe} = require('../controllers/recipeControllers')


routes.post('/postRecipe', postRecipe)
routes.get('/getRecipes', getRecipes)
routes.get('/getRecipe', getRecipe)
routes.put('/updateRecipe', updateRecipe)

module.exports = { routes }