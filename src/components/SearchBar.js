import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
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
  const { title } = useContext(RecipesContext);

  const [typeFilter, setTypeFilter] = useState('ingredient');
  const [listRecipe, setListRecipe] = useState([]);

  const handleChangeRadio = ({ target }) => {
    setTypeFilter(target.value);
  };

  const handleClick = async () => {
    let data;
    switch (typeFilter) {
    case 'ingredient':
      if (title === 'Drinks') {
        data = await getDrinksByIngredient(searchValue);
      } else {
        data = await getMealsByIngredient(searchValue);
      }
      setListRecipe(data);
      break;
    case 'name':
      if (title === 'Drinks') {
        data = await getDrinksByName(searchValue);
      } else {
        data = await getMealsByName(searchValue);
      }
      setListRecipe(data);
      break;
    // case 'firstLetter'
    default:
      if (searchValue.length === 1) {
        if (title === 'Drinks') {
          data = await getDrinksByFirstLetter(searchValue);
        } else {
          data = await getMealsByFirstLetter(searchValue);
        }
      } else {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setListRecipe(data);
      break;
    }
  };

  console.log(listRecipe);
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
