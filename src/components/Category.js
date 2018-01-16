import React from 'react'
import CategoryUi from './CategoryUi'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'

const Category = withRouter(
  class extends React.Component {
    componentDidMount() {
      const { fetchCategoriesIfNeeded } = this.props
      fetchCategoriesIfNeeded()
    }
    render() {
      const { category, categories, history } = this.props
      return (
        <CategoryUi
          category={category}
          categories={categories}
          onCategoryChange={toCategory => history.push(toCategory !== "#" ? `/${toCategory}` : '/')}
        />
      )
    }
  }
)

const mapStateToProps = state => {
  const { categories } = state
  return {
    categories: (categories && categories.isFetched && categories.items) || []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategoriesIfNeeded: category => { dispatch(actions.fetchCategoriesIfNeeded()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)
