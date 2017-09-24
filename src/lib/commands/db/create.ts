import { Sequelize } from 'sequelize-typescript'
import App from '../../../initializers'
import { db } from '../../../initializers/database'

const config = App.config.database
const log = {
  info: console.log
}

export default async (): Promise<any> => {
  const dbName: string = config.url.split('/').slice(-1)[0]
  const pgSequelize = new Sequelize([config.url.split('/')[0], 'postgres'].join('/'))

  const res = await pgSequelize.query(`SELECT 1 AS exists FROM pg_database WHERE datname = '${dbName}'`, { type: db.QueryTypes.SELECT })
  if (res.length > 0) { return Promise.reject(new Error(`Database ${dbName} exists`)) }

  log.info(`Database does not exist, creating database ${dbName}`)
  await pgSequelize.query(`CREATE DATABASE "${dbName}"`, { type: db.QueryTypes.RAW })
  log.info(`Database ${dbName} created`)

  return Promise.resolve(true)
}
