import { combineReducers } from 'redux'
import {
  FETCH_CATEGORIES_OK,
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_OK,
  FETCH_POSTS_FAILED,
  FETCH_POST_OK,
  UP_VOTE_POST_OK,
  DOWN_VOTE_POST_OK,
  DELETE_POST_OK,
  UP_VOTE_COMMENT_OK,
  DOWN_VOTE_COMMENT_OK,
  DELETE_COMMENT_OK,
  FETCH_COMMENTS_OK,
  FETCH_COMMENT_OK,
  SET_SORTER_OK,
  SAVE_POST_OK,
  SAVE_COMMENT_OK,
} from './actions'

const reducers = {
  categories: {
    initValue: { isFetched: false, items: [] },
    [FETCH_CATEGORIES_OK]: (state, { categories }) => ({ isFetched: true, items: categories })
  },
  posts: {
    initValue: {},
    [FETCH_POSTS_OK]: (state, { posts }) => ({ ...state, ...(posts.reduce((s, p) => ({ ...s, [p.id]: p }), {})) }),
    [FETCH_POST_OK]: (state, { post }) => ({ ...state, [post.id]: post }),
    [UP_VOTE_POST_OK]: (state, { post }) => ({ ...state, [post.id]: { ...post, voteScore: post.voteScore + 1 } }),
    [DOWN_VOTE_POST_OK]: (state, { post }) => ({ ...state, [post.id]: { ...post, voteScore: post.voteScore - 1 } }),
    [DELETE_POST_OK]: (state, { post }) => ({ ...state, [post.id]: { ...post, deleted: true } }),
    [FETCH_COMMENTS_OK]: (state, { comments, postId }) => {
      const post = state[postId]
      return { ...state, [postId]: { ...(post || {}), comments: comments.map(c => c.id) } }
    },
    [SAVE_POST_OK]: (state, { post }) => ({ ...state, [post.id]: { ...post } })
  },
  comments: {
    initValue: {},
    [FETCH_COMMENTS_OK]: (state, { comments }) => ({ ...state, ...(comments.reduce((s, c) => ({ ...s, [c.id]: c }), {})) }),
    [FETCH_COMMENT_OK]: (state, { comment }) => ({ ...state, [comment.id]: comment }),
    [DELETE_POST_OK]: (state, { post }) => {
      const comments = (post.comments || []).map(id => state[id]).filter(c => c)
      return { ...state, ...(comments.reduce((s, c) => ({ ...s, [c.id]: { ...c, deleted: true } }), {})) }
    },
    [UP_VOTE_COMMENT_OK]: (state, { comment }) => ({ ...state, [comment.id]: { ...comment, voteScore: comment.voteScore + 1 } }),
    [DOWN_VOTE_COMMENT_OK]: (state, { comment }) => ({ ...state, [comment.id]: { ...comment, voteScore: comment.voteScore - 1 } }),
    [DELETE_COMMENT_OK]: (state, { comment }) => ({ ...state, [comment.id]: { ...comment, deleted: true } }),
    [SAVE_COMMENT_OK]: (state, { comment }) => ({ ...state, [comment.id]: { ...comment } })
  },
  postsByCategory: {
    initValue: {},
    [FETCH_POSTS_BEGIN]: (state, { category }) => ({ ...state, [category]: { isFetching: true } }),
    [FETCH_POSTS_OK]: (state, { category, posts }) => ({ ...state, [category]: { isFetching: false, isInvalidate: false, items: posts.map(p => p.id) } }),
    [FETCH_POSTS_FAILED]: (state, { category }) => ({ ...state, [category]: { isFetching: false, isInvalidate: true } })
  },
  selectedSorter: {
    initValue: 'dateEarliest',
    [SET_SORTER_OK]: (state, { sorter }) => sorter
  }
}

const getReduces = reducers => (
  Object.keys(reducers).reduce((b, r) => ({
    ...b, [r]: (state = reducers[r].initValue, action) => {
      const fun = reducers[r][action.type]
      return (fun && fun(state, action)) || state
    }
  }), {})
)

export default combineReducers(getReduces(reducers))