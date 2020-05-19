import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

const Router = () => (
  <Switch>
    <Route path="/:owner/:repo">
      <Details />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Router;
