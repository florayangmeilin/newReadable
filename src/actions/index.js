import * as PostsAPI from '../utils/api'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function receiveCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category,
  }
}

export const fetchPosts = category => dispatch => {
  return PostsAPI.getPosts()
    .then(posts => {
      dispatch(getPosts(posts))
    })
}

export const fetchCategories = () => dispatch => {
  return PostsAPI.getCategories()
    .then(categories => {      
      dispatch(receiveCategories(categories))
    })
}