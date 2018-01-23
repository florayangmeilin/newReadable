import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Input from 'material-ui/Input/Input'
import * as actions from '../actions'
import { connect } from 'react-redux'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import { compose } from 'redux'
import * as utility from '../utility'

const styles = theme => ({
  root: {
    textAlign: 'left',
    marginLeft: theme.spacing.unit * 3
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
  }
})

const getNewPost = categories => ({
  id: utility.getUuid(),
  timestamp: Date.now(),
  title: '',
  body: '',
  author: '',
  category: (categories && categories.length === 1 && categories[0]) || ''
})

class NewPost extends React.Component {
  state = {
    editing: false,
    newPost: null
  }

  handleOpen = categories => {
    this.setState({ newPost: getNewPost(categories), editing: true })
  }

  handleClose = () => {
    this.setState({ newPost: null, editing: false })
  }

  handleSave = onSuccess => {
    this.setState({ editing: false })
    this.props.dispatch(actions.addPost(this.state.newPost, onSuccess))
  }

  handleChange = e => {
    const { name } = e.target
    const value = (name === 'timestamp' && utility.toTimestamp(e.target.value)) || e.target.value
    const { newPost } = this.state
    this.setState({
      newPost: { ...newPost, [name]: value }
    })
  }

  render() {
    const { classes, categories } = this.props
    const { newPost, editing } = this.state
    return (
      <div className={classes.root}>
        <Button fab color="primary" aria-label="add" className={classes.button} onClick={() => { this.handleOpen(categories) }}>
          <AddIcon />
        </Button>
        {newPost && <Modal
          aria-labelledby="newPost"
          aria-describedby="newPost"
          open={editing}
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
              defaultValue={newPost.id}
              onChange={this.handleChange}
              required
            />
            <Typography type="body1" color="primary" >
              {'timestamp'}
            </Typography>
            <Input
              type="datetime-local"
              name="timestamp"
              fullWidth
              defaultValue={utility.toEditDatetimeString(newPost.timestamp)}
              onChange={this.handleChange}
            />
            <Typography type="body1" color="primary" >
              {'title'}
            </Typography>
            <Input
              type="text"
              name="title"
              fullWidth
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
            <Typography type="body1" color="primary" >
              {'category'}
            </Typography>
            <Select
              fullWidth
              value={newPost.category}
              onChange={this.handleChange}
              input={<Input name="category" id="category" />}
            >
              {categories && categories.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))
              }
            </Select>
            <Button key="Save" color="primary" dense onClick={() => { this.handleSave(() => { }) }}>
              Save
            </Button>
            <Button key="cancel" color="secondary" dense onClick={this.handleClose}>
              Cancel
            </Button>
          </div>
        </Modal>}
      </div>
    )
  }
}

export default compose(
  connect(),
  withStyles(styles)
)(NewPost)