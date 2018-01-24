import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input/Input'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { compose } from 'redux'
import AddIcon from 'material-ui-icons/Add'
import * as utility from '../utility'

const styles = theme => ({
  root: {
    width: '100%',
    textAlign: 'right'
  },
  container: {
    position: 'absolute',
    width: 8 * 50,
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
})

const createNewComment = postId => ({
  id: utility.getUuid(),
  timestamp: Date.now(),
  body: '',
  author: '',
  voteScore: 1,
  parentId: postId
})

class NewComment extends React.Component {
  state = {
    adding: false
  }

  handleSave = onSuccess => {
    const { newComment } = this.state
    this.setState({ adding: false })
    this.props.dispatch(actions.addComment(newComment))
  }

  handleChange = e => {
    const { name } = e.target
    const value = (name === 'timestamp' && utility.toTimestamp(e.target.value)) || e.target.value
    const { newComment } = this.state
    this.setState({
      newComment: { ...newComment, [name]: value }
    })
  }

  handleOpen = () => {
    const { postId } = this.props
    this.setState({ newComment: createNewComment(postId), adding: true })
  }

  handleClose = () => {
    this.setState({ adding: false })
  }

  render() {
    const { classes } = this.props
    const { newComment } = this.state
    return (
      <div className={classes.root}>
        <Button fab color="primary" aria-label="add" onClick={this.handleOpen} className={classes.button}>
          <AddIcon />
        </Button>
        {newComment ? <Modal
          open={this.state.adding}
          onClose={this.handleClose}
        >
          <div className={classes.container}>
            <Typography type="body1" color="primary" >
              {'body'}
            </Typography>
            <Input
              type="text"
              name="body"
              fullWidth
              onChange={this.handleChange}
            />
            <Typography type="body1" color="primary" >
              {'author'}
            </Typography>
            <Input
              type="text"
              name="author"
              fullWidth
              onChange={this.handleChange}
            />
            <Button key="Save" color="primary" dense onClick={() => { this.handleSave(() => { }) }}>
              Save
            </Button>
            <Button key="cancel" color="secondary" dense onClick={this.handleClose}>
              Cancel
            </Button>
          </div>
        </Modal> : null}
      </div>
    )
  }
}

export default compose(
  connect(),
  withStyles(styles)
)(NewComment)