import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input/Input';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import Save from 'material-ui-icons/Save';
import Comments from './Comments'

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
};

const PostEditUi = ({ classes, post, onUpVote, onDownVote, onDeletePost, editable, onEdit, onSave }) => {
  return (post ?
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
                  disabled={!editable}
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
                      <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onSave(post) }}>
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
                      <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDeletePost(post) }}>
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
    </Grid> : <div />
  )
}
export default withStyles(styles)(PostEditUi)