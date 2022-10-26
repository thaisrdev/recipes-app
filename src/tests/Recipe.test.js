import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

// describe('verificar componente Recipe', () => {
//   it('verifica a página Meals', () => {
//     const { history } = renderWithRouter(
//       <RecipesContext.Provider value={ INITIAL_STATE }>
//         <Recipes />
//       </RecipesContext.Provider>,
//       ['meals'],
//     );
//     const { pathname } = history.location;
//     expect(pathname).toBe('/meals');
//   });
//   it.skip('verifica a página Drinks', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/drinks');
//     });
//     const drinkImg = screen.getByTestId('0-card-img');
//     expect(drinkImg).toBeInTheDocument();
//     const recipeCard = screen.getByTestId('0-recipe-card');
//     expect(recipeCard).toBeInTheDocument();
//     const cardName = screen.getByTestId('0-card-name');
//     expect(cardName).toBeInTheDocument();
//     const categoryButton = screen.getByTestId('Cocktail-category-filter');
//     expect(categoryButton).toBeInTheDocument();
//   });
//   it.skip('verifica a página Meals', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/meals');
//     });
//     const mealImg = screen.getByTestId('0-card-img');
//     expect(mealImg).toBeInTheDocument();
//     const recipeCard = screen.getByTestId('0-recipe-card');
//     expect(recipeCard).toBeInTheDocument();
//     const cardName = screen.getByTestId('0-card-name');
//     expect(cardName).toBeInTheDocument();
//     const categoryButton = screen.getByTestId('Chicken-category-filter');
//     expect(categoryButton).toBeInTheDocument();
//   });
//   it.skip('verifica o Footer em Drinks', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/drinks');
//     });
//     const drinksBtn = screen.getByTestId('drinks-bottom-btn');
//     userEvent.click(drinksBtn);
//     const { pathname } = history.location;
//     expect(pathname).toBe('/drinks');
//   });
//   it.skip('verifica o footer em Meals', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/meals');
//     });
//     const mealsBtn = screen.getByTestId('meals-bottom-btn');
//     userEvent.click(mealsBtn);
//     const { pathname } = history.location;
//     expect(pathname).toBe('/meals');
//   });
//   it.skip('verifica o Header em Drinks', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/drinks');
//     });
//     const title = screen.getByTestId('page-title');
//     expect(title).toBeInTheDocument();
//     const profile = screen.getByTestId('profile-top-btn');
//     expect(profile).toBeInTheDocument();
//     const search = screen.getByTestId('search-top-btn');
//     expect(search).toBeInTheDocument();
//     const ingredient = screen.getByTestId('ingredient-search-radio');
//     expect(ingredient).toBeInTheDocument();
//     const searchBtn = screen.getByTestId('exec-search-btn');
//     expect(searchBtn).toBeInTheDocument();
//     userEvent.click(profile);
//     const { pathname } = history.location;
//     expect(pathname).toBe('/profile');
//   });
//   it.skip('verifica o Header em Meals', () => {
//     const { history } = renderWithRouter(<Recipes />);
//     act(() => {
//       history.push('/meals');
//     });
//     const title = screen.getByTestId('page-title');
//     expect(title).toBeInTheDocument();
//     const profile = screen.getByTestId('profile-top-btn');
//     expect(profile).toBeInTheDocument();
//     const search = screen.getByTestId('search-top-btn');
//     expect(search).toBeInTheDocument();
//     const ingredient = screen.getByTestId('ingredient-search-radio');
//     expect(ingredient).toBeInTheDocument();
//     const searchBtn = screen.getByTestId('exec-search-btn');
//     expect(searchBtn).toBeInTheDocument();
//     userEvent.click(profile);
//     const { pathname } = history.location;
//     expect(pathname).toBe('/profile');
//   });
// });
