const api = "http://localhost:3001"

const headers = {
  'Authorization': 'whatever-you-want'
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = category =>
  fetch(`${api}/${category ? category + '/' : ''}posts`, { headers })
    .then(res => res.json())

export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const upVotePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  }).then(res => res.json())

export const downVotePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' })
  }).then(res => res.json())


export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const getComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const getComment = commentId =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
