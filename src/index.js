import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Category from './components/Category'
import configureStore from './store'
import PostDetail from './components/PostDetail'
import NoMatch404 from './components/NoMatch404'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Fragment>
        <Switch>
          <Route path="/" exact render={({ match }) => (<Category category={null} />)} />
          <Route path="/:category" exact render={({ match }) => { return (<Category category={match.params.category} />) }} />
          <Route path="/:category/:postid" exact render={({ match }) => { return (<PostDetail category={match.params.category} postId={match.params.postid} />) }} />
          <Route component={NoMatch404} />
        </Switch>
      </Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
