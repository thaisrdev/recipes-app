import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// const doneRecipes = [
//   {
//     id: '52771',
//     type: 'meal',
//     nationality: 'Italian',
//     category: 'Vegetarian',
//     alcoholicOrNot: '',
//     name: 'Spicy Arrabiata Penne',
//     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
//     doneDate: '23/06/2020',
//     tags: ['Pasta', 'Curry'],
//   },
//   {
//     id: '178319',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'Aquamarine',
//     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//     doneDate: '23/06/2020',
//     tags: [],
//   },
// ];

describe('Testa Done Recipes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('Verifica se renderiza a pagina com os elementos sem localStorage', async () => {
    const { history } = renderWithRouter(<App />, ['/done-recipes']);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const mealBtn = screen.getByRole('button', { name: /meals/i });
    expect(mealBtn).toBeInTheDocument();
    userEvent.click(mealBtn);
    const drinkBtn = screen.getByRole('button', { name: /drinks/i });
    expect(drinkBtn).toBeInTheDocument();
    userEvent.click(drinkBtn);
  });
});
