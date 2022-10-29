import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, CarouselItem } from 'react-bootstrap';

function RecommendationCard({ recommendation }) {
  const SIX = 6;
  return (
    <div>
      <Carousel>
        {
          recommendation.length > 0
          && recommendation.slice(0, SIX).map((element, index) => (
            <CarouselItem data-testid={ `${index}-recommendation-card` } key={ index }>
              <h4 data-testid={ `${index}-recommendation-title` }>
                {element.strMeal || element.strDrink }
              </h4>
            </CarouselItem>
          ))
        }
      </Carousel>
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
