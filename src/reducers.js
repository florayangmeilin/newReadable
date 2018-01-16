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
  FETCH_COMMENTS_OK,
  FETCH_COMMENT_OK,
  SET_SORTER_OK
} from './actions'

const categories = (before = { isFetched: false, items: [] }, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_OK: {
      const { categories } = action
      return { isFetched: true, items: categories }
    }
    default:
      return before
  }
}

const posts = (before = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_OK: {
      const { posts } = action
      return { ...before, ...(posts.reduce((s, p) => ({ ...s, [p.id]: p }), {})) }
    }
    case FETCH_POST_OK: {
      const { post } = action
      return { ...before, [post.id]: post }
    }
    case UP_VOTE_POST_OK: {
      const { post } = action
      return { ...before, [post.id]: { ...post, voteScore: post.voteScore + 1 } }
    }
    case DOWN_VOTE_POST_OK: {
      const { post } = action
      return { ...before, [post.id]: { ...post, voteScore: post.voteScore - 1 } }
    }
    case DELETE_POST_OK: {
      const { post } = action
      return { ...before, [post.id]: { ...post, deleted: true } }
    }
    default:
      return before
  }
}

const comments = (before = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_OK: {
      const { comments } = action
      return { ...before, ...(comments.reduce((s, c) => ({ ...s, [c.id]: c }), {})) }
    }
    case FETCH_COMMENT_OK: {
      const { comment } = action
      return { ...before, [comment.id]: comment }
    }
    default:
      return before
  }
}

const postsByCategory = (before = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_BEGIN: {
      const { category } = action
      return { ...before, [category]: { isFetching: true } }
    }
    case FETCH_POSTS_OK: {
      const { category, posts } = action
      return { ...before, [category]: { isFetching: false, isInvalidate: false, items: posts.map(p => p.id) } }
    }
    case FETCH_POSTS_FAILED: {
      const { category } = action
      return { ...before, [category]: { isFetching: false, isInvalidate: true } }
    }
    default:
      return before
  }
}

const selectedSorter = (before = 'dateEarliest', action) => {
  switch (action.type) {
    case SET_SORTER_OK: {
      const { sorter } = action
      return sorter
    }
    default:
      return before
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
  postsByCategory,
  selectedSorter
})