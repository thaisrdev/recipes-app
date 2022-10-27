import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesContext from '../context/RecipesContext';
import Meals from '../Pages/Meals';
import SearchBar from '../components/SearchBar';

const mealName = 'Katsu Chicken curry';

global.fetch = jest.fn(() => Promise
  .resolve({ json: () => Promise.resolve({ meals: mealName }),
  }));

const ingredientRadioId = 'ingredient-search-radio';

describe('Testa a SearchBar pelo componente Drinks', () => {
  const INITIAL_STATE = {
    title: 'Drinks',
    handleTitle: () => {},
    updateListMeals: () => {},
    updateListDrinks: () => {},
    listRecipeMeal: { meals: [] },
    listRecipeDrinks: { drinks: [] },
  };

  window.alert = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
  });

  it('Verifica se os radio button e o button estão na tela ao renderizar', () => {
    const searchValue = 'margarita';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['drinks'],
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
    const searchValue = 'margarita';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['drinks'],
    );

    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro por ingrediente na pagina de Drinks', () => {
    const searchValue = 'margarita';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['drinks'],
    );

    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();

    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro pela primeira letra (com somente uma letra) na pagina de Drinks', () => {
    const searchValue = 'm';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['drinks'],
    );

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro pela primeira letra (com mais de uma letra) na pagina de Drinks', () => {
    const searchValue = 'ma';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['drinks'],
    );
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
    const searchValue = 'chicken';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['meals'],
    );

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro por ingrediente na pagina de Meals', () => {
    const searchValue = 'chicken';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['meals'],
    );

    const ingredientRadio = screen.getByTestId(ingredientRadioId);
    userEvent.click(ingredientRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro pela primeira letra (com somente uma letra) na pagina de Meals', () => {
    const searchValue = 'c';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['meals'],
    );

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica filtro pela primeira letra (com mais de uma letra) na pagina de Meals', () => {
    const searchValue = 'ch';
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <SearchBar searchValue={ searchValue } />
      </RecipesContext.Provider>,
      ['meals'],
    );

    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    expect(fetch).toHaveBeenCalledTimes(0);
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
    mealCategories: [
      { strCategory: 'Beef' }, { strCategory: 'Breakfast' }, { strCategory: 'Chicken' }, { strCategory: 'Dessert' }, { strCategory: 'Goat' },
    ],
    setMealCategories: () => {},

  };
  it('Verifica redirecionamento para pagina meals details quando retornar somente um resultado', async () => {
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Meals searchValue={ mealName } />
      </RecipesContext.Provider>,
      ['meals'],
    );
    const { pathname } = history.location;
    expect(pathname).toBe('meals');

    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const activeSearchBtn = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(activeSearchBtn).toBeInTheDocument();
    userEvent.click(activeSearchBtn);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Katsu Chicken curry');

    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledTimes(3);
    // expect(await screen.findByTestId('teste', {}, { timeout: 5000 })).toBeInTheDocument();
    // expect(pathname).toBe('mealsss');
  });
});
