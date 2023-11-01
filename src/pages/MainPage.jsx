import style from '../styles/style.module.scss';
import { useEffect, useState } from 'react';
import { callApi } from '../domain/api';
import RecipeCard from '../components/RecipeCard';
import MoreRecipes from '../components/MoreRecipes';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await callApi({
        endpoint: '/categories.php',
        method: 'GET',
      });
      const categoryNames = data.categories
        .slice(0, 5)
        .map((obj) => obj.strCategory);
      categoryNames.push('Favorite');
      setCategories(categoryNames);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getRecipesByCategory = async (category) => {
      try {
        const { meals } = await callApi({
          endpoint: `/filter.php?c=${category}`,
          method: 'GET',
        });

        if (meals) {
          const recipeDetails = meals.slice(0, 5).map(async (meal) => {
            const details = await callApi({
              endpoint: `/lookup.php?i=${meal.idMeal}`,
              method: 'GET',
            });
            const mealDetails = details.meals[0];

            const formattedData = {
              id: meal.idMeal,
              name: meal.strMeal,
              image: meal.strMealThumb,
              instructions: mealDetails.strInstructions,
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

          const recipeList = await Promise.all(recipeDetails);
          setRecipes(recipeList);
        } else {
          navigate('/favorite');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    getRecipesByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={style.background}>
      <header>
        <h1 className={style.logo}>Delicacy</h1>
        <div className={style.categories}>
          {categories.map((category, index) => (
            <a
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? style.active : ''}
            >
              {category}
            </a>
          ))}
        </div>
      </header>
      <div className={style.recipes}>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            style={style}
            id={recipe.id}
            name={recipe.name}
            image={recipe.image}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
            isDetailsPage={false}
          />
        ))}
      </div>
      <MoreRecipes style={style} />
    </div>
  );
};

export default MainPage;
