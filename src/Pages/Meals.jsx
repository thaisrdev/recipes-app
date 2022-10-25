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
      updateList(totalMeals);
    };
    getMealsApi();
  }, []);

  return (
    <div>
      <Header title="Meals" />
      { listRecipe.meals.slice(0, +'12').map((element, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>

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
