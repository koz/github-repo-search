import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:repo">Details</Route>
      <Route path="/">Github Explore</Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
