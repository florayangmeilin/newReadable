import * as PostsAPI from '../utils/api'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const SET_SORTER = 'SET_SORTER'
export const DELETE_POST = 'DELETE_POST'

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post,
  }
}

export function setSorter(sorter) {
  return {
    type: SET_SORTER,
    sorter,
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export const fetchPosts = () => dispatch => {
  return PostsAPI.getPosts()
    .then(posts => {
      dispatch(receivePosts(posts))
    })
}

export const fetchCategories = () => dispatch => {
  return PostsAPI.getCategories()
    .then(categories => {
      dispatch(receiveCategories(categories))
    })
}