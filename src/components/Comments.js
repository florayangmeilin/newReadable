import React from 'react'
import { connect } from 'react-redux'
import CommentsUi from './CommentsUi'
import * as actions from '../actions'

class Comments extends React.Component {
  componentDidMount() {
    const { fetchComments, post } = this.props   
      fetchComments(post.id)   
  }
  
  render() {
    const { comments, post } = this.props     
    return  <CommentsUi 
    comments={comments} 
    post={post}    
    />   
  }
}

const mapStateToProps = (({ comments }, { post }) => {  
  return { 
    comments: (post && post.comments &&
      post.comments.map(c => comments[c])) || []
  }
})

const mapDispatchToProps = dispatch => ({ 
  fetchComments: postId => { dispatch(actions.fetchComments(postId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
