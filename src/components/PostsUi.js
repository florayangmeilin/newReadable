import React from 'react'
import Typography from 'material-ui/Typography'
import Post from './Post'

const PostsUi = ({ posts, onUpVote, onDownVote, onDeletePost }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {posts.filter(p => !p.deleted).map(post =>
        <Post
          key={post.id}
          post={post}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onDeletePost={onDeletePost}
        />
      )}
    </Typography>)
}
export default PostsUi
