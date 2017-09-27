import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Logger } from './'

const log = Logger('views')

export default (filepath: string, props: {}, callback: Function): any => {
  try {
    const Component = require(filepath).default
    log.debug('rendering %s', filepath)
    callback(null, renderToString(<Component { ...props } />))
  } catch (error) {
    callback(error)
  }
}
