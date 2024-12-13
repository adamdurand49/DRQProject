import React from 'react';
import { useState, useEffect } from 'react';

const Page3 = () => {
  //Store recipes
  const [recipes, setRecipes] = useState([]); 
  //Edit recipes
  const [editRecipe, setEditRecipe] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
        .then((res) => setRecipes(res.data))
        .catch((err) => console.error('Error fetching recipes:', err));
}, []);

const handleEdit = (recipe) => {
    setEditRecipe(recipe); 
};

const handleSave = () => {
    axios.put(`http://localhost:4000/api/recipes/${editRecipe._id}`, editRecipe)
        .then((res) => {
            setRecipes((prev) =>
                prev.map((r) => (r._id === res.data._id ? res.data : r))
            );
            setEditRecipe(null); 
        })
        .catch((err) => console.error('Error updating recipe:', err));
};

return (
    <div>
        <h3>Recipe List</h3>
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <strong>{recipe.title}</strong>
                    <button onClick={() => handleEdit(recipe)}>Edit</button>
                </li>
            ))}
        </ul>

        {editRecipe && (
            <div>
                <h4>Edit Recipe</h4>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={editRecipe.title}
                            onChange={(e) =>
                                setEditRecipe({ ...editRecipe, title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>Ingredients:</label>
                        <textarea
                            value={editRecipe.ingredients}
                            onChange={(e) =>
                                setEditRecipe({ ...editRecipe, ingredients: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label>Instructions:</label>
                        <textarea
                            value={editRecipe.instructions}
                            onChange={(e) =>
                                setEditRecipe({ ...editRecipe, instructions: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setEditRecipe(null)}>Cancel</button>
                </form>
            </div>
        )}
    </div>
);
};

export default Page3;