import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const Router = () => (
  <Switch>
    <Route path="/:repo">Details</Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export default Router;
