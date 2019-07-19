import React from 'react';
import {
  withStyles,
  createMuiTheme,
  Tab,
  Tabs,
  Button
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { fetchClient, saveClient } from '../../../store/actions/clients';
import { connect } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';
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
  },
  button: {
    marginTop: theme.spacing(2)
  }
};

class Client extends React.Component {
  state = {
    value: 'details',
    id: 0,
    controls: {
      details: {
        name: {
          label: 'Name',
          value: '',
          placeholder: 'Enter company name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        abbrev: {
          label: 'Abbreviation',
          value: '',
          placeholder: 'Enter company short name',
          validationRules: 'required|alpha|min:2|max:20'
        },
        address1: {
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1',
          validationRules: 'required|alpha'
        },
        address2: {
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          label: 'City',
          value: '',
          placeholder: 'Enter city name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        state: {
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state',
          validationRules: 'required|alpha|min:2|max:100'
        },
        country: {
          label: 'Country',
          value: '',
          placeholder: 'Enter country name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        postal_code: {
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code',
          validationRules: 'required|numeric|min:4|max:20'
        }
      },
      contact: {
        firstname: {
          label: 'First Name',
          value: '',
          placeholder: 'Enter first name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        lastname: {
          label: 'Last Name',
          value: '',
          placeholder: 'Enter last name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        address1: {
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1',
          validationRules: 'required|alpha'
        },
        address2: {
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        email: {
          label: 'Email',
          value: '',
          placeholder: 'Enter email address',
          validationRules: 'required|email'
        }
      },
      contract: {
        address1: {
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1',
          validationRules: 'required|alpha'
        },
        address2: {
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          label: 'City',
          value: '',
          placeholder: 'Enter city name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        state: {
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state',
          validationRules: 'required|alpha|min:2|max:100'
        },
        country: {
          label: 'Country',
          value: '',
          placeholder: 'Enter country name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        postal_code: {
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code',
          validationRules: 'required|numeric|min:4|max:20'
        }
      },
      billing: {
        address1: {
          label: 'Address 1',
          value: '',
          placeholder: 'Enter address 1',
          validationRules: 'required|alpha'
        },
        address2: {
          label: 'Address 2',
          value: '',
          placeholder: 'Enter address 2'
        },
        address3: {
          label: 'Address 3',
          value: '',
          placeholder: 'Enter address 3'
        },
        city: {
          label: 'City',
          value: '',
          placeholder: 'Enter city name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        state: {
          label: 'Province/State',
          value: '',
          placeholder: 'Enter province/state',
          validationRules: 'required|alpha|min:2|max:100'
        },
        country: {
          label: 'Country',
          value: '',
          placeholder: 'Enter country name',
          validationRules: 'required|alpha|min:2|max:100'
        },
        postal_code: {
          label: 'Postal/Zip code',
          value: '',
          placeholder: 'Enter postal/zip code',
          validationRules: 'required|numeric|min:4|max:20'
        }
      }
    }
  };

  validator = new SimpleReactValidator();

  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.props.onFetchClient(this.props.match.params.id);
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    });
  }

  updateInput = (event, tab, key) => {
    const value = event.target.value;
    
    this.setState(state => {
      return {
        controls: {
          ...state.controls,
          [tab]: {
            ...state.controls[tab],
            [key]: {
              ...state.controls[tab][key],
              value: value
            }
          }
        }
      }
    });
  }

  submitFormHandler = async () => {
    const data = {
      id: this.state.id,
      companyName: this.state.controls.details.name.value,
      abbreviation: this.state.controls.details.abbrev.value,
      details: {
        address1: this.state.controls.details.address1.value,
        address2: this.state.controls.details.address2.value,
        address3: this.state.controls.details.address3.value,
        city: this.state.controls.details.city.value,
        state: this.state.controls.details.state.value,
        country: this.state.controls.details.country.value,
        zip: this.state.controls.details.postal_code.value
      },
      billingAddress: {
        address1: this.state.controls.billing.address1.value,
        address2: this.state.controls.billing.address2.value,
        address3: this.state.controls.billing.address3.value,
        city: this.state.controls.billing.city.value,
        state: this.state.controls.billing.state.value,
        country: this.state.controls.billing.country.value,
        zip: this.state.controls.billing.postal_code.value
      },
      contractAddress: {
        address1: this.state.controls.contract.address1.value,
        address2: this.state.controls.contract.address2.value,
        address3: this.state.controls.contract.address3.value,
        city: this.state.controls.contract.city.value,
        state: this.state.controls.contract.state.value,
        country: this.state.controls.contract.country.value,
        zip: this.state.controls.contract.postal_code.value,
      },
      companyContact: {
        firstName: this.state.controls.contact.firstname.value,
        lastName: this.state.controls.contact.lastname.value,
        emailId: this.state.controls.contact.email.value,
        contactAddress: {
          address1: this.state.controls.contact.address1.value,
          address2: this.state.controls.contact.address2.value,
          address3: this.state.controls.contact.address3.value
        }
      }
    };
    
    if (this.validator.allValid()) {
      this.setState({isError: false});

      await this.props.onSaveClient(data);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params) {
      if (
        (props.match.params.id !== undefined) &&  
        (props.client) && 
        (state.id !== props.client.id)
      ) {
        return {
          ...state,
          id: props.client.id,
          controls: {
            ...state.controls,
            details: {
              name: {
                ...state.controls.details.name,
                value: props.client.companyName || ''
              },
              abbrev: {
                ...state.controls.details.abbrev,
                value: props.client.abbreviation || ''
              },
              address1: {
                ...state.controls.details.address1,
                value: props.client.details.address1 || ''
              },
              address2: {
                ...state.controls.details.address2,
                value: props.client.details.address2 || ''
              },
              address3: {
                ...state.controls.details.address3,
                value: props.client.details.address3 || ''
              },
              city: {
                ...state.controls.details.city,
                value: props.client.details.city || ''
              },
              state: {
                ...state.controls.details.state,
                value: props.client.details.state || ''
              },
              country: {
                ...state.controls.details.country,
                value: props.client.details.country || ''
              },
              postal_code: {
                ...state.controls.details.postal_code,
                value: props.client.details.zip || ''
              }
            },
            contact: {
              firstname: {
                ...state.controls.contact.firstname,
                value: props.client.companyContact.firstName || ''
              },
              lastname: {
                ...state.controls.contact.lastname,
                value: props.client.companyContact.lastName || ''
              },
              address1: {
                ...state.controls.contact.address1,
                value: props.client.companyContact.contactAddress.address1 || ''
              },
              address2: {
                ...state.controls.contact.address2,
                value: props.client.companyContact.contactAddress.address2 || ''
              },
              address3: {
                ...state.controls.contact.address3,
                value: props.client.companyContact.contactAddress.address3 || ''
              },
              email: {
                ...state.controls.contact.email,
                value: props.client.companyContact.emailId || ''
              }
            },
            contract: {
              address1: {
                ...state.controls.contract.address1,
                value: props.client.contractAddress.address1 || ''
              },
              address2: {
                ...state.controls.contract.address2,
                value: props.client.contractAddress.address2 || ''
              },
              address3: {
                ...state.controls.contract.address3,
                value: props.client.contractAddress.address3 || ''
              },
              city: {
                ...state.controls.contract.city,
                value: props.client.contractAddress.city || ''
              },
              state: {
                ...state.controls.contract.state,
                value: props.client.contractAddress.state || ''
              },
              country: {
                ...state.controls.contract.country,
                value: props.client.contractAddress.country || ''
              },
              postal_code: {
                ...state.controls.contract.postal_code,
                value: props.client.contractAddress.zip || ''
              }
            },
            billing: {
              address1: {
                ...state.controls.billing.address1,
                value: props.client.billingAddress.address1 || ''
              },
              address2: {
                ...state.controls.billing.address2,
                value: props.client.billingAddress.address2 || ''
              },
              address3: {
                ...state.controls.billing.address3,
                value: props.client.billingAddress.address3 || ''
              },
              city: {
                ...state.controls.billing.city,
                value: props.client.billingAddress.city || ''
              },
              state: {
                ...state.controls.billing.state,
                value: props.client.billingAddress.state || ''
              },
              country: {
                ...state.controls.billing.country,
                value: props.client.billingAddress.country || ''
              },
              postal_code: {
                ...state.controls.billing.postal_code,
                value: props.client.billingAddress.zip || ''
              }
            }
          }
        }
      }
    }

    return state;
  }

  render() {
    const { classes } = this.props;

    let fields = null;
    let tab = this.state.value;

    fields = Object.keys(this.state.controls[tab]).map(key => {
      let field = this.state.controls[tab][key];
      return (<Input
        key={key}
        label={field.label}
        placeholder={field.placeholder}
        value={field.value}
        changeHandler={(event) => this.updateInput(event, tab, key)}
        fieldName={field.label}
        validator={this.validator}
        validationRules={field.validationRules || false }

      />)
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
          <Tab label="Contact" value="contact" icon={<BookmarkIcon />} />
          <Tab label="Contract Address" value="contract" icon={<PersonPinIcon />} />
          <Tab label="Billing Address" value="billing" icon={<ShoppingBasket />} />
        </Tabs>
        <div className={classes.tabContainer}>
          {txt}
          {fields}
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.submitFormHandler}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    success: state.clients.clientSuccess,
    client: state.clients.client,
    error: state.clients.clientError,
    saveSuccess: state.clients.saveSuccess,
    saveError: state.clients.saveError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchClient: id => dispatch(fetchClient(id)),
    onSaveClient: data => dispatch(saveClient(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Client));