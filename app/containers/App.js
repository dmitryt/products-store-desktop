// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import styled from 'styled-components';

import Routes from '../Routes';

const Root = styled.div`
  padding: 20px;
`;

type Props = {
  store: {},
  history: {},
};

export default class App extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Root>
            <Routes />
          </Root>
        </ConnectedRouter>
      </Provider>
    );
  }
}
