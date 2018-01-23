import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import { compose } from 'redux'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles'
import Tabs, { Tab } from 'material-ui/Tabs'
import Sorter from './Sorter'
import Posts from './Posts'
import NewPost from './NewPost'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit
  }
})

class Category extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchCategoriesIfNeeded())
  }

  render() {
    const { category, categories, history, classes } = this.props
    return (
      categories.length > 0 ? (
        <div className={classes.root} >
          <AppBar position="static">
            <Tabs
              onChange={(event, value) => {history.push(value !== "#" ? `/${value}` : '/')}}
              value={category || "#"}
            >
              <Tab label="All Posts" value="#" />
              {categories.map(c => (<Tab label={c} value={c} key={c} />))}
            </Tabs>
          </AppBar>
          <Sorter />
          <Posts category={category} />       
          <NewPost categories={category ? [category] : categories}/>           
        </div >
      ) :
        <div>loading ...</div>
    )
  }
}

const mapStateToProps = state => {
  const { categories } = state
  return {
    categories: (categories && categories.isFetched && categories.items) || []
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter,
  withStyles(styles)
)(Category)

