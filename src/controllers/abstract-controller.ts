import * as express from 'express'
import oauth2 from '../middleware/oauth2-middleware'
import * as Promise from 'bluebird'
import { Logger } from '../initializers'

type TActionFilter = (options?: any) => express.RequestHandler

interface IActionFilterConfig {
  all?: TActionFilter[]
  find?: TActionFilter[]
  get?: TActionFilter[]
  create?: TActionFilter[]
  update?: TActionFilter[]
  destroy?: TActionFilter[]
  [key: string]: TActionFilter[] | undefined
}

interface IAbstractController {
  find?: express.RequestHandler
  get?: express.RequestHandler
  create?: express.RequestHandler
  update?: express.RequestHandler
  destroy?: express.RequestHandler
}

export class AbstractController implements IAbstractController {
  protected static beforeFilters: IActionFilterConfig = {}
  protected static afterFilters: IActionFilterConfig = {}

  protected static router: express.Router = express.Router()

  protected logger: config.LogHandlers
  protected req: express.Request
  protected res: express.Response

  public static setup(app: express.Application, namespace?: string): void {
    Logger(`controller:${this.name}`).debug('Mounted at %s', namespace || 'root')
    this.configureRoutes()
    app.use(namespace || '', this.router)
  }

  protected static configureRoutes(): void {
    /*
    this.router
      .get('/', (req, res) => new MyController(req, res).find)
      .post('/', (req, res) => new MyController(req, res).create)
      ...
    */
    this.router
      .get('*', (req, res) => { return new AbstractController(req, res).notImplemented() })
  }

  public constructor(req: express.Request, res: express.Response) {
    this.logger = Logger(`controller:${this.constructor.name}`)
    this.logger.debug('Initializing...')
    this.req = req
    this.res = res
    this.logRequest(req, res)
    return this
  }

  /*
   * Abstract methods to be overridden in child controllers
   */
  public find(): void { this.notFound() }
  public get(): void { this.notFound() }
  public create(): void { this.notFound() }
  public update(): void { this.notFound() }
  public destroy(): void { this.notFound() }

  /*
   * Respond to specific request formats with a Promise
   *
   * Example use:
   *
   * this.respondTo('html')
   *   .then((res) => res.render('index', { hello: 'world' })
   */
  protected respondTo(...formats: string[]): Promise<string | boolean> {
    return new Promise((resolve, reject) => {
      const bestMatch = this.req.accepts(...formats)
      return (typeof bestMatch === 'string') ? resolve(bestMatch) : reject(false)
    })
  }

  protected respondWithError(status: number, message?: string): void {
    this.logger.debug('Error: %s: %s', status, message)

    this.res.status(status)

    Promise.any([
      this.respondTo('html'),
      this.respondTo('json')
    ])
      .then(() => {
        this.respondTo('html')
          .then(() => this.htmlErrorPage(404)),
        this.respondTo('json')
          .then(() => this.res.json({ message }))
      })
      .catch(() => {
        this.notImplemented()
      })
  }

  protected notFound(): void {
    this.respondWithError(404, 'Not Found')
  }

  protected notImplemented(): void {
    this.htmlErrorPage(406)
  }

  private htmlErrorPage(status: number): void {
    const fileName = `${status}.html`
    return this.res.sendfile(fileName, { root: '../public/errors' })
  }

  private logRequest(req: express.Request, _res: express.Response): void {
    this.logger.debug(req.path)
  }
}

export class AuthenticatedController extends AbstractController {
  protected static beforeFilters = {
    all: [oauth2]
  }
}