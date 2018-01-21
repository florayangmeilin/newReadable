import React from 'react'
import { withStyles } from 'material-ui/styles'
import Comment from './Comment'

const styles = theme => ({
  root: {
    width: 425,
  },
})

function CommentsUi(props) {
  const { classes, comments, } = props
  return (
    <div className={classes.root}>
      {comments.filter(c => !c.deleted).map(comment =>
        <Comment
          key={comment.id}
          comment={comment}
           />
      )}
    </div>
  )
} 
   
export default withStyles(styles)(CommentsUi)