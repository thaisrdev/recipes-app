import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function RecipeInProgressCard({
  title, photo, category, ingredientAndMeasure, instructions, type, video, idRecipe,
}) {
  const [inputs, setInputs] = useState([{}]);
  const [used, setUsed] = useState([]);

  // const obj = {
  //   drinks: {
  //     id: [],
  //   },
  //   meals: {
  //     id: [],
  //   },
  // };

  console.log(used);
  console.log(idRecipe);

  useEffect(() => {
    let inputsStorage = [];
    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      inputsStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(inputsStorage);
      // setUsed(inputsStorage.idRecipe);
    }
    console.log(inputsStorage);
  }, []);

  // useEffect(() => {
  //   if (used.length > 0) {
  //     const teste = { idRecipe: [...used] };
  //     localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  //   }
  // }, [used, setUsed]);

  // useEffect(() => {
  //   console.log('atualizou input', inputs);
  //   const obj = {
  //     id: []
  //   }
  //   localStorage.setItem(type, JSON.stringify())
  // }, [inputs, setInputs]);

  function handleChange(id, isChecked) {
    setInputs({
      ...inputs,
      [id]: isChecked,
    });
  }
  function handleClick({ target }) {
    const { checked, id, name } = target;
    handleChange(id, checked);

    setUsed((prevState) => [...prevState, name]);
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
              className={ inputs[index]
                ? 'doneMeasureAndIngredient' : 'notDoneMeasureAndIngredient' }
              htmlFor={ index }
              key={ index }
            >
              <input
                name={ element.ingredient }
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
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

RecipeInProgressCard.propTypes = {
  category: PropTypes.any,
  ingredientAndMeasure: PropTypes.shape({
    map: PropTypes.func,
  }),
  instructions: PropTypes.any,
  isMeal: PropTypes.any,
  photo: PropTypes.any,
  title: PropTypes.any,
  idRecipe: PropTypes.any,
  video: PropTypes.shape({
    replace: PropTypes.func,
  }),
}.isRequired;

export default RecipeInProgressCard;
