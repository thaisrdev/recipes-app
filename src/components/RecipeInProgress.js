import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressCard from './RecipeInProgressCard';
import { getDrinkById, getMealById } from '../services/api';

function RecipeInProgress({ match }) {
  const { params, path } = match;
  const mealUrl = '/meals/:id/in-progress';

  const [recipe, setRecipe] = useState(path === mealUrl
    ? { meals: [] } : { drinks: [] });
  const [type, setType] = useState(path === mealUrl
    ? ('meals') : ('drinks'));
  const [ingredientAndMeasureList, setIngredientAndMeasureList] = useState(
    [{ ingredient: '', measure: '' }],
  );

  useEffect(() => {
    if (path === '/meals/:id/in-progress') {
      const getMealByIdApi = async () => {
        const mealById = await getMealById(params.id);
        setType('meals');
        console.log(mealById);
        setRecipe(mealById.meals[0]);
      };
      getMealByIdApi();
    } else {
      const getDrinkByIdApi = async () => {
        const drinkById = await getDrinkById(params.id);
        setType('drinks');
        console.log(drinkById);
        setRecipe(drinkById.drinks[0]);
      };
      getDrinkByIdApi();
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
  return (
    <div>
      <RecipeInProgressCard
        type={ type }
        photo={ path === mealUrl ? recipe.strMealThumb : recipe.strDrinkThumb }
        title={ path === mealUrl ? recipe.strMeal : recipe.strDrink }
        category={ path === mealUrl ? recipe.strCategory : recipe.strAlcoholic }
        instructions={ recipe.strInstructions }
        video={ recipe.strYoutube }
        ingredientAndMeasure={ ingredientAndMeasureList }
        idRecipe={ params.id }
        trueCategory={ recipe.strCategory }
        tags={ recipe.strTags }
        nationality={ path === mealUrl ? recipe.strArea : '' }
      />
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgress;
