import React, { useEffect } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  useEffect(() => {
    document.title = 'Favorite Recipes';
  });

  return (
    <div>
      <Header title="Favorite Recipes" />
    </div>
  );
}

export default FavoriteRecipes;
