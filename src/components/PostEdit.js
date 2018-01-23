import React from 'react'
import { connect } from 'react-redux'
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
import * as actions from '../actions'

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
  menuButton: {
    color: 'white'
  },
}

class PostEdit extends React.Component {
  constructor(props) {
    super(props)
    const post = props.post || {}
    this.state = {
      editable: false,
      post,
      promptSaveOk: false
    }
  }

  fetchPostIfNeeded = postId => {
    this.props.dispatch(actions.fetchPostIfNeeded(postId))
  }
  componentDidMount() {
    const { postId } = this.props
    this.fetchPostIfNeeded(postId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      const { postId } = nextProps
      this.fetchPostIfNeeded(postId)
    }
  }
  handleEdit = () => {
    this.setState({ editable: true })
  }
  handleChange = e => {
    const { name, value } = e.target
    const { post } = this.state
    this.setState({
      post: { ...post, [name]: value }
    })
  }
  handleSave = () => {
    const { dispatch, post } = this.props
    this.setState({ editable: false })
    dispatch(actions.savePost({ ...post, title: this.state.title, body: this.state.body }, () => { this.setState({ promptSaveOk: true }) }))
  }
  handleClose = () => {
    this.setState({ promptSaveOk: false })
  }
  render() {
    const { post, classes, dispatch, history } = this.props
    const { editable } = this.state
    return (
      post ?
        <React.Fragment>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Grid container justify="center" direction="column" alignItems="center">
                <Grid item xs>
                  <Typography type="display1" color="primary">
                    POST
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                      <AppBar position="static">
                        {editable ?
                          <Toolbar>
                            <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleSave}>
                              <Save />
                            </IconButton>
                          </Toolbar> :
                          <Toolbar>
                            <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.upVotePost(post)) }}>
                              <ThumbUp />
                            </IconButton>
                            <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.downVotePost(post)) }}>
                              <ThumbDown />
                            </IconButton>
                            <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleEdit}>
                              <Edit />
                            </IconButton>
                            <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { dispatch(actions.deletePost(post, () => { history.push(`/${post.category}`) })) }}>
                              <Delete />
                            </IconButton>
                          </Toolbar>}
                      </AppBar>
                    </div>
                  </div>
                  <Comments post={post} />
                  <NewComment postId={post.id} />
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
        </React.Fragment> : <div />
    )
  }
}

const mapStateToProps = ({ posts }, { postId }) => {
  return { post: posts[postId] }
}

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(PostEdit)
