import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import {
  getMealsByIngredient,
  getMealsByName,
  getMealsByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
  getDrinksByFirstLetter,
} from '../services/api';

function SearchBar({ searchValue }) {
  const {
    title, updateListDrinks, listRecipeDrinks, updateListMeals, listRecipeMeal,
  } = useContext(RecipesContext);

  const [typeFilter, setTypeFilter] = useState('ingredient');
  // const INITIAL_LIST = title === 'Drinks' ? { drinks: [] } : { meals: [] };
  // const [listRecipe, setListRecipe] = useState(INITIAL_LIST);

  const history = useHistory();

  useEffect(() => {
    if (title === 'Drinks') {
      console.log(listRecipeDrinks);
      if (listRecipeDrinks.drinks.length === 1) {
        history.push(`/drinks/${listRecipeDrinks.drinks[0].idDrink}`);
      }
    }
    if (title === 'Meals') {
      console.log(listRecipeMeal);
      if (listRecipeMeal.meals.length === 1) {
        history.push(`/meals/${listRecipeMeal.meals[0].idMeal}`);
      }
    }
  }, [listRecipeDrinks, listRecipeMeal]);

  const handleChangeRadio = ({ target }) => {
    setTypeFilter(target.value);
  };

  const verifySearchDrinks = (data) => {
    console.log(data.drinks.length);
    const alert = 'Sorry, we haven\'t found any recipes for these filters.';
    if ((title === 'Drinks') && (data.drinks.length === 0)) {
      global.alert(alert);
    }
  };
  const verifySearchMeals = (data) => {
    const alert = 'Sorry, we haven\'t found any recipes for these filters.';
    if (title === 'Meals') {
      console.log(data);
      if (data.meals.length === 0) {
        global.alert(alert);
      }
    }
  };

  const handleClick = async () => {
    let data;
    switch (typeFilter) {
    case 'ingredient':
      if (title === 'Drinks') {
        data = await getDrinksByIngredient(searchValue);
        updateListDrinks(data);
        verifySearchDrinks(data);
      } else {
        data = await getMealsByIngredient(searchValue);
        updateListMeals(data);
        verifySearchMeals(data);
      }
      break;
    case 'name':
      if (title === 'Drinks') {
        data = await getDrinksByName(searchValue);
        updateListDrinks(data);
        verifySearchDrinks(data);
      } else {
        data = await getMealsByName(searchValue);
        updateListMeals(data);
        verifySearchMeals(data);
      }
      break;
    // case 'firstLetter'
    default:
      if (searchValue.length === 1) {
        if (title === 'Drinks') {
          data = await getDrinksByFirstLetter(searchValue);
          updateListDrinks(data);
          verifySearchDrinks(data);
        } else {
          data = await getMealsByFirstLetter(searchValue);
          updateListMeals(data);
          verifySearchMeals(data);
        }
      } else {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      break;
    }
  };

  return (
    <div>
      <label htmlFor="ingredient-searc">
        <input
          id="ingredient-search"
          type="radio"
          value="ingredient"
          name="typeFilter"
          data-testid="ingredient-search-radio"
          onChange={ handleChangeRadio }
        />
        Ingredient
      </label>

      <label htmlFor="name-search">
        <input
          id="name-search"
          type="radio"
          value="name"
          name="typeFilter"
          data-testid="name-search-radio"
          onChange={ handleChangeRadio }
        />
        Name
      </label>

      <label htmlFor="first-letter-search">
        <input
          id="first-letter-search"
          type="radio"
          value="first-letter"
          name="typeFilter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeRadio }
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

export default SearchBar;
