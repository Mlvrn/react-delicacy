export const addToFavorites = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.find((fav) => fav.id === recipe.id)) {
    favorites.push(recipe);
  } else {
    const updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return;
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const isFavorite = (recipe) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some((fav) => fav.id === recipe.id);
};
