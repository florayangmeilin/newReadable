// const store = {
//   categories: {
//     isFetched: true,
//     items: ['react', 'redux', 'router']
//   },
//   posts: {
//     '8xf0y6ziyjabvozdd253nd': {
//       id: '8xf0y6ziyjabvozdd253nd',
//       timestamp: 1467166872634,
//       title: 'Udacity is the best place to learn React',
//       body: 'Everyone says so after all.',
//       author: 'thingtwo',
//       category: 'react',
//       voteScore: 8,
//       deleted: false,
//       commentCount: 3,
//       comments: null
//     },
//     '6ni6ok3ym7mf1p33lnez': {
//       id: '6ni6ok3ym7mf1p33lnez',
//       timestamp: 1468479767190,
//       title: 'Learn Redux in 10 minutes!',
//       body: 'Just kidding. It takes more than 10 minutes to learn technology.',
//       author: 'thingone',
//       category: 'redux',
//       voteScore: -5,
//       deleted: false,
//       commentCount: 2,
//       comments: ['894tuq4ut84ut8v4t8wun89g', '8tu4bsun805n8un48ve89']
//     }
//   },
//   comments: {
//     '894tuq4ut84ut8v4t8wun89g': {
//       id: '894tuq4ut84ut8v4t8wun89g',
//       parentId: '8xf0y6ziyjabvozdd253nd',
//       timestamp: 1468166872634,
//       body: 'Hi there! I am a COMMENT.',
//       author: 'thingtwo',
//       voteScore: 6,
//       deleted: false,
//       parentDeleted: false
//     },
//     '8tu4bsun805n8un48ve89': {
//       id: '8tu4bsun805n8un48ve89',
//       parentId: '8xf0y6ziyjabvozdd253nd',
//       timestamp: 1469479767190,
//       body: 'Comments. Are. Cool.',
//       author: 'thingone',
//       voteScore: -3,
//       deleted: false,
//       parentDeleted: false
//     }
//   },
//   postsByCategory: {
//     'react': {
//       isFetching: true,
//       isInvalidate: false,
//       items: [
//         '8xf0y6ziyjabvozdd253nd'
//       ]
//     },
//     'redux': {
//       isFetching: true,
//       isInvalidate: false,
//       items: [
//         '6ni6ok3ym7mf1p33lnez'
//       ]
//     }
//   },
//   selectedSorter: 'dateEarliest'
// }

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
          )      
    )
}