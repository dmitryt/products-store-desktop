// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

type Props = {};

export default class DataForm extends Component<Props> {
  props: Props;

  render() {
    return (
      <div data-tid="container">
        <h2>Home</h2>
        <Link to={routes.HOME}>Home</Link>
        <Link to={routes.TABLES}>to Tables</Link>
      </div>
    );
  }
}
