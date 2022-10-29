import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const [savedParam, setSavedParam] = useState('');
  const history = useHistory();

  useEffect(() => {
    document.title = 'Drinks';
  });

  useEffect(() => {
    const getDrinksApi = async () => {
      const totalDrinks = await getAllDrinks();
      updateListDrinks(totalDrinks);
    };
    getDrinksApi();
  }, []);

  useEffect(() => {
    const getCategoriesApi = async () => {
      const categories = await getDrinkCategories();
      const results = categories.drinks.slice(0, +'5');
      setDrinkCategories(results);
    };
    getCategoriesApi();
  }, []);

  const handleClick = async (param) => {
    if (savedParam === param) {
      setCategory([]);
      setSavedParam('');
    } else {
      const filterCategory = await filterDrinkCategories(param);
      console.log(filterCategory);
      setCategory(filterCategory.drinks);
      setSavedParam(param);
    }
  };

  const handleAllFilters = () => {
    setCategory([]);
    console.log(category);
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
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/drinks/${element.idDrink}`) }
          >

            <img
              src={ element.strDrinkThumb }
              alt="drink-img"
              data-testid={ `${index}-card-img` }
              width="300px"
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { element.strDrink }
            </p>

          </button>
        )) : listRecipeDrinks.drinks.slice(0, +'12')
        .map((e, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/drinks/${e.idDrink}`) }
          >

            <img
              src={ e.strDrinkThumb }
              alt="drink-img"
              data-testid={ `${index}-card-img` }
              width="300px"
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { e.strDrink }
            </p>

          </button>
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;
