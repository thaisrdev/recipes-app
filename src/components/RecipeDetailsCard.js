import PropTypes from 'prop-types';
import React from 'react';

function RecipeDetailsCard(
  { photo, title, category, ingredientAndMeasure, instructions, video, isMeal },
) {
  return (
    <div>
      <p><img data-testid="recipe-photo" alt={ title } src={ photo } /></p>
      <h4 data-testid="recipe-title">{title}</h4>
      <h6 data-testid="recipe-category">{category}</h6>
      <ul>
        {ingredientAndMeasure.map((element, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { `${element.ingredient} - ${element.measure}` }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ instructions }</p>
      { isMeal
      && video !== undefined && <iframe
        data-testid="video"
        title="video"
        height="480"
        width="500"
        frameBorder="0"
        src={ video.replace('watch?v=', 'embed/') }
      />}
    </div>
  );
}

RecipeDetailsCard.propTypes = {
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

export default RecipeDetailsCard;
