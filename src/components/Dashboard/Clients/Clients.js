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
import axios from 'axios';
import Title from '../Title';

const theme = createMuiTheme();

const styles = {
  button: {
    margin: theme.spacing(1)
  }
};

class Clients extends React.Component {
  state = {
    rows: null
  };

  async componentDidMount() {
    try {
      const response = await axios.get('http://172.16.6.250:8080/companys');
      
      if (response.data) {
        this.setState({
          rows: response.data
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { classes } = this.props;
    let tbl = null;

    if (this.state.rows) {
      tbl = (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Abbreviation</TableCell>
              <TableCell align="right">Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.abbreviation}</TableCell>
                <TableCell align="right">{row.companyName}</TableCell>
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

export default withStyles(styles)(Clients);