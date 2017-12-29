import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TabContainer from './components/TabContainer'
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  filter: {    
    paddingRight: 100,
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
  },
});

class BasicTabs extends React.Component {
  state = {
    value: 0,
    anchor: 'Date',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, anchor } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        <div className={classes.filter}>
          <TextField
            id="persistent-anchor"
            select
            label="Sort By"
            value={anchor}
            onChange={this.handleChangeAnchor}
            margin="normal"
          >
            <MenuItem value="Date">Date</MenuItem>
            <MenuItem value="Score">Score</MenuItem>
          </TextField>
        </div>
        {value === 0 && <TabContainer children="Item One"></TabContainer>}
        {value === 1 && <TabContainer children="Item Two"></TabContainer>}
        {value === 2 && <TabContainer children="Item Three"></TabContainer>}
      
      </div>
    );
  }
}

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabs);