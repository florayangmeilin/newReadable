import React, { Fragment } from 'react'
import { votePost, deletePost, fetchPosts } from '../actions'
import { connect } from 'react-redux'
import * as PostsAPI from '../utils/api'
import Post from '../components/Post'

const Posts = ({ posts, addVote, category, removeVote,deletePost }) => { 
  return (
    <Fragment>
      {((!category && posts) || posts.filter(p => p.category === category)).map(post => (
        <Post key={post.id} post={post} upVote={addVote} removeVote={removeVote} deletePost={deletePost} category={category}/>
      ))}
    </Fragment>
  )
}

function mapStateToProps(state) {
  const { posts, selectedSorter } = state
  switch (selectedSorter) {
    case "dateEarliest":      
      return { posts: [...posts].sort(function (a, b) { return a.timestamp - b.timestamp }) }
    case "dateLatest":      
      return { posts: [...posts].sort(function (a, b) { return b.timestamp - a.timestamp }) }
    case "scoreHighest":
      return { posts: [...posts].sort(function (a, b) { return b.voteScore - a.voteScore }) }
    case "scoreLowest":
      return { posts: [...posts].sort(function (a, b) { return a.voteScore - b.voteScore }) }
    default:
      return { posts }
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
    },
    deletePost: post => {    
      PostsAPI.deletePost(post).then((post) => {        
        dispatch(deletePost(post))
        dispatch(fetchPosts())
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
