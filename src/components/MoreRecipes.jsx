import { useEffect, useState } from 'react';
import MoreRecipeCard from './MoreRecipeCard';
import { callApi } from '../domain/api';
import { useNavigate } from 'react-router-dom';

const MoreRecipes = ({ style }) => {
  const [moreRecipes, setMoreRecipes] = useState([]);
  const navigate = useNavigate();

  const handleMoreRecipeClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const getMoreRecipes = async () => {
      const { meals } = await callApi({
        endpoint: `/search.php?s=a`,
        method: 'GET',
      });
      if (meals) {
        const mealDetails = meals[0];
        const mealData = meals.slice(0, 6).map((meal) => {
          const formattedData = {
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            instructions: meal.strInstructions,
            ingredients: [],
          };

          for (let i = 1; i <= 4; i++) {
            const ingredient = mealDetails[`strIngredient${i}`];
            const measure = mealDetails[`strMeasure${i}`];
            if (ingredient) {
              formattedData.ingredients.push({ ingredient, measure });
            }
          }

          return formattedData;
        });
        setMoreRecipes(mealData);
      }
    };
    getMoreRecipes();
  }, []);
  return (
    <div className={style.more_recipes}>
      <h3>More recipes</h3>
      <div className={style.more_recipes_card_container}>
        {moreRecipes.map((recipe, index) => (
          <MoreRecipeCard
            style={style}
            key={index}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            onClick={handleMoreRecipeClick}
            isFavoritePage={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreRecipes;
