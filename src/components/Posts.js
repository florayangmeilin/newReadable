import React, { Component } from 'react'
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails, } from 'material-ui/ExpansionPanel'
import { votePost } from '../actions'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import Edit from 'material-ui-icons/Edit'
import Delete from 'material-ui-icons/Delete'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Posts extends Component {
  addVote = post => {
    PostsAPI.upVote(post).then((post) => {
      this.props.dispatch(votePost(post))
    })
  }
  removeVote = post => {
    PostsAPI.downVote(post).then((post) => {
      this.props.dispatch(votePost(post))
    })
  }
  render() {
    const { classes, category, posts } = this.props;
    const actualPosts = category === 0 ? posts : posts.filter(p => p.category === category)
   
    return (
      <div>
        {actualPosts && actualPosts.map(post => (
          <ExpansionPanel key={post.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {post.title} <br />
                Author: {post.author}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {post.commentCount} comments <br />
                Score: {post.voteScore} <br />
              </Typography>
            </ExpansionPanelDetails>
            <AppBar position="static" color="accent">
              <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { this.addVote(post) }}>
                  <ThumbUp />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { this.removeVote(post) }}>
                  <ThumbDown />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                  <Edit />
                </IconButton>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                  <Delete />
                </IconButton>
              </Toolbar>
            </AppBar>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

function mapStateToProps(posts) {
  return posts
}

const PostWithStyle = withStyles(styles)(Posts);
export default connect(mapStateToProps)(PostWithStyle)
