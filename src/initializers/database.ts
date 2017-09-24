import { Sequelize } from 'sequelize-typescript'
import App, { Logger } from './'

const config = App.config.database
const log = Logger('database')

const sequelize = new Sequelize(config.url)
sequelize.addModels(config.modelPaths)

export const db = sequelize

export default () => {
  log.debug('Connecting to database %s', config.url.split('@')[1])

  db
    .authenticate()
    .then(() => {
      log.debug('Connection has been established successfully.');
    })
    .catch(err => {
      log.error('Unable to connect to the database:', err);
    });

  return db
}
