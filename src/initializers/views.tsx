import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from './store'
import { RootState, sanitizeState } from '../reducers'
import { Logger, Environment } from './'

const log = Logger('views')

const jsBundleURL: string = Environment.isProduction() ?
  '/public/js/bundle.js' :
  'http://localhost:3001/static/js/bundle.js'

const renderFullPage = (html: string, preloadedState: RootState): string => {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="/public/manifest.json">
        <link rel="shortcut icon" href="/public/favicon.ico">
        <title>TS Starter</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${jsBundleURL}"></script>
      </body>
    </html>
    `
}

export default (filepath: string, initialState: RootState, callback: Function): any => {
  try {
    const Component = require(filepath).default
    log.debug('hydrating redux state with: %j', initialState)

    const sanitizedState = sanitizeState(initialState)

    const store = configureStore(sanitizedState)
    log.debug('rendering %s', filepath)

    const html = renderToString(
      <Provider store={store}>
        <Component />
      </Provider>
    )

    callback(null, renderFullPage(html, sanitizedState))
  } catch (error) {
    callback(error)
  }
}
