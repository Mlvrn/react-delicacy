import { Card, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';
import { addToFavorites, isFavorite } from '../utils/favorite';

const MoreRecipeCard = ({
  style,
  name,
  image,
  id,
  instructions,
  ingredients,
  onClick,
  isFavoritePage,
  favoriteRecipes,
}) => {
  const initialFavorite = isFavorite({ id, name });
  const [favorite, setFavorite] = useState(initialFavorite);

  const handleFavoriteClick = () => {
    if (favorite) {
      const updatedFavorites = favoriteRecipes.filter((fav) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorite(!favorite);
    } else {
      addToFavorites({ id, name, image, instructions, ingredients });
      setFavorite(!favorite);
    }
  };

  return (
    <div className={style.relative} onClick={() => onClick(id)}>
      <Card className={style.more_recipes_card}>
        <div className={style.more_recipes_card_background}>
          <p>{name}</p>

          {isFavoritePage && (
            <a onClick={handleFavoriteClick}>
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </a>
          )}
        </div>
      </Card>
      <CardMedia component="img" image={image} alt={name} />
    </div>
  );
};

export default MoreRecipeCard;
