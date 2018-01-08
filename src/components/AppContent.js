import React from 'react'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs'
import Sorter from '../containers/Sorter'
import TabContainer from '../containers/TabContainer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
});

const AppContent = (props) => {
  const { classes, category, categories, onChange } = props  
  return (
    categories.length > 0 ? (
      <div className={classes.root} >
        <AppBar position="static">
          <Tabs
            onChange={(event, value) => onChange(event, value)}
            value={category || "#"}
          >
            <Tab label="All Posts" value="#" />
            {categories.map(c => (<Tab label={c} value={c} key={c} />))}
          </Tabs>
        </AppBar>
        <Sorter />
        {category === null ? 
        <TabContainer>all</TabContainer>:
        <TabContainer>{category}</TabContainer>}         
      </div >
    ) :
      <div>loading ...</div>
  )
}
export default withStyles(styles)(AppContent)