import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Fragment>
        <Route path="/" exact render={({ match }) => (<App category={null} />)} />
        <Route path="/:category" exact render={({ match }) => {
          return (<App category={match.params.category} />)
        }} />
      </Fragment>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
