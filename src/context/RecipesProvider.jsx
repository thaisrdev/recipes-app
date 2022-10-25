import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [title, setTitle] = useState('');

  const handleTitle = (titleParam) => setTitle(titleParam);

  const value = useMemo(() => ({
    title,
    setTitle,
    handleTitle,
  }), [title]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
