import { Environment } from '../../../initializers'
import { db } from '../../../initializers/database'

const log = {
  info: console.log,
  error: console.error
}

export default async (force: boolean = false): Promise<any> => {
  if (force && Environment.isProduction()) { return Promise.reject('Dangerous action to reset the database ignored in production environment!') }

  if (force) { log.info('Resetting database...') }
  if (!force) { log.info('Migrating database to latest version...') }

  await db.sync({ force })

  log.info('Database is now at latest version')

  return Promise.resolve(true)
}
