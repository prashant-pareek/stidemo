import React from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

export const mainListItems = (
  <div>
    <Link to="/" style={{textDecoration: 'none'}}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
    </Link>
  </div>
);