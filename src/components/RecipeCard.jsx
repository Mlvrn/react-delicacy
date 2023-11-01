import { Card, CardContent } from '@mui/material';
import IngredientCard from './INgredientCard';
import { Link } from 'react-router-dom';
import { addToFavorites, isFavorite } from '../utils/favorite';
import { useEffect, useState } from 'react';

const RecipeCard = ({
  style,
  id,
  name,
  image,
  instructions,
  ingredients,
  isDetailsPage,
}) => {
  const initialFavorite = isFavorite({ id, name });
  const [favorite, setFavorite] = useState(initialFavorite);

  useEffect(() => {
    setFavorite(initialFavorite);
  }, [initialFavorite]);

  const handleFavoriteClick = () => {
    if (favorite) {
      const updatedFavorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      ).filter((fav) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      addToFavorites({ id, name, image, instructions, ingredients });
    }

    setFavorite(!favorite);
  };

  return (
    <div className={style.container}>
      <Card className={style.card}>
        <div className={style.card_background}>
          <h3>{name}</h3>
          <CardContent className={style.content}>
            <p>{instructions}</p>
            <h3>Ingredients</h3>
            <div className={style.ingredient}>
              {ingredients?.map(({ ingredient, measure }, index) => (
                <div className={style.item} key={index}>
                  <IngredientCard style={style} />
                  <div className={style.item_description}>
                    <h4>{ingredient}</h4>
                    <p>{measure}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={style.button_container}>
              {!isDetailsPage && (
                <Link to={`/details/${id}`} className={style.details}>
                  Details
                </Link>
              )}
              <a onClick={handleFavoriteClick}>
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </a>
            </div>
          </CardContent>
        </div>
      </Card>

      <img src={image} alt={name} />
    </div>
  );
};

export default RecipeCard;
