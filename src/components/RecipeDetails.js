import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getDrinkById, getMealById,
  getAllDrinks, getAllMeals,
} from '../services/api';
import RecipeDetailsCard from './RecipeDetailsCard';

function RecipeDetails({ match: { params, path } }) {
  const mealUrl = '/meals/:id';
  const [recipe, setRecipe] = useState(path === mealUrl
    ? { meals: [] } : { drinks: [] });
  const [isMeal, setIsMeal] = useState(false);
  const [type, setType] = useState(path === mealUrl
    ? ('meals') : ('drinks'));
  const [ingredientAndMeasureList, setIngredientAndMeasureList] = useState(
    [{ ingredient: '', measure: '' }],
  );
  const [recommendation, setRecommendation] = useState(path === mealUrl
    ? { drinks: [] } : { meals: [] });

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
        setRecommendation(drinkRecommendation);
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
        setRecommendation(mealRecommendation);
      };
      getMealRecommendationApi();
    }
  }, [params.id, path]);

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
  console.log(recommendation);
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
