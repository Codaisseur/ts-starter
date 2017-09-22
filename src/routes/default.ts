import * as express from 'express'
import { HomeController } from '../controllers'

export class DefaultRoutes {
  static map(app: express.Application): void {
    HomeController.setup(app)
  }
}
