import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './Pages/Login';

function App() {
  return (
    <main>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            {/* <Route path="*" component={ NotFound } /> */}
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </main>
  );
}

export default App;
