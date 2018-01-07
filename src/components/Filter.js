import React from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

const anchor = 'Date'
const styles = theme => ({
  filter: {
    paddingRight: 100,
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
  },
});

const Filter = ({ classes }) => (
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
)

export default withStyles(styles)(Filter)