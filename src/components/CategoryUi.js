import React from 'react'
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
    margin: theme.spacing.unit,
  },
})

const CategoryUi = ({ classes, category, categories, onCategoryChange, onClose, onOpen, open }) => {
  return (
    categories.length > 0 ? (
      <div className={classes.root} >
        <AppBar position="static">
          <Tabs
            onChange={(event, value) => onCategoryChange(value)}
            value={category || "#"}
          >
            <Tab label="All Posts" value="#" />
            {categories.map(c => (<Tab label={c} value={c} key={c} />))}
          </Tabs>
        </AppBar>
        <Sorter />
        <Posts category={category} />       
        <NewPost categories={categories}/>           
      </div >
    ) :
      <div>loading ...</div>
  )
}
export default withStyles(styles)(CategoryUi)