import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getDrinkById, getMealById,
  getAllDrinks, getAllMeals,
} from '../services/api';
import RecipeDetailsCard from './RecipeDetailsCard';
import RecommendationCard from './RecommendationCard';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails({ match: { params, path, url } }) {
  const mealUrl = '/meals/:id';
  const [recipe, setRecipe] = useState(path === mealUrl
    ? { meals: [] } : { drinks: [] });
  const [isMeal, setIsMeal] = useState(false);
  const [type, setType] = useState(path === mealUrl
    ? ('meals') : ('drinks'));
  const [ingredientAndMeasureList, setIngredientAndMeasureList] = useState(
    [{ ingredient: '', measure: '' }],
  );
  const [recommendation, setRecommendation] = useState([]);
  const [isStarted, setIsStarted] = useState('Start Recipe');
  const [isShared, setIsShared] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (path === mealUrl) {
      const getMealByIdApi = async () => {
        const mealById = await getMealById(params.id);
        setRecipe(mealById.meals[0]);
        setIsMeal(true);
        setType('meals');
      };
      getMealByIdApi();
      const getDrinkRecommendationApi = async () => {
        const drinkRecommendation = await getAllDrinks();
        setRecommendation(drinkRecommendation.drinks);
      };
      getDrinkRecommendationApi();
    } else {
      const getDrinkByIdApi = async () => {
        const drinkById = await getDrinkById(params.id);
        setRecipe(drinkById.drinks[0]);
        setIsMeal(false);
        setType('drinks');
      };
      getDrinkByIdApi();
      const getMealRecommendationApi = async () => {
        const mealRecommendation = await getAllMeals();
        setRecommendation(mealRecommendation.meals);
      };
      getMealRecommendationApi();
    }
  }, [params.id, path]);

  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'inProgressRecipes')) {
      const inputsStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inputsStorage[type][params.id]) {
        setIsStarted('Continue Recipe');
      } else {
        setIsStarted('Start Recipe');
      }
    }
  }, [params.id, isStarted]);

  useEffect(() => {
    const ingredientAndMeasureArray = () => {
      const maxFor = 19;
      const arrayIngredientAndMeasure = [];
      for (let index = 1; index <= maxFor; index += 1) {
        if (recipe[type] === undefined) {
          const ingredient = `strIngredient${index}`;
          const measure = `strMeasure${index}`;
          if (recipe[ingredient] !== ''
          && recipe[ingredient] !== null && recipe[ingredient] !== undefined) {
            const obj = { ingredient: recipe[ingredient], measure: recipe[measure] };
            arrayIngredientAndMeasure.push(obj);
            setIngredientAndMeasureList(arrayIngredientAndMeasure);
          }
        }
      }
    };
    ingredientAndMeasureArray();
  }, [recipe, type]);

  const handleShareClick = async () => {
    setIsShared(true);
    if (path === mealUrl) {
      const mealById = await getMealById(params.id);
      const code = mealById.meals[0].idMeal;
      navigator.clipboard.writeText(`http://localhost:3000/meals/${code}`);
    } else {
      const drinkById = await getDrinkById(params.id);
      const code = drinkById.drinks[0].idDrink;
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${code}`);
    // https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    }
  };

  const addFavorite = () => {
    setIsFavorited(true);
  };

  const removeFavorite = () => {
    setIsFavorited(false);
  };

  return (
    <div>
      <h3 data-testid="teste">Recipe Details</h3>
      <RecipeDetailsCard
        isMeal={ isMeal }
        photo={ path === mealUrl ? recipe.strMealThumb : recipe.strDrinkThumb }
        title={ path === mealUrl ? recipe.strMeal : recipe.strDrink }
        category={ path === mealUrl ? recipe.strCategory : recipe.strAlcoholic }
        instructions={ recipe.strInstructions }
        video={ recipe.strYoutube }
        ingredientAndMeasure={ ingredientAndMeasureList }
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        Share
      </button>
      {isShared && <h2>Link copied!</h2>}

      { isFavorited
        ? (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ removeFavorite }
          >
            <img src={ blackHeartIcon } alt="Favorited" />
          </button>
        )
        : (
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ addFavorite }
          >
            <img src={ whiteHeartIcon } alt="Not Favorited" />
          </button>
        )}

      <div className="scrolling">
        <RecommendationCard recommendation={ recommendation } />
      </div>
      <button
        className="footerBtn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${url}/in-progress`) }
      >
        { isStarted }
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeDetails;
