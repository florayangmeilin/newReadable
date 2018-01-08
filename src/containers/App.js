import React from 'react'
import AppContent from '../components/AppContent'
import { fetchCategories, fetchPosts, setCategory } from '../actions/index';
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount() {
    const { dispatch, category } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
    dispatch(setCategory(category))
  }
  handleChange = (event, value) => {    
    window.location = value !== "#" ? `/${value}` : '/'      
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

export default connect(mapStateToProps)(App)
