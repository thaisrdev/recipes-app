import PropTypes from 'prop-types';
import React from 'react';

function RecipeInProgressCard({
  title, photo, category, ingredientAndMeasure, instructions, type, video,
}) {
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
              htmlFor={ index }
              key={ index }
            >
              <input type="checkbox" id={ index } />
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
  video: PropTypes.shape({
    replace: PropTypes.func,
  }),
}.isRequired;

export default RecipeInProgressCard;
