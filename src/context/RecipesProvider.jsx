import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [title, setTitle] = useState('');
  const [listRecipeMeal, setListRecipeMeal] = useState({ meals: [] });
  const [listRecipeDrinks, setListRecipeDrinks] = useState({ drinks: [] });
  const [mealCategories, setMealCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const updateListMeals = (list) => setListRecipeMeal(list);
  const updateListDrinks = (list) => setListRecipeDrinks(list);

  const handleTitle = (titleParam) => setTitle(titleParam);

  const value = useMemo(() => ({
    title,
    setTitle,
    handleTitle,
    listRecipeMeal,
    updateListMeals,
    listRecipeDrinks,
    updateListDrinks,
    mealCategories,
    setMealCategories,
    drinkCategories,
    setDrinkCategories,
  }), [
    listRecipeDrinks,
    listRecipeMeal,
    title,
    mealCategories,
    setMealCategories,
    drinkCategories,
    setDrinkCategories,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
