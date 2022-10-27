import React from 'react';
import { render } from '@testing-library/react';
import RecipesProvider from '../../context/RecipesProvider';

export default function renderWithContext(children) {
  return (
    render(
      <RecipesProvider>
        { children }
      </RecipesProvider>,
    )
  );
}
