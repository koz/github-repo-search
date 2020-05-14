import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Router = () => (
  <Switch>
    <Route path="/:repo">Details</Route>
    <Route path="/">Github Explore</Route>
  </Switch>
);

export default Router;
