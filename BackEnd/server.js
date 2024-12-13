const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adamdurand:Zxukwb9Jv!9@datarep.sjr0e.mongodb.net/?retryWrites=true&w=majority&appName=datarep');

const recipeSchema = new mongoose.Schema({
  title:String,
  ingredients:String,
  instructions:String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

//Retrieve all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving recipes');
  }
});

//Retrieve a single recipe 
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving recipe');
  }
});

//Update a recipe 
app.put('/api/recipes/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedRecipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating recipe');
  }
});

//Create a new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating recipe');
  }
});

//Delete a recipe 
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send('Recipe deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting recipe');
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});