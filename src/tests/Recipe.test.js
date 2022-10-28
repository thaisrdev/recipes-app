import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

describe('verificar componente Recipe pela pagina drinks', () => {
  const INITIAL_STATE = {
    title: 'Drinks',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };
  it('verifica a página Drinks', () => {
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Recipes />
      </RecipesContext.Provider>,
      ['drinks'],
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});

describe('verificar componente Recipe pela pagina meals', () => {
  const INITIAL_STATE = {
    title: 'Meals',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };
  it('verifica a página Meals', () => {
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Recipes />
      </RecipesContext.Provider>,
      ['meals'],
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
