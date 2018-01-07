import React from 'react'
import AppContent from '../components/AppContent'
import { fetchCategories } from '../actions/index';
import { connect } from 'react-redux'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchPosts(category))
   dispatch(fetchCategories())
  }


  render() {
    const { category, categories } = this.props    
    return ( 
      <AppContent category={category} categories={categories}/>
    )
  }
}

const mapStateToProps = state => {
  const { categories } = state
  return {
    categories: categories.map(o => o.name)
  }
}

export default connect(mapStateToProps)(App)
