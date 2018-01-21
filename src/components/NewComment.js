import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input/Input'
import * as actions from '../actions'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import AddIcon from 'material-ui-icons/Add'

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const styles = theme => ({
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
  }
})

const getNewComment = () => ({
  id: guid(),
  timestamp: Date.now(),
  body: '',
  author: ''
})

class NewComment extends React.Component {
  state = {
    ...getNewComment(),
    open: false,
  }

  handleSave = onSuccess => {
    const { dispatch, comment = {}, post } = this.props
    this.setState({ open: false })
    dispatch(actions.addComment({ ...comment, id: this.state.id, timestamp: this.state.timestamp, body: this.state.body, author: this.state.author, parentId: post.id }, onSuccess))
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleOpen = () => {
    this.setState({ ...getNewComment(), open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Button fab color="primary" aria-label="add" className={classes.button} onClick={this.handleOpen}>
          <AddIcon />
        </Button>
        <Modal
          aria-labelledby="newPost"
          aria-describedby="newPost"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.container}>
            <Typography type="body1" color="primary" >
              {'ID'}
            </Typography>
            <TextField
              type="text"
              name="id"
              fullWidth
              defaultValue={this.state.id}
              onChange={this.handleChange}
              required
            />
            <Typography type="body1" color="primary" >
              {'timestamp'}
            </Typography>
            <Input
              type="text"
              name="timestamp"
              fullWidth
              defaultValue={this.state.timestamp}
              onChange={this.handleChange}
            />
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
            <Button key="Save" color="primary" dense onClick={() => { this.handleSave(() => { this.setState({ open: false }) }) }}>
              Save
            </Button>
            <Button key="cancel" color="accent" dense onClick={this.handleClose}>
              Cancel
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapDispatchToProps)(withStyles(styles)(NewComment))