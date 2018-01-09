import React from 'react'
import AppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs'
import SorterContainer from '../containers/SorterContainer'
import TabContainer from '../containers/TabContainer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
});

const AppContent = ({ classes, category, categories, onChange }) => {
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
        <SorterContainer />
        <TabContainer>{category}</TabContainer>
      </div >
    ) :
      <div>loading ...</div>
  )
}
export default withStyles(styles)(AppContent)