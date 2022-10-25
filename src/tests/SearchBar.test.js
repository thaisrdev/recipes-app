import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesContext from '../context/RecipesContext';
import Drinks from '../Pages/Drinks';
import Meals from '../Pages/Meals';
import Login from '../Pages/Login';

global.fetch = jest.fn(() => Promise
  .resolve({ json: () => Promise.resolve({ meals: 'Katsu Chicken curry' }),
  }));

const ingredientRadioId = 'ingredient-search-radio';
const searchBtnId = 'search-btn';
const searchInputId = 'search-input';
describe('Testa a SearchBar pelo componente Drinks', () => {
  window.alert = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  const INITIAL_STATE = {
    title: 'Drinks',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };
  it('Verifica se os radio button e o button estão na tela ao renderizar', () => {
    const title = 'Drinks';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Drinks title={ title } />
      </RecipesContext.Provider>,
    );

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    expect(firstLetterRadio).toBeInTheDocument();
    userEvent.click(firstLetterRadio);

    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.click(ingredientRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();
  });

  it('Verifica filtro por nome na pagina de Drinks', () => {
    const title = 'Drinks';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Drinks title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'gin');

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro por ingrediente na pagina de Drinks', () => {
    const title = 'Drinks';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Drinks title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'gin');

    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    userEvent.click(ingredientRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro pela primeira letra (com somente uma letra) na pagina de Drinks', () => {
    const title = 'Drinks';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Drinks title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'g');

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro pela primeira letra (com mais de uma letra) na pagina de Drinks', () => {
    const title = 'Drinks';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Drinks title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'gi');

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    window.alert.mockClear();
  });
});

describe('Testa a SearchBar pelo componente Meals', () => {
  window.alert = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  const INITIAL_STATE = {
    title: 'Meals',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };
  it('Verifica filtro por nome na pagina de Meals', () => {
    const title = 'Meals';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'chicken');

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro por ingrediente na pagina de Meals', () => {
    const title = 'Meals';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'chicken');

    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    userEvent.click(ingredientRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro pela primeira letra (com somente uma letra) na pagina de Meals', () => {
    const title = 'Meals';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'c');

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
  });
  it('Verifica filtro pela primeira letra (com mais de uma letra) na pagina de Meals', () => {
    const title = 'Meals';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals title={ title } />
      </RecipesContext.Provider>,
    );
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'ch');

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    window.alert.mockClear();
  });
});

describe('Testa redirecionamento', () => {
  window.alert = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  const INITIAL_STATE = {
    title: 'Drinks',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };
  it.skip('Verifica redirecionamento para pagina meals details quando retornar somente um resultado', () => {
    const title = 'Meals';
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals title={ title } />
      </RecipesContext.Provider>,
    );
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
    const btnSearch = screen.getByTestId(searchBtnId);
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId(searchInputId);
    userEvent.type(inputSearch, 'Katsu Chicken curry');

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(2);
    console.log(pathname);
  });
});
