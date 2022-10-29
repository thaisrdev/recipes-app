import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllMeals, getMealCategories, filterMealCategories } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const {
    listRecipeMeal,
    updateListMeals,
    mealCategories,
    setMealCategories,
  } = useContext(RecipesContext);

  const [category, setCategory] = useState([]);
  const [savedParam, setSavedParam] = useState('');
  const history = useHistory();

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

  const handleClick = async (param) => {
    if (savedParam === param) {
      setCategory([]);
      setSavedParam('');
    } else {
      const filterCategory = await filterMealCategories(param);
      console.log(filterCategory);
      setCategory(filterCategory.meals);
      setSavedParam(param);
    }
  };

  const handleAllFilters = () => {
    setCategory([]);
    console.log(category);
  };

  return (
    <div>
      <Header title="Meals" />

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleAllFilters() }
      >
        All
      </button>

      { mealCategories.map((element, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${element.strCategory}-category-filter` }
          onClick={ () => handleClick(element.strCategory) }
        >
          {element.strCategory}
        </button>
      ))}

      { category.length > 0 ? category.slice(0, +'12')
        .map((element, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/meals/${element.idMeal}`) }
          >

            <img
              src={ element.strMealThumb }
              alt="meal-img"
              data-testid={ `${index}-card-img` }
              width="300px"
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { element.strMeal }
            </p>

          </button>
        ))
        : listRecipeMeal.meals.slice(0, +'12')
          .map((element, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => history.push(`/meals/${element.idMeal}`) }
            >

              <img
                src={ element.strMealThumb }
                alt="meal-img"
                data-testid={ `${index}-card-img` }
                width="300px"
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { element.strMeal }
              </p>

            </button>
          ))}
      <Footer />
    </div>
  );
}

export default Meals;
