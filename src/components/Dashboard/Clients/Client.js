import React from 'react';
import {
  withStyles,
  createMuiTheme,
  Tab,
  Tabs
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Title from '../Title';
import Input from '../../UI/Input';

const theme = createMuiTheme();

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabContainer: {
    marginTop: theme.spacing(2)
  }
};

class Client extends React.Component {
  state = {
    value: 'details',
    controls: {
      details: {
        name: {
          id: 'name',
          name: 'name',
          label: 'Name',
          value: '',
          placeholder: 'Enter company name'
        },
        abbrev: {
          id: 'abbrev',
          name: 'abbrev',
          label: 'Abbreviation',
          value: '',
          placeholder: 'Enter company short name'
        },
        address1: {
          id: 'address1',
          name: 'address1',
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1'
        },
        address2: {
          id: 'address2',
          name: 'address2',
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          id: 'address3',
          name: 'address3',
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          id: 'city',
          name: 'city',
          label: 'City',
          value: '',
          placeholder: 'Enter city name'
        },
        state: {
          id: 'state',
          name: 'state',
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state'
        },
        country: {
          id: 'country',
          name: 'country',
          label: 'Country',
          value: '',
          placeholder: 'Enter country name'
        },
        postal_code: {
          id: 'postal_code',
          name: 'postal_code',
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code'
        }
      },
      contact: {
        firstname: {
          id: 'firstname',
          name: 'firstname',
          label: 'First Name',
          value: '',
          placeholder: 'Enter first name'
        },
        lastname: {
          id: 'lastname',
          name: 'lastname',
          label: 'Last Name',
          value: '',
          placeholder: 'Enter last name'
        },
        address1: {
          id: 'address1',
          name: 'address1',
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1'
        },
        address2: {
          id: 'address2',
          name: 'address2',
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          id: 'address3',
          name: 'address3',
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        email: {
          id: 'email',
          name: 'email',
          label: 'Email',
          value: '',
          placeholder: 'Enter email address'
        }
      },
      contract: {
        address1: {
          id: 'address1',
          name: 'address1',
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1'
        },
        address2: {
          id: 'address2',
          name: 'address2',
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          id: 'address3',
          name: 'address3',
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          id: 'city',
          name: 'city',
          label: 'City',
          value: '',
          placeholder: 'Enter city name'
        },
        state: {
          id: 'state',
          name: 'state',
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state'
        },
        country: {
          id: 'country',
          name: 'country',
          label: 'Country',
          value: '',
          placeholder: 'Enter country name'
        },
        postal_code: {
          id: 'postal_code',
          name: 'postal_code',
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code'
        }
      },
      billing: {
        address1: {
          id: 'address1',
          name: 'address1',
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1'
        },
        address2: {
          id: 'address2',
          name: 'address2',
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          id: 'address3',
          name: 'address3',
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          id: 'city',
          name: 'city',
          label: 'City',
          value: '',
          placeholder: 'Enter city name'
        },
        state: {
          id: 'state',
          name: 'state',
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state'
        },
        country: {
          id: 'country',
          name: 'country',
          label: 'Country',
          value: '',
          placeholder: 'Enter country name'
        },
        postal_code: {
          id: 'postal_code',
          name: 'postal_code',
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code'
        }
      }
    }
  };

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  }

  updateInput = () => {
    console.log('yes');
  }

  render() {
    const { classes } = this.props;

    let fields = null;
    let tab = this.state.value;

    fields = Object.keys(this.state.controls[tab]).map(key => {
      let field = this.state.controls[tab][key];

      return <Input
        key={key}
        id={field.id}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        value={field.value}
        changeHandler={this.updateInput}
      />
    });

    let txt = null;
    
    if (this.state.value === 'billing') {
      txt = <div>**Address used to determine the appropriate sales tax rate to apply to invoices**</div>
    }

    return (
      <div className={classes.root}>
        <Title>Client</Title>
        <Tabs 
          value={this.state.value} 
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab label="Details" value="details" icon={<PhoneIcon />} />
          <Tab label="Contact" value="contact" icon={<FavoriteIcon />} />
          <Tab label="Contract Address" value="contract" icon={<PersonPinIcon />} />
          <Tab label="Billing Address" value="billing" icon={<ShoppingBasket />} />
        </Tabs>
        <div className={classes.tabContainer}>
          {txt}
          {fields}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Client);