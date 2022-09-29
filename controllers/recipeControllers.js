const Recipe = require('../models/recipeModel')

const postRecipe = async (req, res) => {
    try {
        let {name, description, ingredients, difficulty, time} = req.body
        const data = await Recipe.create({
            name: name,
            description: description,
            ingredients: ingredients,
            difficulty: difficulty,
            time: time
        })
        console.log(" ** post recipe ** ")
        console.log(data.name)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const getRecipes = async (req, res) => {
    try {
        // faire un put pour récupérer la valeur de l'input
        let name = req.body.name
        let data = await Recipe.find({ name: name })
        console.log(" ** get recipes ")
        console.log(data.name)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const updateRecipe = async (req, res) => {
    try {
        let name = req.body.name
        let newIngredients = req.body.ingredients
        let data = await Recipe.updateOne({ name: name }, { $set: {ingredients: newIngredients}})
        console.log(" ** recipe updated **")
        console.log(data)
        res.status(200).send(data)

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}



module.exports = {
    postRecipe,
    getRecipes,
    updateRecipe
}