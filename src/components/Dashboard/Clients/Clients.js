import React from 'react';
import { Link } from 'react-router-dom';
import {
  withStyles,
  createMuiTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import { fetchClients } from '../../../store/actions/clients';
import { connect } from 'react-redux';
import Title from '../Title';

const theme = createMuiTheme();

const styles = {
  button: {
    margin: theme.spacing(1)
  }
};

class Clients extends React.Component {
  async componentDidMount() {
    await this.props.onFetchClients();
  }

  render() {
    const { clients, classes } = this.props;
    let tbl = null;

    if (clients) {
      tbl = (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Abbreviation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell><Link to={'/clients/'+ row.id}>{row.companyName}</Link></TableCell>
                <TableCell align="right">{row.abbreviation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return (
      <>
        <Title>Clients</Title>
        <div>
          <Link to="/clients/new">
            <Button variant="contained" color="primary" className={classes.button}>Add Client</Button>
          </Link>
        </div>
        {tbl}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    success: state.clients.clientsSuccess,
    clients: state.clients.clients,
    error: state.clients.clientsError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchClients: () => dispatch(fetchClients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clients));