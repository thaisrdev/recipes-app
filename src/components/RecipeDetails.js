import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getDrinkById, getMealById,
  getAllDrinks, getAllMeals,
} from '../services/api';
import RecipesContext from '../context/RecipesContext';
import RecipeDetailsCard from './RecipeDetailsCard';
import RecommendationCard from './RecommendationCard';

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

  const { updateRecipeInProgress } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (path === '/meals/:id') {
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

  const updateInProgress = (array) => {
    const obj = {
      isMeal,
      photo: (path === mealUrl ? recipe.strMealThumb : recipe.strDrinkThumb),
      title: (path === mealUrl ? recipe.strMeal : recipe.strDrink),
      category: (path === mealUrl ? recipe.strCategory : recipe.strAlcoholic),
      instructions: (recipe.strInstructions),
      video: (recipe.strYoutube),
      ingredientAndMeasure: (array),
    };
    updateRecipeInProgress(obj);
  };

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
      if (recipe[type] === undefined) {
        updateInProgress(arrayIngredientAndMeasure);
      }
    };
    ingredientAndMeasureArray();
  }, [recipe, type]);
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
      <div className="scrolling">
        <RecommendationCard recommendation={ recommendation } />
      </div>
      <button
        className="footerBtn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${url}/in-progress`) }
      >
        Start Recipe
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
