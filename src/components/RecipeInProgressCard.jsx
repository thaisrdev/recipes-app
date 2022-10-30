import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeInProgressCard({
  title, photo, category, ingredientAndMeasure, instructions, type, video, idRecipe,
  trueCategory, tags, nationality,
}) {
  // const [inputs, setInputs] = useState([{}]);
  const [used, setUsed] = useState([]);
  const [storageRecipes, setStorageRecipes] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let inputsStorage = [];
    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      inputsStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setStorageRecipes(inputsStorage);
      if (inputsStorage[type] !== undefined) {
        console.log(null);
        if (inputsStorage[type][idRecipe] !== undefined) {
          setUsed(inputsStorage[type][idRecipe]);
        }
      }
    }
  }, [ingredientAndMeasure]);

  useEffect(() => {
    if (used.length > 0) {
      const obj = storageRecipes;
      if (storageRecipes[type] !== undefined) {
        obj[type] = storageRecipes[type];
      } else {
        obj[type] = {};
      }
      obj[type][idRecipe] = used;
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (used.length === ingredientAndMeasure.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [used, setUsed]);

  // function handleChange(id, isChecked, name) {
  //   setInputs((prevState) => [...prevState, { [name]: isChecked }]);
  // }

  function handleClick({ target }) {
    const { name } = target;
    // handleChange(id, checked, name);
    used.forEach((element) => {
      if (element === name) {
        const newArray = used.filter((filter) => filter !== name);
        setUsed(newArray);
      }
    });
    const includes = used.find((find) => (find === name));
    console.log(includes);
    if (includes !== name) {
      setUsed((prevState) => [...prevState, name]);
    }
  }

  function doneRecipes() {
    const today = new Date();
    let inProgressStorage = [];
    if (Object.prototype.hasOwnProperty.call(localStorage, 'doneRecipes')) {
      inProgressStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    }
    const obj = [...inProgressStorage, {
      id: idRecipe,
      nationality,
      name: title,
      category: type === 'meals' ? category : trueCategory,
      image: photo,
      tags: tags === null ? [] : tags.split(','),
      alcoholicOrNot: type === 'drinks' ? category : '',
      type: type === 'meals' ? 'meal' : 'drink',
      doneDate: today,
    }];
    console.log(obj);
    localStorage.setItem('doneRecipes', JSON.stringify(obj));
    history.push('/done-recipes');
  }
  return (
    <div>
      <p><img data-testid="recipe-photo" alt={ title } src={ photo } /></p>
      <h4 data-testid="recipe-title">{title}</h4>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h6 data-testid="recipe-category">{category}</h6>
      <ul>
        {ingredientAndMeasure && ingredientAndMeasure.map((element, index) => (
          <li
            key={ index }
          >
            <label
              data-testid={ `data-testid=${index}-ingredient-step` }
              className={
                used.includes(`${element.ingredient} - ${element.measure}`)
                  ? 'doneMeasureAndIngredient' : 'notDoneMeasureAndIngredient'
              }
              htmlFor={ index }
              key={ index }
            >
              <input
                checked={
                  used.find((u) => u === `${element.ingredient} - ${element.measure}`)
                }
                name={ `${element.ingredient} - ${element.measure}` }
                type="checkbox"
                id={ index }
                onClick={ handleClick }
              />
              { `${element.ingredient} - ${element.measure}` }
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      { type === 'meals'
      && video !== undefined && <iframe
        data-testid="video"
        title="video"
        height="480"
        width="500"
        frameBorder="0"
        src={ video.replace('watch?v=', 'embed/') }
      />}
      <button
        disabled={ isDisabled }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ doneRecipes }
      >
        Finalizar
      </button>
    </div>
  );
}

RecipeInProgressCard.propTypes = {
  category: PropTypes.any,
  ingredientAndMeasure: PropTypes.shape({
    map: PropTypes.func,
  }),
  instructions: PropTypes.any,
  trueCategory: PropTypes.any,
  isMeal: PropTypes.any,
  nationality: PropTypes.any,
  tags: PropTypes.any,
  photo: PropTypes.any,
  title: PropTypes.any,
  idRecipe: PropTypes.any,
  video: PropTypes.shape({
    replace: PropTypes.func,
  }),
}.isRequired;

export default RecipeInProgressCard;
