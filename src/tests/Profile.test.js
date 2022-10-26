import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../Pages/Profile';
import RecipesContext from '../context/RecipesContext';

const mockHistoryPush = jest.fn();

// https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Cobertura de testes do profile', () => {
  const setEmail = {
    email: 'test@test.com',
  };
  const INITIAL_STATE = {
    title: 'Meals',
    handleTitle: () => {},
  };

  localStorage.setItem('user', JSON.stringify(setEmail));
  it('Testa se aparece o email dá pessoa logada', () => {
    render(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Profile />
      </RecipesContext.Provider>,
    );

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  it('Testa se o botão de logout funciona', () => {
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Profile />
      </RecipesContext.Provider>,
    );

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
  });

  it('Testa se o botão Done Recipes funciona', async () => {
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Profile />
      </RecipesContext.Provider>,
    );

    const doneBtn = screen.getByTestId('profile-done-btn');
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
  });

  it('Testa se o botão de favoritos funciona', () => {
    renderWithRouter(
      <RecipesContext.Provider value={ INITIAL_STATE }>
        <Profile />
      </RecipesContext.Provider>,
    );

    const favBtn = screen.getByTestId('profile-favorite-btn');
    expect(favBtn).toBeInTheDocument();
  });
});
