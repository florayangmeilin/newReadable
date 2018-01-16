import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class PostDetail extends React.Component {
  state = {
    readonly: true,
    category: "React",
    categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },

    ]
  }
  render() {
    const { classes, post } = this.props
    return (post ?
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              {post.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel>Content</InputLabel>
          <Input
            id="content"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input
            id="adornment-amount"
          />
        </FormControl>
      </div > :
      <div />
    )
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostDetail);