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

export const upVoteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
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

export const downVoteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
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

export const savePost = post =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(res => res.json())

export const addPost = post =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post.id, timestamp: post.timestamp, title: post.title, body: post.body, author: post.author, category: post.category })
  }).then(res => res.json())

export const saveComment = comment =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp: comment.timestamp, body: comment.body })
  }).then(res => res.json())

export const addComment = comment =>{
  console.log('addComment:', comment)
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: comment.id, timestamp: comment.timestamp, body: comment.body, author: comment.author, parentId: comment.parentId })
  }).then(res => {
    return res.json()
  })
}
export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
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
