import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import MealsReceita from './Pages/MealsReceita';
import DrinksReceita from './Pages/DrinksReceita';
import MealsInProgress from './Pages/MealsInProgress';
import DrinksInProgress from './Pages/DrinksInProgress';

import DoneRecipes from './Pages/DoneRecipes';
import Favourites from './Pages/Favourites';

function App() {
  return (
    <main>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/meals/:id-da-receita" component={ MealsReceita } />
            <Route exact path="/drinks/:id-da-receita" component={ DrinksReceita } />
            <Route
              exact
              path="/meals/:id-da-receita/in-progress"
              component={ MealsInProgress }
            />
            <Route
              exact
              path="/drinks/:id-da-receita/in-progress"
              component={ DrinksInProgress }
            />
            <Route path="/profile" component={ Profile } />
            <Route path="/done-recipes" component={ DoneRecipes } exact />
            <Route path="/favorite-recipes" component={ Favourites } exact />
            {/* <Route path="*" component={ NotFound } /> */}
            <Route exact path="/meals" component={ Meals } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </main>
  );
}

export default App;
