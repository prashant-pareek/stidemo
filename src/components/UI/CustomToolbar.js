import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    console.log('================this.props====================');
    console.log(this.props);
    console.log('====================================');
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"Download Excel"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <Icon>cloud_download</Icon>
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);
