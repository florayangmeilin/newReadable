import React from 'react'
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
import Input from 'material-ui/Input/Input'
import Grid from 'material-ui/Grid'
import Save from 'material-ui-icons/Save'
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

class CommentUi extends React.Component {
  state = {
    promptSaveOk: false
  }

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ promptSaveOk: false })
  }
  render() {
    const { classes, comment, onUpVoteComment, onDownVoteComment, onDeleteComment, editable, onSave, onEdit, onChange } = this.props    
    return (
      <React.Fragment>
        <ExpansionPanel key={comment.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading} color="primary">Author ( {comment.author} )</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Grid container className={classes.container}>
              <Grid item xs>
                <Typography type="body1" color="primary" >
                  {'Timestamp'}
                </Typography>
                <Input
                  type="text"
                  name="timestamp"
                  defaultValue={comment.timestamp}
                  fullWidth
                  disabled={!editable}
                  onChange={onChange}
                />
                <Typography type="body1" color="primary" >
                  {'Content'}
                </Typography>
                <Input
                  type="text"
                  name="body"
                  defaultValue={comment.body}
                  fullWidth
                  disabled={!editable}
                  onChange={onChange}
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
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onSave(() => { this.setState({ promptSaveOk: true }) }) }}>
                  <Save />
                </IconButton>
              </Toolbar> :
              <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onUpVoteComment(comment) }}>
                  <ThumbUp />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDownVoteComment(comment) }}>
                  <ThumbDown />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onEdit() }}>
                  <Edit />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDeleteComment(comment) }}>
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
            <Button key="undo" color="accent" dense onClick={this.handleClose}>
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

export default withStyles(styles)(CommentUi)