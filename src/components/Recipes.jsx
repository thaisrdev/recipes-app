import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const {
    title,
  } = useContext(RecipesContext);

  const history = useHistory();

  useEffect(() => {
    if (title === 'Drinks') {
      history.push('/drinks');
    }
    if (title === 'Meals') {
      history.push('/meals');
    }
  }, []);

  return (
    <div>
      <h3>
        Recipes
      </h3>
    </div>
  );
}

export default Recipes;
