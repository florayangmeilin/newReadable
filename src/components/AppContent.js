import React from 'react'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs'
import Sorter from '../containers/Sorter'
import TabContainers from './TabContainers'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
});

const ALL = "#"
const AppContent = ({ classes, category, categories }) => {
  return (
    categories.length > 0 ? (
      <div className={classes.root} >
        <AppBar position="static">
          <Tabs onChange={(event, value) => { window.location = value !== ALL ? `/${value}` : '/' }} value={category || ALL}>
            <Tab label="All Posts" value={ALL} />
            {categories.map(c => (<Tab label={c} value={c} key={c} />))}
          </Tabs>
        </AppBar>
        <Sorter />
        <TabContainers />
      </div >
    ) :
       <div>loading ...</div>
  )
}
export default withStyles(styles)(AppContent)