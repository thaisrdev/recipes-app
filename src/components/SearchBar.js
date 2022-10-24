import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient-searc">
        <input
          id="ingredient-search"
          type="radio"
          // value=""
          // name=""
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>

      <label htmlFor="ingredient-searc">
        <input
          id="ingredient-search"
          type="radio"
          // value=""
          // name=""
          data-testid="name-search-radio"
        />
        Name
      </label>

      <label htmlFor="ingredient-searc">
        <input
          id="ingredient-search"
          type="radio"
          // value=""
          // name=""
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
