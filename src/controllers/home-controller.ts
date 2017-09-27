import { AbstractController } from './abstract-controller'
import * as Promise from 'bluebird'

export class HomeController extends AbstractController {
  protected static configureRoutes(): void {
    this.router
      .get(['/', '/index(.:format)?'], (req, res) => (new HomeController(req, res).index()))
  }

  public index(): void {
    const props = this.appInfo()

    Promise.any([
      this.respondTo('html', 'json')
    ])
      .then((format) => {
        if (format === 'html') { return this.res.render('index.js', props) }
        if (format === 'json') { return this.res.json(props) }
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
