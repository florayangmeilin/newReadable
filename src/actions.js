import * as PostsAPI from './api'

export const FETCH_CATEGORIES_OK = 'FETCH_CATEGORIES_OK'
const fetchCategories = () => dispatch => {
  PostsAPI.getCategories()
    .then(categories => {
      dispatch({
        type: FETCH_CATEGORIES_OK,
        categories: categories.map(c => c.name)
      })
    })
}
const shouldfetchCategories = state => {
  const { categories } = state
  return !categories.isFetched
}
export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldfetchCategories(getState()))
    return dispatch(fetchCategories())
}

export const FETCH_POSTS_BEGIN = 'FETCH_POSTS_BEGIN'
export const FETCH_POSTS_OK = 'FETCH_POSTS_OK'
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED'
const fetchPosts = (category = null) => dispatch => {
  dispatch({
    type: FETCH_POSTS_BEGIN,
    category
  })
  return PostsAPI.getPosts(category)
    .then(posts => {
      dispatch({
        type: FETCH_POSTS_OK,
        category,
        posts
      })
    }, () => {
      dispatch({
        type: FETCH_POSTS_FAILED,
        category
      })
    })
}
const shouldFetchPost = (state, category) => {
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.isInvalidate
  }
}
export const fetchPostsIfNeeded = (category = null) => (dispatch, getState) => {
  if (shouldFetchPost(getState(), category))
    return dispatch(fetchPosts(category))
}

export const FETCH_POST_OK = 'FETCH_POST_OK'
const fetchPost = postId => dispatch =>
  PostsAPI.getPost(postId)
    .then(post => {
      dispatch({
        type: FETCH_POST_OK,
        post
      })
    })
export const fetchPostIfNeeded = postId => (dispatch, getState) => {
  const { posts } = getState()
  if (!posts[postId]) {
    return dispatch(fetchPost(postId))
  }
}

export const UP_VOTE_POST_OK = 'UP_VOTE_POST_OK'
export const upVotePost = post => dispatch =>
  PostsAPI.upVotePost(post.id)
    .then(() => {
      dispatch({
        type: UP_VOTE_POST_OK,
        post
      })
    })

export const DOWN_VOTE_POST_OK = 'DOWN_VOTE_POST_OK'
export const downVotePost = post => dispatch =>
  PostsAPI.downVotePost(post.id)
    .then(() => {
      dispatch({
        type: DOWN_VOTE_POST_OK,
        post
      })
    })

export const DELETE_POST_OK = 'DELETE_POST_OK'
export const deletePost = post => dispatch =>
  PostsAPI.deletePost(post.id)
    .then(() => {
      dispatch({
        type: DELETE_POST_OK,
        post
      })
    })

export const FETCH_COMMENTS_OK = 'FETCH_COMMENTS_OK'
export const fetchComments = post => dispatch =>
  PostsAPI.getComments(post)
    .then(comments => {
      dispatch({
        type: FETCH_COMMENTS_OK,
        post,
        comments
      })
    })

export const FETCH_COMMENT_OK = 'FETCH_COMMENT_OK'
export const fetchComment = commentId => dispatch =>
  PostsAPI.getComment(commentId)
    .then(comment => {
      dispatch({
        type: FETCH_COMMENT_OK,
        comment
      })
    })

export const SET_SORTER_OK = 'SET_SORTER_OK'
export const setSorter = sorter => ({
  type: SET_SORTER_OK,
  sorter
})
