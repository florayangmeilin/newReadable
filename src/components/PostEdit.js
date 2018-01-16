import React from 'react'
import { connect } from 'react-redux'
import PostEditUi from './PostEditUi'
import * as actions from '../actions'

class PostEdit extends React.Component {
  componentDidMount() {
    const { postId, fetchPostIfNeeded } = this.props
    fetchPostIfNeeded(postId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postId !== this.props.postId) {
      const { postId, fetchPostIfNeeded } = nextProps
      fetchPostIfNeeded(postId)
    }
  }

  render() {
    const { post } = this.props
    return (
      <PostEditUi post={post} />
    )
  }
}

const mapStateToProps = ({ posts }, { postId, category }) => {
  return { post: posts[postId] }
}

const mapDispatchToProps = dispatch => ({
  fetchPostIfNeeded: postId => { dispatch(actions.fetchPostIfNeeded(postId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)