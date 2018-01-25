import React from 'react'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import * as actions from '../actions'
import Post from './Post'
import EditPost from './EditPost'
import * as utility from '../utility'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'

const createNewPost = category => ({
  id: utility.getUuid(),
  timestamp: Date.now(),
  title: '',
  body: '',
  author: '',
  category: category || '',
  voteScore: 1,
  commentCount: 0,
  deleted: false,
  comments: null,
  isNewPost: true
})

const styles = theme => ({
  add: {
    marginTop: theme.spacing.unit * 2
  }
})

class Posts extends React.Component {
  state = {
    editingPost: null
  }

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

  handleNewPost = () => {
    const { category } = this.props
    this.setState({
      editingPost: createNewPost(category)
    })
  }

  handleEditPost = post => {
    this.setState({
      editingPost: { ...post, isNewPost: false }
    })
  }

  handleCloseOfEditPost = () => {
    this.setState({
      editingPost: null
    })
  }

  fetchPostsIfNeeded = category => {
    this.props.dispatch(actions.fetchPostsIfNeeded(category))
  }

  render() {
    const { posts, categories, category, classes } = this.props
    const { editingPost } = this.state
    return (
      <React.Fragment>
        <Typography component="div" style={{ padding: 8 * 3 }}>
          {posts.map(post =>
            <Post
              key={post.id}
              post={post}
              onUpVote={this.handleUpVote}
              onDownVote={this.handleDownVote}
              onDeletePost={this.handleDeletePost}
              onEditPost={this.handleEditPost}
            />
          )}
          <Button fab color="primary" className={classes.add} aria-label="add" onClick={this.handleNewPost}>
            <AddIcon />
          </Button>
        </Typography>
        {editingPost && <EditPost post={editingPost} categories={category ? null : categories} onClose={this.handleCloseOfEditPost} />}
      </React.Fragment>
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

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Posts)
