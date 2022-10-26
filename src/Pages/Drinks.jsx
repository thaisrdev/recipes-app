import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllDrinks, getDrinkCategories, filterDrinkCategories } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const {
    listRecipeDrinks,
    updateListDrinks,
    drinkCategories,
    setDrinkCategories,
  } = useContext(RecipesContext);

  const [category, setCategory] = useState([]);

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

  const handleClick = async (param) => {
    const filterCategory = await filterDrinkCategories(param);
    console.log(filterCategory);
    setCategory(filterCategory.drinks);
  };

  const handleAllFilters = () => {
    setCategory([]);
  };

  return (
    <div>
      <Header title="Drinks" />

      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleAllFilters() }
      >
        All
      </button>

      { drinkCategories.map((element, index) => (
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
          <div key={ index } data-testid={ `${index}-recipe-card` }>

            <img
              src={ element.strDrinkThumb }
              alt="drink-img"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { element.strDrink }
            </p>

          </div>
        )) : listRecipeDrinks.drinks.slice(0, +'12')
        .map((e, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>

            <img
              src={ e.strDrinkThumb }
              alt="drink-img"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { e.strDrink }
            </p>

          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
