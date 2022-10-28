import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

import Header from '../components/Header';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setfilteredRecipes] = useState([]);
  const history = useHistory();

  const getRecipes = () => {
    const recipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(recipesArr);
    setfilteredRecipes(recipesArr);
  };

  const handleShareButton = (e, id) => {
    copy(`http://localhost:3000/meals/${id}`);
    const p = document.createElement('p');
    p.innerHTML = 'Link copied!';
    e.target.parentNode.appendChild(p);
  };

  const unFav = (id) => {
    const fltRecipes = recipes.filter((rcp) => rcp.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fltRecipes));
    setRecipes(fltRecipes);
    setfilteredRecipes(fltRecipes);
  };

  const filterRecipes = (type) => {
    let allRecipes = recipes;
    if (type === 'meal') {
      allRecipes = recipes.filter((rcp) => rcp.type === 'meal');
    }

    if (type === 'drink') {
      allRecipes = recipes.filter((rcp) => rcp.type === 'drink');
    }

    setfilteredRecipes(allRecipes);
  };

  const changeRoute = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        iconSearch={ false }
      />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          meal
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </div>

      { filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <div
            onKeyPress={ () => changeRoute(recipe.type, recipe.id) }
            onClick={ () => changeRoute(recipe.type, recipe.id) }
            role="link"
            tabIndex="0"
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="meal"
              style={ { width: '100vw' } }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.alcoholicOrNot || recipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </div>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ (e) => handleShareButton(e, recipe.id) }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ () => unFav(recipe.id) }
          >
            <img src={ blackHeartIcon } alt="black Heart icon" />
          </button>
        </div>
      )) }
    </div>
  );
}

export default FavoriteRecipes;
