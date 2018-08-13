import React, { Fragment } from 'react';
import merge from 'lodash/merge';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AcceptIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead from './TableHead';
import createField from '../Field';
import Alert from '../Alert';

import clientsSchema from '../../schemas/clients';

const ActionIcon = styled.span`
  cursor: pointer;
`;

const IconButton = styled.button`
  border: 0;
  background: none;
  outline: none;
  cursor: pointer;
  outline: none;
`;

function createData(name, addInformation) {
  const email = `${name
    .toLowerCase()
    .split(' ')
    .join('.')}@gmail.com`;
  const phoneNumber = new Date().getTime();
  return { id: name, name, email, phoneNumber, addInformation };
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => b[orderBy] - a[orderBy]
    : (a, b) => a[orderBy] - b[orderBy];
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [
        createData('Will Smith', 'Something about me'),
        createData('Kate Black', 'Oh my god'),
        createData('Jim Kerry', 'Hello world'),
        createData('Bruce Willis', 'Hop Hey'),
        createData('Tom Kruz', 'Something else'),
        createData('Pamella Anderson', 'Mr.s Anderson, hello'),
      ],
      page: 0,
      rowsPerPage: 5,
      editableItemIndex: -1,
      editableItem: null,
      deletableItemIndex: -1,
    };
  }

  handleRequestSort = (event, orderBy) => {
    const { orderBy: cOrderBy, order: cOrder } = this.state;
    const order = cOrderBy === orderBy && cOrder === 'desc' ? 'desc' : 'asc';
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  setEditableItemIndex = e => {
    const { data } = this.state;
    const editableItemIndex = parseInt(
      e.currentTarget.getAttribute('data-index'),
      10
    );
    const editableItem = merge({}, data[editableItemIndex]);
    this.setState({ editableItemIndex, editableItem });
  };

  resetEditable = () => {
    this.setState({ editableItemIndex: -1, editableItem: null });
  };

  handleClose = () => {
    this.resetEditable();
  };

  onKeyup = e => {
    if (e.key === 'Escape') {
      this.resetEditable();
    }
  };

  onDataChange = (value, key) => {
    const { editableItem: oldData } = this.state;
    this.setState({ editableItem: { ...oldData, [key]: value } });
  };

  onSubmit = e => {
    const { data: oldData, editableItem, editableItemIndex } = this.state;
    const data = oldData.map(
      (item, i) => (i === editableItemIndex ? editableItem : item)
    );
    e.preventDefault();
    this.resetEditable();
    this.setState({ data });
  };

  onDelete = e => {
    const { data: oldData } = this.state;
    const editableItemIndex = parseInt(
      e.currentTarget.getAttribute('data-index'),
      10
    );
    const data = oldData.filter((_, i) => i !== editableItemIndex);
    this.resetEditable();
    this.setState({ data });
  };

  onDeleteConfirm = e => {
    const deletableItemIndex = parseInt(
      e.currentTarget.getAttribute('data-index'),
      10
    );
    this.setState({ deletableItemIndex });
  };

  onDeleteAccept = () => {
    const { data: oldData, deletableItemIndex } = this.state;
    const data = oldData.filter((_, i) => i !== deletableItemIndex);
    this.setState({ data, deletableItemIndex: -1 });
  };

  onDeleteCancel = () => {
    this.setState({ deletableItemIndex: -1 });
  };

  render() {
    // eslint-disable-next-line
    const { classes } = this.props;
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      editableItemIndex,
      editableItem,
      deletableItemIndex,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const fields = Object.keys(clientsSchema);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <form onSubmit={this.onSubmit}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n, i) => (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      {fields.map((key, fieldIdx) => (
                        <TableCell key={key}>
                          {editableItemIndex === i
                            ? createField({
                                schema: clientsSchema,
                                autoFocus: fieldIdx === 0,
                                key,
                                data: editableItem[key],
                                onKeyUp: this.onKeyup,
                                onChange: e =>
                                  this.onDataChange(e.target.value, key),
                              })
                            : n[key]}
                        </TableCell>
                      ))}
                      <TableCell>
                        {editableItemIndex === i ? (
                          <Fragment>
                            <IconButton type="submit">
                              <AcceptIcon />
                            </IconButton>
                            <ActionIcon onClick={this.resetEditable}>
                              <CancelIcon />
                            </ActionIcon>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <ActionIcon
                              title="Edit"
                              data-index={i}
                              onClick={this.setEditableItemIndex}
                            >
                              <EditIcon />
                            </ActionIcon>
                            <ActionIcon
                              title="Delete"
                              data-index={i}
                              onClick={this.onDeleteConfirm}
                            >
                              <DeleteIcon />
                            </ActionIcon>
                          </Fragment>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </form>
        </div>
        <Alert
          open={deletableItemIndex !== -1}
          onAccept={this.onDeleteAccept}
          onClose={this.onDeleteCancel}
          content="Are you sure, you want to remove this item?"
        />
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);
