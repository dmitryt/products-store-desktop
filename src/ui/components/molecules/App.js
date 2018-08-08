
import React from 'react';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { AuthPage, TablePage, TablesListPage } from '../pages';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={AuthPage} />
      <Route exact path="/tables" component={TablesListPage} />
      <Route path="/tables/:tableName" component={TablePage} />
      <Route component={AuthPage} />
    </Switch>
  </Router>
);

export default App;
