import { AbstractController } from './abstract-controller'

export class HomeController extends AbstractController {
  protected static configureRoutes(): void {
    this.router
      .get(['/', '/index(.:format)?'], (req, res) => (new HomeController(req, res).index()))
  }

  public index(): void {
    const info = this.appInfo()

    this.respondTo('html', 'json')
      .then((format) => {
        if (format === 'html') { return this.res.render('index.js', { info }) }
        if (format === 'json') { return this.res.json(info) }
      })
      .catch(() => {
        this.notImplemented()
      })
  }

  private appInfo(): {} {
    const pkg = require('../../package.json')
    return {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description
    }
  }
}
