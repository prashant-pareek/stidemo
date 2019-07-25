import React from 'react';
import { Link } from 'react-router-dom';
import {
  withStyles,
  createMuiTheme,
  Button,
  Tooltip,
  IconButton,
  Icon
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import XLSX from 'xlsx';
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
  dataTable = {
    filterList: [],
    searchText: "",
  }
  async componentDidMount() {
    await this.props.onFetchClients();
  }
  checkFilterListIsEmpty = () => {
    for (let i = 0; i < this.dataTable.filterList.length; i++) {
      if (this.dataTable.filterList[i] && this.dataTable.filterList[i].length > 0) {
        return false;
      }
    } 
    return true
  }
  handleDownloadExcel = () => {
    let data = this.props.clients;

    if (!this.checkFilterListIsEmpty() || this.dataTable.searchText) {
      data = data.filter((item) => {
        const itemKeys = Object.keys(item);
        let filter = false, textSearch = false;
        for (let i = 0; i < itemKeys.length; i++) {
          if (this.dataTable.filterList[i] && item[itemKeys[i]] && this.dataTable.filterList[i].indexOf(item[itemKeys[i]]) > -1) {
            filter = true;
          };
          if (this.dataTable.searchText && item[itemKeys[i]] && item[itemKeys[i]].toLowerCase().indexOf(this.dataTable.searchText) > -1) {
            textSearch = true
          }
        }
        filter = (this.checkFilterListIsEmpty() || (!this.checkFilterListIsEmpty() && filter))
        textSearch = (!this.dataTable.searchText || (this.dataTable.searchText && textSearch))
        return (filter && textSearch);
      })
    }
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, "company_list.xlsx");
  }

  render() {
    const { clients, classes } = this.props;
    let data = [['Loading Data...']];
    let count = 0;
    const page = 0;
    const columns = [
      {
        name: "ID",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Company Name",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Abbreviation",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false
        }
      }
    ];

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
      customToolbar: () => {
        return (
          <Tooltip title={"Download Excel"}>
            <IconButton onClick={this.handleDownloadExcel}>
              <Icon>cloud_download</Icon>
            </IconButton>
          </Tooltip>
        );
      },
      filter: true,
      download: false,
      onFilterChange: (changedColumn, filterList) => {this.dataTable.filterList = filterList},
      onSearchChange: (searchText) => {this.dataTable.searchText = searchText},
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