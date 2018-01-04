import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { storeCategories, storePosts } from '../actions'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import * as PostsAPI from '../utils/api'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import Posts from './Posts'
import { Route, Link } from 'react-router-dom'

function TabContainer(props) {
  const children = props.children
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      <Posts category={children} />
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
  filter: {
    paddingRight: 100,
    textAlign: 'right',
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends React.Component {
  state = {
    value: 0,
    anchor: 'Date'
  };

  componentDidMount() {
    PostsAPI.getCategories().then((categories) => {
      this.props.dispatch(storeCategories(categories))
    }).then(() => PostsAPI.getPosts()
      ).then((posts) => {
        this.props.dispatch(storePosts(posts))
      })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, categories } = this.props;
    const { value, anchor } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs onChange={this.handleChange} value={value}>
            <Tab label='ALL POSTS' key="allPost" />
            {categories.map(category => (<Tab label={category.name} key={category.name} />))}
          </Tabs>
        </AppBar>
        <div className={classes.filter}>
          <TextField
            id="persistent-anchor"
            select
            label="Sort By"
            value={anchor}
            onChange={this.handleChangeAnchor}
            margin="normal"
          >
            <MenuItem value="Date">Date</MenuItem>
            <MenuItem value="Score">Score</MenuItem>
          </TextField>
        </div>
        {value === 0 && <TabContainer children={0} key="allPost" />}
        {categories.map((category, index) => value === index + 1 && <TabContainer children={category.name} key={category.name} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(categories) {
  return categories
}

const AppWithStyle = withStyles(styles)(App);
export default connect(mapStateToProps)(AppWithStyle)