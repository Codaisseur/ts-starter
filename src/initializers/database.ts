import { Sequelize } from 'sequelize-typescript'
import App, { Logger } from './'

const config = App.config.database
const log = Logger('database')

const sequelize = new Sequelize(config.connection)
sequelize.addModels(config.modelPaths)

log.debug('Connecting to database %s', config.connection.split('@')[1])
