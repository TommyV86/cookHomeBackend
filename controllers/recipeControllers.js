const Recipe = require('../models/recipeModel')

const postRecipe = async (req, res) => {
    try {

        let {name, description, ingredients, difficulty, time} = req.body
        const isDescExist = await Recipe.findOne({ description : description })

        if(!isDescExist){
            const data = await Recipe.create({
                name: name,
                description: description,
                ingredients: ingredients,
                difficulty: difficulty,
                time: time,
            })
            console.log(" ** post recipe ** ")
            console.log(data.name)
            res.status(200).send(data)
        } else {
            console.log("xx impossible to duplicated description xx")
            res.status(404).send("xx impossible to duplicated description xx")
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({}).sort({_id: -1})
        console.log(recipe)
        res.status(200).send(recipe)
        return recipe
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const getRecipeById = async (req, res) => {
    try {
        reqParamsId = req.params._id
        const data = await Recipe.findOne({ _id: reqParamsId })
        console.log(data.name);
        res.status(200).send(data)
        return data
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
}

const getRecipes = async (req, res) => {
    try {
        let data = await Recipe.find({})
        console.log("** get recipes **")
        console.log(data)
        res.status(200).send(data)
        return data
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

const updateRecipe = async (req, res) => {
    try {
        let name = req.body.name
        let newIngredients = req.body.ingredients
        let data = await Recipe.updateOne(
            { name: name }, 
            { $set: {ingredients: newIngredients} }
        )
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
    getRecipe,
    getRecipeById,
    getRecipes,
    updateRecipe
}