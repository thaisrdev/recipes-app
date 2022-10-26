import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllMeals, getMealCategories } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const {
    listRecipeMeal,
    updateListMeals,
    mealCategories,
    setMealCategories,
  } = useContext(RecipesContext);

  useEffect(() => {
    document.title = 'Meals';
  });

  useEffect(() => {
    const getMealsApi = async () => {
      const totalMeals = await getAllMeals();
      updateListMeals(totalMeals);
    };
    getMealsApi();
  }, []);

  useEffect(() => {
    const getCategoriesApi = async () => {
      const categories = await getMealCategories();
      const results = categories.meals.slice(0, +'5');
      console.log(results);
      setMealCategories(results);
    };
    getCategoriesApi();
  }, []);

  return (
    <div>
      <Header title="Meals" />

      { mealCategories.map((element, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${element.strCategory}-category-filter` }
        >
          {element.strCategory}
        </button>
      ))}

      { listRecipeMeal.meals.slice(0, +'12').map((element, index) => (
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
