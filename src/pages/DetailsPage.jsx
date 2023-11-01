import { useParams } from 'react-router-dom';
import style from '../styles/style.module.scss';
import RecipeCard from '../components/RecipeCard';
import { useEffect, useState } from 'react';
import { callApi } from '../domain/api';
import MoreRecipes from '../components/MoreRecipes';

const DetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      const { meals } = await callApi({
        endpoint: `/lookup.php?i=${id}`,
        method: 'GET',
      });
      const meal = meals[0];

      const formattedData = {
        name: meal.strMeal,
        image: meal.strMealThumb,
        instructions: meal.strInstructions,
        ingredients: [],
      };
      for (let i = 1; i <= 4; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          formattedData.ingredients.push({ ingredient, measure });
        }
      }
      setRecipe(formattedData);
    };
    getRecipe();
  }, [id]);
  return (
    <div className={style.background}>
      <header>
        <h1 className={style.logo}>Delicacy</h1>
      </header>
      <div className={style.single_recipe}>
        <RecipeCard
          style={style}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          isDetailsPage={true}
        />
      </div>
      <MoreRecipes style={style} />
    </div>
  );
};

export default DetailsPage;
