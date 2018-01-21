import React from 'react'
import * as actions from '../actions'
import CommentUi from './CommentUi'
import { connect } from 'react-redux'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    const comment = props.comment || {}
    this.state = {
      editable: false,
      timestamp: comment.timestamp,
      body: comment.body
    }
  }

  handleEdit = () => {
    this.setState({ editable: true })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSave = onSuccess => {
    const { dispatch, comment } = this.props
    this.setState({ editable: false })
    dispatch(actions.saveComment({ ...comment, timestamp: this.state.timestamp, body: this.state.body }, onSuccess))
  }

  render() {
    const { comment, onUpVoteComment, onDownVoteComment, onDeleteComment } = this.props
    const { editable } = this.state
    return (
      <CommentUi
        comment={comment}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
        onDeleteComment={onDeleteComment}
        editable={editable}
        onSave={this.handleSave}
        onEdit={this.handleEdit} 
        onChange={this.handleChange}/>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})
export default connect(mapDispatchToProps)(Comment)