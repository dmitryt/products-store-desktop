// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StorageIcon from '@material-ui/icons/Storage';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledPaper = styled(Paper)`
  color: #333333;
  background: white;
  text-align: center;
  height: 120px;
  padding: 10px;
  width: 150px;
`;

const IconWrapper = styled.div`
  font-size: 64px;
`;

type ITable = {|
  name: string,
  label: string,
|};

const tables: ITable[] = [
  { name: 'clients', label: 'Clients' },
  { name: 'products', label: 'Products' },
  { name: 'orders', label: 'Orders' },
];

type Props = {};

export default class Home extends Component<Props> {
  render() {
    return (
      <Container data-tid="container">
        {tables.map(({ name, label }) => (
          <Link to={`/tables/${name}`} key={name}>
            <StyledPaper elevation={1}>
              <IconWrapper>
                <StorageIcon fontSize="inherit" />
              </IconWrapper>
              <Typography variant="headline" component="h3">
                {label}
              </Typography>
            </StyledPaper>
          </Link>
        ))}
      </Container>
    );
  }
}
