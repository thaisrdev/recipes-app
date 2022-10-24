import React, { useEffect } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  useEffect(() => {
    document.title = 'Done Recipes';
  });

  return (
    <div>
      <Header title="Done Recipes" />
    </div>
  );
}

export default DoneRecipes;
