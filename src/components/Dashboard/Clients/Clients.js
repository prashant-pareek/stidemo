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
  dataTable = {}
  async componentDidMount() {
    await this.props.onFetchClients();
  }

  handleDownloadExcel = () => {
    const dataTable = this.dataTable;
    const data = [];
    const columns = [];
    const filterableColumnIndexs = [];
    if (dataTable.columns && dataTable.columns.length && dataTable.displayData && dataTable.displayData.length) {
      for (let i = 0; i < dataTable.columns.length; i++) {
        const element = dataTable.columns[i];
        columns.push(element.label);
        if (element.filter) {
          filterableColumnIndexs.push(i)
        }
      }
      for (let i = 0; i < dataTable.displayData.length; i++) {
        if (dataTable.displayData[i] && dataTable.displayData[i].data) {
          const element = dataTable.displayData[i].data;
          const item = {};
          for (let j = 0; j < filterableColumnIndexs.length; j++) {
            item[columns[filterableColumnIndexs[j]]] = element[filterableColumnIndexs[j]];
          }
          data.push(item)
        }
      }
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
      onTableChange: (action, tableState) => {this.dataTable = tableState},
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