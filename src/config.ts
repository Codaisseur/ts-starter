export = <config.Environments>{
  /**
   * Development Environment
   * ------------------------------------------
   *
   * This is the local development environment, which is used by the developoers
   */
  development: {
    database: {
      connection: 'postgresql://localhost:5432/codaisseur-dev',
      dialect: 'postgres',
      modelPaths: [
        __dirname + '/models'
      ]
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '4000',
      graphiql: true
    },
    logger: {
      debug: 'app*',
      console: {
        level: 'error'
      }
    }
  },
  /**
   * Test Environment
   * ------------------------------------------
   *
   * This environment is used by the unit, migration and database test.
   */
  test: {
    database: {
      connection: 'postgresql://localhost:5432/codaisseur-dev',
      dialect: 'postgres',
      modelPaths: [
        __dirname + '/models'
      ]
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '4000',
      graphiql: false
    },
    logger: {
      debug: 'app*',
      console: {
        level: 'none'
      }
    }
  },
  /**
   * Production Environment
   * ------------------------------------------
   *
   * This configuration will be used by the cloud servers. You are abel to override
   * them with the local cloud environment variable to make it even more configurable.
   */
  production: {
    database: {
      connection: process.env.DATABASE_URL,
      dialect: 'postgres',
      modelPaths: [
        __dirname + '/models'
      ]
    },
    server: {
      host: 'localhost',
      port: process.env.PORT || '3000',
      graphiql: false
    },
    logger: {
      debug: '',
      console: {
        level: 'debug'
      }
    }
  }
}
