import React from 'react'
import { connect } from 'react-redux'
import PostEditUi from './PostEditUi'
import * as actions from '../actions'

class PostEdit extends React.Component {
  constructor(props) {
    super(props)
    const post = props.post || {}
    this.state = {
      editable: false,
      title: post.title,
      body: post.body
    }
  }

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
  handleEdit = () => {
    this.setState({ editable: true })
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleSave = onSuccess => {
    const { dispatch, post } = this.props
    this.setState({ editable: false })
    dispatch(actions.savePost({ ...post, title: this.state.title, body: this.state.body }, onSuccess))
  }
  render() {
    const { post, onUpVote, onDownVote, onDeletePost } = this.props
    const { editable } = this.state
    return (
      <PostEditUi
        post={post}
        editable={editable}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onDeletePost={onDeletePost}
        onEdit={this.handleEdit}
        onSave={this.handleSave}
        onChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = ({ posts }, { postId, category }) => {
  return { post: posts[postId] }
}

const mapDispatchToProps = dispatch => ({
  onUpVote: post => { dispatch(actions.upVotePost(post)) },
  onDownVote: post => { dispatch(actions.downVotePost(post)) },
  onDeletePost: (post, onSuccess) => { dispatch(actions.deletePost(post, onSuccess)) },
  fetchPostIfNeeded: postId => { dispatch(actions.fetchPostIfNeeded(postId)) },
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit)