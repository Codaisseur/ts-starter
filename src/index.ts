import * as helmet from 'helmet'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import App, { Server } from './initializers'
import { debugStream, winstonStream } from './initializers/logger'
import { oauth2 } from './middleware'
import { DefaultRoutes } from './routes'
// import database from './initializers/database'
import viewEngine from './initializers/views'

const config = App.config

const app = Server.init()
// const db = database()

app
  // Set up the React view engine
  .engine('js', viewEngine)
  .set('view engine', 'js')
  .set('views', __dirname + '/views')

  // Help secure Express apps with various HTTP headers.
  // See: https://helmetjs.github.io/
  .use(helmet())
  .use(helmet.noCache())
  .use(helmet.hsts({
    maxAge: 31536000,
    includeSubdomains: true
  }))

  // Enable CORS for all routes and origins
  .use(cors())

  // Set up logging
  .use(morgan('dev', debugStream))
  .use(morgan('combined', winstonStream))

  // Set up body-parser
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

  // TODO: Create Oauth2 Auth Middleware
  .use(oauth2({}))

// Set up routes
DefaultRoutes.map(app)

Server.run(app, config.server.port)
