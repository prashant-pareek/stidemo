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
  btnBar: {
    marginBottom: 14
  },
  button: {
    marginRight: theme.spacing(1)
  },
  link: {
    textDecoration: 'none'
  }
};

class Clients extends React.Component {
  async componentDidMount() {
    await this.props.onFetchClients();
  }

  render() {
    const { clients, classes } = this.props;
    let data = [['Loading Data...']];
    let count = 0;
    const page = 0;
    const columns = ['ID', 'Company Name', 'Abbreviation', 'Action'];

    if (clients) {
      data = clients.map(row => [
        row.id, 
        row.companyName,
        row.abbreviation,
        <Link to={'/clients/'+ row.id} className={classes.link}>
          <Button variant="outlined" size="small">Edit</Button>
        </Link>
      ]);

      count = data.length;
    }

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      //serverSide: true,
      count: count,
      page: page,
      print: false,
      rowsPerPage: 3,
      rowsPerPageOptions: [3,5,10,15]
    };

    return (
      <>
        <div className={classes.btnBar}>
          <Link to="/clients/new" className={classes.link}>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button}>Add Client</Button>
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