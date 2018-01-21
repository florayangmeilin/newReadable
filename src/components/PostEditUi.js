import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Input from 'material-ui/Input/Input'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import Edit from 'material-ui-icons/Edit'
import Delete from 'material-ui-icons/Delete'
import Save from 'material-ui-icons/Save'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import CloseIcon from 'material-ui-icons/Close'
import Comments from './Comments'
import NewComment from './NewComment'

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 25,
  },
  paper: {
    marginTop: 35,
    height: 450,
    width: 425,
    marginBottom: 35,
  },
  padded: {
    padding: '50px',
  },
  smtitle: {
    padding: '5px 0',
    width: '100%',
    fontSize: '0.5em',
  },
  link: {
    textDecoration: 'none',
    fontSize: '0.8em',
  },
  nopad: {
    padding: 0,
  },
  bottom: {
    marginTop: 150,
    fontSize: '0.5em',
    textAlign: 'center',
  },
}

class PostEditUi extends React.Component {
  state = {
    promptSaveOk: false,   
  }

  handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ promptSaveOk: false })
  }

  render() {
    const { classes, post, history, onUpVote, onDownVote, onDeletePost, editable, onEdit, onSave, onChange } = this.props
    return (
      post ?
        <React.Fragment>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container justify="center" direction="column" alignItems="center">
                <Grid item xs>
                  <Typography type="display1" color="primary">
                    Post: {post.timestamp}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <NewComment post={post}/>
            <Grid item xs={12}>
              <Grid container justify="center" >
                <Paper className={classes.paper} >
                  <div className={classes.padded}>
                    <div>
                      <Typography type="body1" color="primary">
                        {'Title'}
                      </Typography>
                      <Input
                        type="text"
                        name="title"
                        defaultValue={post.title}
                        fullWidth
                        disabled={!editable}
                        onChange={onChange}
                      />
                    </div>
                    <br />
                    <div>
                      <Typography type="body1" color="primary">
                        {'Content'}
                      </Typography>
                      <Input
                        type="text"
                        name="body"
                        defaultValue={post.body}
                        fullWidth
                        disabled={!editable}
                        onChange={onChange}
                      />
                    </div>
                    <br />
                    <div>
                      <Typography type="body1" color="primary">
                        {'Author'}
                      </Typography>
                      <Input
                        type="text"
                        name="author"
                        defaultValue={post.author}
                        fullWidth
                        disabled={true}
                      />
                    </div>
                    <br />
                    <div>
                      <Typography type="body1" color="primary">
                        {post.commentCount} comments <br />
                        Score: {post.voteScore} <br />
                      </Typography>
                    </div>
                    <br />
                    <div>
                      <AppBar position="static" color="accent">
                        {editable ?
                          <Toolbar>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onSave(() => { this.setState({ promptSaveOk: true }) }) }}>
                              <Save />
                            </IconButton>
                          </Toolbar> :
                          <Toolbar>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onUpVote(post) }}>
                              <ThumbUp />
                            </IconButton>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDownVote(post) }}>
                              <ThumbDown />
                            </IconButton>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onEdit() }}>
                              <Edit />
                            </IconButton>
                            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDeletePost(post, () => { history.push(`/${post.category}`) }) }}>
                              <Delete />
                            </IconButton>                           
                          </Toolbar>}
                      </AppBar>
                    </div>                   
                  </div>
                  <div>
                    <Comments post={post} />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
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
        </React.Fragment> : <div />
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(PostEditUi)