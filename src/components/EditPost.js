import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Modal from 'material-ui/Modal'
import Button from 'material-ui/Button'
import Input from 'material-ui/Input/Input'
import * as actions from '../actions'
import { connect } from 'react-redux'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { compose } from 'redux'

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

class EditPost extends React.Component {
  state = {
    editingPost: {}
  }

  handleChange = e => {
    const { name, value } = e.target
    const { editingPost } = this.state
    this.setState({
      editingPost: { ...editingPost, [name]: value }
    })
  }

  handleSave = () => {
    const { post, dispatch, onClose } = this.props
    const { editingPost } = this.state
    post.isNewPost ?
      dispatch(actions.addPost({ ...post, ...editingPost }, onClose)) :
      dispatch(actions.savePost({ ...post, ...editingPost }, onClose))
  }

  render() {
    const { post, classes, categories, onClose } = this.props
    const { isNewPost } = post
    const { editingPost } = this.state
    return (
      <div className={classes.root}>
        <Modal
          open
          onClose={onClose}
        >
          <div className={classes.container}>
            <Typography type="body1" color="primary" >
              {'title'}
            </Typography>
            <Input
              type="text"
              name="title"
              fullWidth
              defaultValue={post.title}
              onChange={this.handleChange}
            />
            <Typography type="body1" color="primary" >
              {'body'}
            </Typography>
            <Input
              type="text"
              name="body"
              fullWidth
              defaultValue={post.body}
              onChange={this.handleChange}
            />
            <Typography type="body1" color="primary" >
              {'author'}
            </Typography>
            <Input
              type="text"
              name="author"
              fullWidth
              defaultValue={post.author}
              onChange={this.handleChange}
              disabled={!isNewPost}
            />
            <Typography type="body1" color="primary" >
              {'category'}
            </Typography>
            {!isNewPost || !categories ?
              <Input
                type="text"
                name="category"
                fullWidth
                defaultValue={post.category}
                disabled
              /> :
              <Select
                fullWidth
                value={editingPost.category || post.category}
                onChange={this.handleChange}
                input={<Input name="category" />}
              >
                {categories && categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            }
            <Button key="Save" color="primary" dense onClick={this.handleSave}>
              Save
            </Button>
            <Button key="cancel" color="secondary" dense onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default compose(
  connect(),
  withStyles(styles)
)(EditPost)