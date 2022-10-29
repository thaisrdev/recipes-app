import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import NotFound from './Pages/NotFound';
import RecipeInProgress from './components/RecipeInProgress';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <main>
      <RecipesProvider>
        <Switch>
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/profile" component={ Profile } />

          <Route
            path="/drinks/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/drinks" component={ Drinks } />

          <Route
            exact
            path="/meals/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/meals" component={ Meals } />

          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </RecipesProvider>
    </main>
  );
}

export default App;
