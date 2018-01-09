import React, { Fragment } from 'react'
import { votePost } from '../actions'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api'
import Post from '../components/Post'

const Posts = ({ posts, addVote, category, removeVote }) => {
  return (
    <Fragment>
      {((!category && posts) || posts.filter(p => p.category === category)).map(post => (
        <Post key={post.id} post={post} upVote={addVote} removeVote={removeVote} />
      ))}
    </Fragment>
  )
}

function mapStateToProps(state) {
  const { posts } = state
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addVote: post => {
      PostsAPI.upVote(post).then((post) => {
        dispatch(votePost(post))
      })
    },
    removeVote: post => {
      PostsAPI.downVote(post).then((post) => {
        dispatch(votePost(post))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
