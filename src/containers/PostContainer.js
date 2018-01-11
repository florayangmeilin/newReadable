import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PostDetail from '../components/PostDetail'

class PostContainer extends React.Component {
  render() {
    const { postId, posts } = this.props
    const post = posts.find ( p => p.id === postId)  
    return (
      <Fragment>
        <PostDetail post={post}/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { posts } = state
  return { posts }
}

export default connect(mapStateToProps)(PostContainer)