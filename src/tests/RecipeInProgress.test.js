import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

describe('Testa recipe in progress em meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise
      .resolve({ json: () => Promise.resolve({ meals: [meals.meals[0]] }),
      }));
  });
  it('Verifica se renderiza a pagina com o id correto na url renderizando meal', async () => {
    const { history } = renderWithRouter(<App />, ['/meals/52977/in-progress']);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977/in-progress');
  });
});

describe('Testa recipe in progress em drinks', () => {
  const DRINK_ID_INPROGRESS = '/drinks/15997/in-progress';
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise
      .resolve({ json: () => Promise.resolve({ drinks: [drinks.drinks[0]] }),
      }));
  });
  it('Verifica se renderiza a pagina com o id correto na url renderizando drink', async () => {
    const { history } = renderWithRouter(<App />, [DRINK_ID_INPROGRESS]);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
  });

  // it('Testa recipe in progress de drinks acessando details primeiro', async () => {
  //   const { history } = renderWithRouter(<App />, ['/drinks/15997/']);
  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/drinks/15997/');
  //   const startBtn = screen.getByRole('button', { name: /start recipe/i });
  //   expect(startBtn).toBeInTheDocument();
  //   userEvent.click(startBtn);
  //   const titleDrink = await screen.getByRole('heading', { name: /gg/i });
  //   expect(titleDrink).toBeInTheDocument();
  //   await waitFor(() => expect(pathname).toBe(DRINK_ID_INPROGRESS));
  // });
});
