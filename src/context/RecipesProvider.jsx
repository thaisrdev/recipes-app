import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [title, setTitle] = useState('');
  const INITIAL_LIST = title === 'Drinks' ? { drinks: [] } : { meals: [] };
  const [listRecipe, setListRecipe] = useState(INITIAL_LIST);

  const updateList = (list) => setListRecipe(list);

  const handleTitle = (titleParam) => setTitle(titleParam);

  const value = useMemo(() => ({
    title,
    setTitle,
    handleTitle,
    listRecipe,
    setListRecipe,
    updateList,
  }), [listRecipe, title]);

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
