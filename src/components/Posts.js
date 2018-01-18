import React from 'react'
import PostsUi from './PostsUi'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Posts extends React.Component {
  componentDidMount() {
    const { fetchPostsIfNeeded, category } = this.props
    fetchPostsIfNeeded(category)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      const { fetchPostsIfNeeded, category } = nextProps
      fetchPostsIfNeeded(category)
    }
  }

  render() {
    const { posts, onUpVote, onDownVote, onDeletePost } = this.props 
    return <PostsUi posts={posts} onUpVote={onUpVote} onDownVote={onDownVote} onDeletePost={onDeletePost} />
  }
}

const sortFuns = {
  "dateEarliest": (a, b) => (a.timestamp - b.timestamp),
  "dateLatest": (a, b) => (b.timestamp - a.timestamp),
  "scoreLowest": (a, b) => (a.voteScore - b.voteScore),
  "scoreHighest": (a, b) => (b.voteScore - a.voteScore)
}

const mapStateToProps = ({ posts, postsByCategory, selectedSorter }, { category }) => {
  const categoryPosts = postsByCategory[category] 
  return {
    posts: (categoryPosts && !categoryPosts.isFetching && !categoryPosts.isInvalidate &&
      categoryPosts.items.map(p => posts[p]).sort(sortFuns[selectedSorter])) || []
  }
}

const mapDispatchToProps = dispatch => ({
  onUpVote: post => { dispatch(actions.upVotePost(post)) },
  onDownVote: post => { dispatch(actions.downVotePost(post)) },
  onDeletePost: post => { dispatch(actions.deletePost(post)) },
  fetchPostsIfNeeded: category => { dispatch(actions.fetchPostsIfNeeded(category)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
