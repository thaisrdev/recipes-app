import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllMeals } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { listRecipe, updateList } = useContext(RecipesContext);

  useEffect(() => {
    document.title = 'Meals';
  });

  useEffect(() => {
    const getMealsApi = async () => {
      const totalMeals = await getAllMeals();
      const mealsPage = await totalMeals.meals.slice(0, +'12');
      console.log(mealsPage);
      updateList(mealsPage);
    };
    getMealsApi();
  }, [updateList]);

  console.log(listRecipe);

  return (
    <div>
      <Header title="Meals" />
      { listRecipe.map((element, index) => (
        <div key="index">

          <img
            src={ element.strMealThumb }
            alt="meal-img"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { element.strMeal }
          </p>

        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Meals;
