import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'
import Comment from './Comment'
import * as actions from '../actions'

const styles = theme => ({
  root: {
    width: 425,
  },
})

class Comments extends React.Component {
  componentDidMount() {
    const { dispatch, post } = this.props
    dispatch(actions.fetchCommentsIfNeeded(post.id))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.id !== this.props.post.id) {
      const { post, dispatch } = nextProps
      dispatch(actions.fetchCommentsIfNeeded(post.id))
    }
  }

  render() {
    const { comments, classes } = this.props
    return (comments.length > 0 &&
      <div className={classes.root}>
        {comments.map(comment =>
          <Comment
            key={comment.id}
            comment={comment}
          />
        )}
      </div>
    ) || null
  }
}

const mapStateToProps = (({ comments }, { post }) => {
  return {
    comments: (post && post.comments &&
      post.comments.map(c => comments[c]).filter(c => !c.deleted)) || []
  }
})

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Comments)
