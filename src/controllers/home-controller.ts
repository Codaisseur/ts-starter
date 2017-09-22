import { AbstractController } from './abstract-controller'

export class HomeController extends AbstractController {
  protected static configureRoutes(): void {
    this.router
      .get('/', (req, res) => (new HomeController(req, res).find()))
  }

  public find(): void {
    this.logger.info('find()...')
    const pkg = require('../../package.json')
    this.res.json({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description
    })
  }
}
