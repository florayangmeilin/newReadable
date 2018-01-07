import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POSTS,
  VOTE_POST,
  SELECT_CATEGORY
} from '../actions'

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const { categories } = action
      return categories
    default:
      return state
  }
}

function posts(state = [], action) {
  const { posts, post } = action
  switch (action.type) {
    case GET_POSTS:    
      return posts
    case VOTE_POST:    
      return state.map(p => (p.id === post.id ? {...p, voteScore: post.voteScore } : {...p}))
    default:
      return state
  }
}

const selectedCategory = (state = 'all', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  selectedCategory
})