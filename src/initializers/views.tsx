import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { RootState } from '../reducers'
import { Logger } from './'

const log = Logger('views')

export default (filepath: string, initialState: RootState, callback: Function): any => {
  try {
    const Component = require(filepath).default
    log.debug('hydrating redux state with: %j', initialState)

    const store = configureStore(initialState)
    log.debug('rendering %s', filepath)

    callback(null, renderToString(
      <Provider store={store}>
        <Component />
      </Provider>
    ))
  } catch (error) {
    callback(error)
  }
}
