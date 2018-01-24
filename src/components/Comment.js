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
import Cancel from 'material-ui-icons/Cancel'
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
  state = {
    editable: false,
    editingComment: {},
    promptSaveOk: false
  }

  handleEdit = () => {
    const { comment } = this.props
    this.setState({ editingComment: { ...comment, timestamp: Date.now() }, editable: true })
  }

  handleChange = e => {
    const { name, value } = e.target
    const { editingComment } = this.state
    this.setState({
      editingComment: { ...editingComment, [name]: value }
    })
  }

  handleSave = () => {
    const { comment } = this.props
    const { editingComment } = this.state
    this.setState({ editingComment: {}, editable: false })
    this.props.dispatch(actions.saveComment({ ...comment, ...editingComment }, () => { this.setState({ promptSaveOk: true }) }))
  }

  handleCancel = () => {
    this.setState({ editingComment: {}, editable: false })
  }

  handleClose = (e, reason) => {
    this.setState({ promptSaveOk: false })
  }

  render() {
    const { comment, dispatch, classes } = this.props
    const { editable, editingComment } = this.state
    return (
      <React.Fragment>
        <ExpansionPanel key={comment.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading} color="primary">{comment.body}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Grid container className={classes.container} alignItems='center' direction='column' justify='flex-start'>
              <Grid item >
                <TextField
                  label="Content"
                  className={classes.textField}
                  value={editable ? editingComment.body : comment.body}
                  onChange={this.handleChange}
                  margin="normal"
                  disabled={!editable}
                  name="body"
                />
                <TextField
                  label="Author"
                  type="text"
                  defaultValue={comment.author}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
                <TextField
                  label="Timestamp"
                  type="text"
                  name="timestamp"
                  value={utility.toDatetimeString(comment.timestamp)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
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
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleCancel}>
                  <Cancel />
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