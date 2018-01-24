import React from 'react'
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails, } from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import Edit from 'material-ui-icons/Edit'
import Delete from 'material-ui-icons/Delete'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import * as utility from '../utility'

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: 'white'
  },
  button: {
    marginLeft: -theme.spacing.unit * 3,
    fontWeight: 'bold'
  }
})

const Post = ({ classes, post, onUpVote, onDownVote, onDeletePost, onEditPost, history }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>
        <Button className={classes.button} onClick={() => { history.push(`/${post.category}/${post.id}`) }} >
          {post.title}
        </Button>
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        Body: {post.body}<br />
        Author: {post.author}<br />
        Timestamp: {utility.toDatetimeString(post.timestamp)}<br />
        Score: {post.voteScore} <br />
        Category: {post.category} <br />
        {post.commentCount} comments <br />
      </Typography>
    </ExpansionPanelDetails>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { onUpVote(post) }}>
          <ThumbUp />
        </IconButton>
        <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { onDownVote(post) }}>
          <ThumbDown />
        </IconButton>
        <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { onEditPost(post) }}>
          <Edit />
        </IconButton>
        <IconButton className={classes.menuButton} aria-label="Menu" onClick={() => { onDeletePost(post) }}>
          <Delete />
        </IconButton>
      </Toolbar>
    </AppBar>
  </ExpansionPanel>
)

export default compose(
  withRouter,
  withStyles(styles)
)(Post)
