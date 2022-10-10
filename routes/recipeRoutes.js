const express = require('express')
const routes = express.Router()
const { postRecipe, getRecipe, getRecipeById,getRecipes, updateRecipe, deleteRecipe} = require('../controllers/recipeControllers')


routes.post('/postRecipe', postRecipe)
routes.get('/getRecipe', getRecipe)
routes.put('/getRecipeById/:id', getRecipeById)
routes.get('/getRecipes', getRecipes)
routes.put('/updateRecipe', updateRecipe)
routes.put('/deleteRecipe/:id', deleteRecipe)

module.exports = { routes }