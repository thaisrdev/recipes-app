import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [copiedLink, copiedLinkset] = useState(false);
  const [filterDrinks, setFilterDrinks] = useState(false);
  const [filterMeals, setFilterMeals] = useState(false);

  const getURL = (item) => {
    const url = `http://localhost:3000/${item.type}s/${item.id}`;

    copy(url);

    copiedLinkset(true);
  };

  const verificação = () => {
    if (filterMeals) {
      return 'meal';
    }
    if (filterDrinks) {
      return 'drink';
    }
  };

  const recipeFilter = (type) => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'meal' && allRecipes !== null) {
      const recipesFilters = allRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    if (type === 'drink' && allRecipes !== null) {
      const recipesFilters = allRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    return allRecipes;
  };
  return (
    <div>
      {
        copiedLink && <h2>Link copied!</h2>
      }
      <Header title=" done-recipes">Done Recipes</Header>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setFilterDrinks(false);
          setFilterMeals(false);
        } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => {
          setFilterMeals(!filterMeals);
          setFilterDrinks(false);
        } }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setFilterDrinks(!filterDrinks);
          setFilterMeals(false);
        } }
      >
        Drinks
      </button>

      {recipeFilter(verificação())?.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
            }
          >
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
              width="250px"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
            }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

          <button
            type="button"
            onClick={ () => getURL(recipe) }
            className="btnURL"
          >
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              className="doneRecipesShare"
            />
          </button>
          <ul>
            {recipe?.tags.map((tagName) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagName }
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
