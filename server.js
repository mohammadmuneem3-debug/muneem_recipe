//create a advanced recipe sharing api with endpoint post/api/recipes to add title ingredients(array) instruction cooktime(minute) tags(array), get/api/recipes to return all recipes as a json array, put/api/recipes/:id to update ingredients instructions cooktime tags, delete/api/recipes/:id to delete a recipe 
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
let recipes = [];
// Create a new recipe
app.post('/api/recipes', (req, res) => {
    const { title, ingredients, instruction, cooktime, tags } = req.body;
    const newRecipe = {
        id: uuidv4(),
        title,
        ingredients,
        instruction,
        cooktime,
        tags
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});
// Get all recipes
app.get('/api/recipes', (req, res) => { 
    res.json(recipes);
}); 
// Update a recipe
app.put('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    const { ingredients, instruction, cooktime, tags } = req.body;
    const recipe = recipes.find(r => r.id === id);  
    if (recipe) {
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instruction = instruction || recipe.instruction;
        recipe.cooktime = cooktime || recipe.cooktime;
        recipe.tags = tags || recipe.tags;
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});
// Delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
    const { id } = req.params;  
    const index = recipes.findIndex(r => r.id === id);
    if (index !== -1) {
        recipes.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );



