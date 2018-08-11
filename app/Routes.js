/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TablesPage from './containers/TablesPage';
import TablePage from './containers/TablePage';

export default () => (
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.TABLES} component={TablesPage} />
      <Route exact path={routes.TABLE} component={TablePage} />
    </Switch>
);
