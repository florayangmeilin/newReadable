export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'

export function storeCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export function storePosts (posts) {
  return {
    type: GET_POSTS,
    posts,
  }
}

export function votePost (post) {
  return {
    type: VOTE_POST,
    post,
  }
}