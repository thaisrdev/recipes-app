export async function getMealsByIngredient(ingredient) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.meals === null) {
      return { meals: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getMealsByName(name) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.meals === null) {
      return { meals: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getMealsByFirstLetter(firstLetter) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.meals === null) {
      return { meals: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getDrinksByIngredient(ingredient) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.drinks === null) {
      return { drinks: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    console.log('erro');
    return { drinks: [] };
  }
}

export async function getDrinksByName(name) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.drinks === null) {
      return { drinks: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    return { drinks: [] };
  }
}

export async function getDrinksByFirstLetter(firstLetter) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.drinks === null) {
      return { drinks: [] };
    }
    return result;
  } catch (err) {
    console.log(err);
    return { drinks: [] };
  }
}

export async function getAllMeals() {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getAllDrinks() {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { drinks: [] };
  }
}

export async function getMealCategories() {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getDrinkCategories() {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function getDrinkById(id) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { drinks: [] };
  }
}

export async function getMealById(id) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}

export async function filterDrinkCategories(category) {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${url}${category}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { drinks: [] };
  }
}

export async function filterMealCategories(category) {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${url}${category}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return { meals: [] };
  }
}
