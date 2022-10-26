import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllDrinks, getDrinkCategories } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const {
    listRecipeDrinks,
    updateListDrinks,
    drinkCategories,
    setDrinkCategories,
  } = useContext(RecipesContext);

  useEffect(() => {
    document.title = 'Drinks';
  });

  useEffect(() => {
    const getDrinksApi = async () => {
      const totalDrinks = await getAllDrinks();
      console.log(totalDrinks);
      updateListDrinks(totalDrinks);
    };
    getDrinksApi();
  }, []);

  useEffect(() => {
    const getCategoriesApi = async () => {
      const categories = await getDrinkCategories();
      const results = categories.drinks.slice(0, +'5');
      console.log(results);
      setDrinkCategories(results);
    };
    getCategoriesApi();
  }, []);

  console.log(listRecipeDrinks);
  return (
    <div>
      <Header title="Drinks" />

      { drinkCategories.map((element, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${element.strCategory}-category-filter` }
        >
          {element.strCategory}
        </button>
      ))}

      { listRecipeDrinks.drinks.slice(0, +'12')
        .map((element, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>

            <img
              src={ element.strDrinkThumb }
              alt="meal-img"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { element.strDrink }
            </p>

          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
