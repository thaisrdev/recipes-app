export async function getMealsByIngredient(ingredient) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getMealsByName(name) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getMealsByFirstLetter(firstLetter) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getDrinksByIngredient(ingredient) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getDrinksByName(name) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getDrinksByFirstLetter(firstLetter) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
