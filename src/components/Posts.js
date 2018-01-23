import React from 'react'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Post from './Post'

class Posts extends React.Component {
  componentDidMount() {
    const { category } = this.props
    this.fetchPostsIfNeeded(category)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      const { category } = nextProps
      this.fetchPostsIfNeeded(category)
    }
  }

  handleUpVote = post => {
    this.props.dispatch(actions.upVotePost(post))
  }

  handleDownVote = post => {
    this.props.dispatch(actions.downVotePost(post))
  }

  handleDeletePost = post => {
    this.props.dispatch(actions.deletePost(post))
  }

  fetchPostsIfNeeded = category => {
    this.props.dispatch(actions.fetchPostsIfNeeded(category))
  }

  render() {
    const { posts } = this.props
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {posts.map(post =>
          <Post
            key={post.id}
            post={post}
            onUpVote={this.handleUpVote}
            onDownVote={this.handleDownVote}
            onDeletePost={this.handleDeletePost}
          />
        )}
      </Typography>
    )
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
      categoryPosts.items.map(p => posts[p]).filter(p => !p.deleted).sort(sortFuns[selectedSorter])) || []
  }
}

export default connect(mapStateToProps)(Posts)
