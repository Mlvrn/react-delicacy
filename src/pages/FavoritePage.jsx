import MoreRecipeCard from '../components/MoreRecipeCard';
import style from '../styles/style.module.scss';
import { useEffect, useState } from 'react';
import { callApi } from '../domain/api';
import { useNavigate } from 'react-router-dom';

const FavoritePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Favorite');
  const favoriteRecipes = JSON.parse(localStorage.getItem('favorites')) || [];

  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    if (category !== 'Favorite') {
      navigate('/');
    }
    setSelectedCategory(category);
  };

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
      <div className={style.grid}>
        {favoriteRecipes.length === 0 ? (
          <p className={style.empty}>No favorite recipes found.</p>
        ) : (
          favoriteRecipes.map((recipe, index) => (
            <div key={index} className={style.grid_item}>
              <MoreRecipeCard
                style={style}
                id={recipe.id}
                image={recipe.image}
                name={recipe.name}
                isFavoritePage={true}
                favoriteRecipes={favoriteRecipes}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
