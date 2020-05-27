import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Details from './pages/Details';
import Home from './pages/Home';

const Router = () => (
  <>
    <Header data-testid="header" />
    <Switch>
      <Route path="/:owner/:repo">
        <Details />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </>
);

export default Router;
