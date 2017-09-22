import { middleware } from 'middleware'
import * as express from 'express'
import { Logger } from '../initializers'

const log = Logger('oauth2')

const oauth2Middleware = (options: middleware.oauth2.Options) => (_req: express.Request, _res: express.Response, next: VoidFunction) => {
  // TODO: oauth2-token logic here
  log.debug('oauth2Middleware was passed with options: %j', options)
  next()
}

export default (options: middleware.oauth2.Options) => {
  // Possibility to handle options to configure this middleware
  log.debug('oauth2Middleware was registered')
  return oauth2Middleware(options)
}
