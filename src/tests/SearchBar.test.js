import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesContext from '../context/RecipesContext';
import App from '../App';
import SearchBar from '../components/SearchBar';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

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

describe('Testa redirecionamento Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise
      .resolve({ json: () => Promise.resolve({ drinks: [drinks.drinks[0]] }),
      }));
  });

  it('Verifica redirecionamento para pagina Drinks details quando retornar somente um resultado', async () => {
    renderWithRouter(<App />, ['/drinks']);
    const nameRadio = screen.getByLabelText('Name');
    userEvent.click(nameRadio);
    const activeSearchBtn = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(activeSearchBtn).toBeInTheDocument();
    userEvent.click(activeSearchBtn);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Katsu Chicken curry');
    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    const chicken = await screen.findByRole('heading', { name: /recipe details/i });
    await waitFor(() => expect(chicken).toBeInTheDocument());
  });
});

describe('Testa redirecionamento Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise
      .resolve({ json: () => Promise.resolve({ meals: [meals.meals[0]] }),
      }));
  });

  it('Verifica redirecionamento para pagina Meals details quando retornar somente um resultado', async () => {
    renderWithRouter(<App />, ['/meals']);
    const nameRadio = screen.getByLabelText('Name');
    userEvent.click(nameRadio);
    const activeSearchBtn = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(activeSearchBtn).toBeInTheDocument();
    userEvent.click(activeSearchBtn);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'Adam Sunrise');
    const searchBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBtn);
    const chicken = await screen.findByRole('heading', { name: /recipe details/i });
    await waitFor(() => expect(chicken).toBeInTheDocument());
  });
});
