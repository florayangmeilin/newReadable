import React from 'react'
import AppContent from '../components/AppContent'
import { fetchCategories, fetchPosts } from '../actions/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  handleChange = (event, value) => {
    this.props.history.push(value !== "#" ? `/${value}` : '/')
  }

  render() {
    const { category, categories } = this.props
    return (
      <AppContent
        category={category}
        categories={categories}
        onChange={this.handleChange}
      />
    )
  }
}

const mapStateToProps = state => {
  const { categories, selectedCategory } = state
  return {
    categories: categories.map(o => o.name),
    selectedCategory
  }
}

export default connect(mapStateToProps)(withRouter(App))
