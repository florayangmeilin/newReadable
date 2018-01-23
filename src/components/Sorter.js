import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { FormLabel, FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Paper from 'material-ui/Paper'
import { compose } from 'redux'
import { setSorter } from '../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

const Sorter = ({ selectedSorter, dispatch, classes }) =>{
  const handleChange = value => dispatch(setSorter(value))
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
                value={selectedSorter ? selectedSorter : "dateEarliest"}
                onChange={(event, value) => handleChange(value)}
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
const mapStateToProps = state => {
  const { selectedSorter } = state
  return { selectedSorter }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Sorter)