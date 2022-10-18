const mongoose = require('mongoose')

const RecipeSchema = mongoose.Schema({
    origin: { type: String, required: true },
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    difficulty: { type: String, required: true },
    time: { type: Number, required: true },
    description: { type: String, required: true }
})

module.exports = mongoose.model('Recipe', RecipeSchema, 'recipes')