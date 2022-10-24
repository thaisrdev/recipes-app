import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import Login from '../Pages/Login';

describe('verificar componente Login', () => {
  const email = 'email-input';
  const password = 'password-input';
  const submitButton = 'login-submit-btn';

  it('verifica se os inputs e o botão está na tela', () => {
    render(<Login />);
    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(password)).toBeInTheDocument();
    expect(screen.getByTestId(submitButton)).toBeInTheDocument();
  });

  it('verifica se o botão é ativado apenas quando os inputs estão corretos', () => {
    render(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId(submitButton);

    userEvent.type(emailInput, 'emailErrado');
    userEvent.type(passwordInput, '123');
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toHaveProperty('disabled', false);
  });

  it('verifica se o botão redireciona para a página /meals', () => {
    const { history } = renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId(submitButton);

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
