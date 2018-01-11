import React, { Fragment } from 'react'
import AppContent from '../components/AppContent'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
  }

  handleChange = (event, value) => {
    this.props.history.push(value !== "#" ? `/${value}` : '/')
  }

  render() {
    const { category, categories } = this.props
    return (
      <Fragment>
        <AppContent
          category={category}
          categories={categories}
          onChange={this.handleChange}
        />      
      </Fragment>
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
