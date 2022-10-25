import React, { useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllDrinks } from '../services/api';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { listRecipe, updateList } = useContext(RecipesContext);

  useEffect(() => {
    document.title = 'Drinks';
  });

  useEffect(() => {
    const getDrinksApi = async () => {
      const totalDrinks = await getAllDrinks();
      updateList(totalDrinks);
    };
    getDrinksApi();
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      { listRecipe.drinks.slice(0, +'12').map((element, index) => (
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
