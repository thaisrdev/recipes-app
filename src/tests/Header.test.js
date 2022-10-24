import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import Header from '../components/Header';
import Meals from '../Pages/Meals';

describe('verificar componente Header', () => {
  it('Verifica se os botões e o input estão na tela ao renderizar a pages Meals', () => {
    render(<Meals />);

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const btnProfile = screen.getByTestId('profile-btn');
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByTestId('search-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
  it('Verifica se o botão profile redireciona para a url /profile', () => {
    const { history } = renderWithRouter(<Header />);
    const btnProfile = screen.getByTestId('profile-btn');
    expect(btnProfile).toBeInTheDocument();
    userEvent.click(btnProfile);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
