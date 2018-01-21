import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Category from './components/Category'
import configureStore from './store'
import PostEdit from './components/PostEdit'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Fragment>
        <Route path="/" exact render={({ match }) => (<Category category={null} />)} />
        <Route path="/:category" exact render={({ match }) => { return (<Category category={match.params.category} />) }} />
        <Route path="/:category/:postid" render={({ match }) => { return (<PostEdit category={match.params.category} postId={match.params.postid} />) }} />      
      </Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
