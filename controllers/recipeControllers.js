const Recipe = require('../models/recipeModel')

const postRecipe = async (req, res) => {
    try {

        let {origin, name, description, ingredients, difficulty, time} = req.body
        const isDescExist = await Recipe.findOne({ name : name })

        if(!isDescExist){
            const data = await Recipe.create({
                origin: origin,
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
        reqParamsId = req.params.id
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

const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Recipe.deleteOne({ _id: id })
        if(data){
            console.log("id's recipe deleted : " + id)
            res.status(200).json(id)
        } else {
            console.log("delete doesn't work")
            res.status(400).json("delete doesn't work")
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    postRecipe,
    getRecipe,
    getRecipeById,
    getRecipes,
    updateRecipe,
    deleteRecipe
}