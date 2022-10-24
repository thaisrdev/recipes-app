import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [isVisible, setIsVisible] = useState(false);

  const history = useHistory();

  const routeChange = (route) => {
    const path = `${route}`;
    history.push(path);
  };

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>

      <button
        type="button"
        onClick={ () => routeChange('profile') }
        data-testid="profile-btn"
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone de Perfil" />
      </button>

      { (title === 'Meals' || title === 'Drinks')
        && (
          <button
            type="button"
            onClick={ () => setIsVisible((prevState) => !prevState) }
            data-testid="search-btn"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Icone de Pesquisa"
            />
          </button>)}
      {isVisible && (
        <input type="text" placeholder="teste" data-testid="search-input" />
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
