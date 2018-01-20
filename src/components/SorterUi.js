import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { FormLabel, FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

const SorterUi = ({ classes, onChange, sortBy }) => {
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
              <FormLabel>Sort By</FormLabel>
              <RadioGroup
                name="sortOption"
                aria-label="sortOption"
                value={sortBy ? sortBy : "dateEarliest"}
                onChange={(event, value) => onChange(value)}
                row
              >
                <FormControlLabel value="dateEarliest" control={<Radio />} label="Date (Earliest)" />
                <FormControlLabel value="dateLatest" control={<Radio />} label="Date (Latest)" />
                <FormControlLabel value="scoreHighest" control={<Radio />} label="Score (Highest)" />
                <FormControlLabel value="scoreLowest" control={<Radio />} label="Score (Lowest)" />
              </RadioGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

SorterUi.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SorterUi)