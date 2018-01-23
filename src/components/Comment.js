import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import Edit from 'material-ui-icons/Edit'
import Delete from 'material-ui-icons/Delete'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Grid from 'material-ui/Grid'
import Save from 'material-ui-icons/Save'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'
import TextField from 'material-ui/TextField'
import { compose } from 'redux'
import * as actions from '../actions'
import * as utility from '../utility'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    flexGrow: 1
  },
  textField: {
    width: '100%'
  },
  menuButton: {
    color: 'white'
  }
})

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      editingComment: props.comment || {},
      promptSaveOk: false
    }
  }

  handleEdit = () => {
    this.setState({ editable: true })
  }

  handleChange = e => {
    const { name } = e.target
    const value = (name === 'timestamp' && utility.toTimestamp(e.target.value)) || e.target.value
    const { editingComment } = this.state
    this.setState({
      editingComment: { ...editingComment, [name]: value }
    })
  }

  handleSave = () => {
    const { editingComment } = this.state
    this.setState({ editable: false })
    this.props.dispatch(actions.saveComment(editingComment, () => { this.setState({ promptSaveOk: true }) }))
  }

  handleClose = (e, reason) => {
    this.setState({ promptSaveOk: false })
  }

  render() {
    const { comment, dispatch, classes } = this.props
    const { editable } = this.state
    return (
      <React.Fragment>
        <ExpansionPanel key={comment.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading} color="primary">Author ( {comment.author} )</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Grid container className={classes.container} alignItems='center' direction='column' justify='flex-start'>
              <Grid item >
                <TextField
                  label="timestamp"
                  type="datetime-local"
                  name="timestamp"
                  defaultValue={utility.toEditDatetimeString(comment.timestamp)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  disabled={!editable}
                />
                <TextField
                  label="Content"
                  className={classes.textField}
                  defaultValue={comment.body}
                  onChange={this.handleChange}
                  margin="normal"
                  disabled={!editable}
                />
                <Typography color="primary">
                  <br />
                  Score: {comment.voteScore}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <AppBar position="static" color="primary">
            {editable ?
              <Toolbar>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleSave}>
                  <Save />
                </IconButton>
              </Toolbar> :
              <Toolbar>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.upVoteComment(comment)) }}>
                  <ThumbUp />
                </IconButton>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.downVoteComment(comment)) }}>
                  <ThumbDown />
                </IconButton>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleEdit}>
                  <Edit />
                </IconButton>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.deleteComment(comment)) }}>
                  <Delete />
                </IconButton>
              </Toolbar>}
          </AppBar>
        </ExpansionPanel>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.promptSaveOk}
          autoHideDuration={2000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Saved Successfully!</span>}
          action={[
            <Button key="undo" color="secondary" dense onClick={this.handleClose}>
              OK
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    )
  }
}

export default compose(
  connect(),
  withStyles(styles)
)(Comment)