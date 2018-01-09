import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  VOTE_POST,
  SET_SORTER
} from '../actions'

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action
      return categories
    default:
      return state
  }
}

function posts(state = [], action) {
  const { posts, post } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return posts
    case VOTE_POST:
      return state.map(p => (p.id === post.id ? { ...p, voteScore: post.voteScore } : { ...p }))
    default:
      return state
  }
}

const selectedSorter = (state = 'dateEarliest', action) => {
  switch (action.type) {
    case SET_SORTER:
      return action.sorter
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  selectedSorter
})