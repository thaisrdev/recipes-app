import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('verificar componente Footer', () => {
  it('verifica se os botões estão na tela', () => {
    render(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(mealsBtn).toBeInTheDocument();
  });

  it('verifica se o botão drinks redireciona para a página drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  it('verifica se o botão meals redireciona para a página meals', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
