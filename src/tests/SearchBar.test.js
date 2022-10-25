import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../Pages/Meals';

describe('1 - Elementos da  Barra de Busca', () => {
  test('1.1 - Data-testid da barra de busca e dos radio buttons', () => {
    // Renderização :
    renderWithRouter(<Meals />);

    // Montagem:

    const btnSearch = screen.getByTestId(/search-top-btn/i);

    // Teste:

    expect(btnSearch).toBeInTheDocument();

    fireEvent.click(btnSearch);

    expect(screen.getByTestId(/ingredient-search-radio/i)).toBeInTheDocument();

    expect(screen.getByTestId(/name-search-radio/i)).toBeInTheDocument();

    expect(screen.getByTestId(/first-letter-search-radio/i)).toBeInTheDocument();

    expect(screen.getByTestId(/exec-search-btn/i)).toBeInTheDocument();
  });
});

describe('2 - Posição da  Barra de Busca e Posição dos Radio Buttons', () => {
  test('2.1 - Se for selecionado Ingridient, a API reponde corretamente', () => {
    // Renderização :
    renderWithRouter(<Meals />);

    // Montagem 1:

    const btnSearch = screen.queryByTestId(/search-top-btn/i);

    // Teste 1:

    expect(btnSearch).toBeInTheDocument();

    fireEvent.click(btnSearch);

    // Montagem 2:

    const searchIngridient = screen.queryByTestId(/ingredient-search-radio/i);

    // Teste 2:

    expect(searchIngridient).toBeInTheDocument();

    fireEvent.click(searchIngridient);

    // Montagem 3 :

    const searchInput = screen.queryByTestId(/search-input/i);

    // Teste 3 :

    expect(searchInput).toBeInTheDocument();

    fireEvent.click(searchInput, { target: { value: 'chiken' } });

    // Montagem 4:

    const execSrcBtn = screen.queryByTestId(/exec-search-btn/i);

    // Teste 4 :

    expect(execSrcBtn).toBeInTheDocument();
  });

  test('2.2 - Se for selecionado first-letter, a API reponde corretamente', async () => {
    // Renderização :
    renderWithRouter(<Meals />);

    // Montagem 1:

    const btnSearch = screen.queryByTestId(/search-top-btn/i);

    // Teste 1:

    expect(btnSearch).toBeInTheDocument();

    fireEvent.click(btnSearch);

    // Montagem 2:

    const firstLetter = screen.queryByTestId(/first-letter-search-radio/i);

    // Teste 2:

    expect(firstLetter).toBeInTheDocument();

    fireEvent.click(firstLetter);

    // Montagem 3 :

    const searchInput = screen.queryByTestId(/search-input/i);

    // Teste 3 :

    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'a' } });

    // Montagem 4:

    const execSrcBtn = screen.queryByTestId(/exec-search-btn/i);

    // Teste 4 :

    expect(execSrcBtn).toBeInTheDocument();
  });
});
