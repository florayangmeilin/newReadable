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
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input/Input'
import Grid from 'material-ui/Grid'
import Save from 'material-ui-icons/Save'

const styles = theme => ({
  root: {
    width: 425,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

function CommentsUi(props) {
  const { classes, comments, post, onUpVoteComment, onDownVoteComment, onDeleteComment, editable, onEdit, onSave } = props
  return (
    <div className={classes.root}>
      {comments.filter(c => !c.deleted).map(comment =>
        <ExpansionPanel key={comment.id}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Comment No. ( {post.timestamp} )</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Grid container className={classes.container}>
              <Grid item xs>
              <Typography type="body1" color="primary" >
                  {'Author'}
                </Typography>
                <Input
                  type="text"
                  name="commentAuthor"
                  defaultValue={comment.author}
                  fullWidth
                  disabled={!editable}
                />
                <Typography type="body1" color="primary" >
                  {'Content'}
                </Typography>
                <Input
                  type="text"
                  name="commentBody"
                  defaultValue={comment.body}
                  fullWidth
                  disabled={!editable}
                />
                <Typography>
                  <br />
                  Score: {comment.voteScore}
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <AppBar position="static" color="primary">
            {editable ?
              <Toolbar>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onSave(comment) }}>
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
                <Link to={`/${post.category}/${post.id}`}>
                  <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onEdit() }}>
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={() => { onDeleteComment(comment) }}>
                  <Delete />
                </IconButton>
              </Toolbar>}
          </AppBar>
        </ExpansionPanel>
          )}
    </div>
      )
      } 
         
export default withStyles(styles)(CommentsUi)