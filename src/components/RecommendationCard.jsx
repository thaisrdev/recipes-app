import PropTypes from 'prop-types';
import React from 'react';

function RecommendationCard({ recommendation }) {
  const SIX = 6;
  return (
    <div>
      {
        recommendation.length > 0
        && recommendation.slice(0, SIX).map((element, index) => (
          <div
            className="cardRecommendation"
            key={ index }
            data-testid={ `${index}-recommendation-card` }
          >
            <h4 data-testid={ `${index}-recommendation-title` }>
              {element.strMeal || element.strDrink }
              {' '}
            </h4>
          </div>
        ))
      }
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendation: PropTypes.shape({
    length: PropTypes.number,
    slice: PropTypes.func,
  }),
}.isRequired;

// RecommendationCard.propTypes = {

// }.isRequired;

export default RecommendationCard;
