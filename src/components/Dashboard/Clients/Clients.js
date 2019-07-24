import React from 'react';
import { Link } from 'react-router-dom';
import {
  withStyles,
  createMuiTheme,
  Button
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { fetchClients } from '../../../store/actions/clients';
import { connect } from 'react-redux';

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
    const count = 3;
    const page = 0;
    const columns = ['ID', 'Company Name', 'Abbreviation'];

    let data = [['Loading Data...']];

    if (clients) {
      data = clients.map(row => [row.id, row.companyName, row.abbreviation]);
    }

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      //serverSide: true,
      count: count,
      page: page,
      print: false
    };

    return (
      <>
        <div>
          <Link to="/clients/new">
            <Button variant="contained" color="primary" className={classes.button}>Add Client</Button>
          </Link>
        </div>
        <MUIDataTable
          title={'Clients List'}
          data={data}
          columns={columns}
          options={options}
        />
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