import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

describe('verificar componente Header', () => {
  const INITIAL_STATE = {
    title: 'Meals',
    handleTitle: () => {},
  };
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Meals', () => {
    const title = 'Drinks';
    render(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Header title={ title } />
      </RecipesContext.Provider>,
    );

    const titleTest = screen.getByTestId('page-title');
    expect(titleTest).toBeInTheDocument();

    const btnProfile = screen.getByTestId('profile-btn');
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'chicken');
  });
  it('Verifica se o botão profile redireciona para a url /profile', () => {
    // const { history } = renderWithRouter(<Header />);
    const title = 'Meals';
    const { history } = renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Header title={ title } />
      </RecipesContext.Provider>,
    );
    const btnProfile = screen.getByTestId('profile-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
