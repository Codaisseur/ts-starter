import Environment from './environment'
import Logger from './Logger'
import Server from './Server'

export {
  Environment,
  Logger,
  Server
}

const config = Environment.getConfig()

export default class App {
  static env = Environment
  static config = config
}
