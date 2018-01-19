import React from 'react'
import CategoryUi from './CategoryUi'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import { compose } from 'redux'

class Category extends React.Component {
  state = {
    open: false,
  }
  componentDidMount() {
    const { fetchCategoriesIfNeeded } = this.props
    fetchCategoriesIfNeeded()
  }
  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { category, categories, history } = this.props
    const { open } = this.state
    return (
      <CategoryUi
        category={category}
        categories={categories}
        onCategoryChange={toCategory => history.push(toCategory !== "#" ? `/${toCategory}` : '/')}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        open={open}
      />
    )
  }
}

const mapStateToProps = state => {
  const { categories } = state
  return {
    categories: (categories && categories.isFetched && categories.items) || []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategoriesIfNeeded: category => { dispatch(actions.fetchCategoriesIfNeeded()) }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Category)

