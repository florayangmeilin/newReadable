import React from 'react'
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails, } from 'material-ui/ExpansionPanel'
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
import { Link } from 'react-router-dom'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const Post = ({ classes, post, upVote, removeVote, deletePost, category }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>
        {post.title}<br />
        Author: {post.author} ( {post.timestamp} )
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
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { upVote(post) }}>
          <ThumbUp />
        </IconButton>
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { removeVote(post) }}>
          <ThumbDown />
        </IconButton>
        <Link to={`/${post.category}/${post.id}`}>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
            <Edit />
          </IconButton>
        </Link>
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { deletePost(post) }}>
          <Delete />
        </IconButton>
      </Toolbar>
    </AppBar>
  </ExpansionPanel>
)

const PostWithStyle = withStyles(styles)(Post);
export default PostWithStyle
