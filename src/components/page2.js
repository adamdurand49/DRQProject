import axios from "axios";
import { useState } from 'react';

const Page2 = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const recipe = { title, ingredients, instructions };
        console.log(recipe);

    axios.post('http://', recipe)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error("Error submitting recipe:", err);
            });
    }

    return (
        <div>
            <h3>Create a New Recipe</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Recipe Title:</label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Ingredients (separated by commas):</label>
                    <input type = "text"
                        className="form-control"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Instructions:</label>
                    <input type = "text"
                        className="form-control"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Recipe" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
export default Page2;