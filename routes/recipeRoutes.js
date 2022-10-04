const express = require('express')
const routes = express.Router()
const { postRecipe, getRecipe, getRecipeById,getRecipes, updateRecipe} = require('../controllers/recipeControllers')


routes.post('/postRecipe', postRecipe)
routes.get('/getRecipe', getRecipe)
routes.put('/getRecipeById/:_id', getRecipeById)
routes.get('/getRecipes', getRecipes)
routes.put('/updateRecipe', updateRecipe)

module.exports = { routes }