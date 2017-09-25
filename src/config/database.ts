export = <config.Database>{
  /**
   * Development Environment
   * ------------------------------------------
   *
   * This is the local development environment, which is used by the developoers
   */
  development: {
    url: 'postgresql://localhost:5432/codaisseur-dev',
    dialect: 'postgres',
    modelPaths: [
      __dirname + '/../models'
    ]
  },
  /**
   * Test Environment
   * ------------------------------------------
   *
   * This environment is used by the unit, migration and database test.
   */
  test: {
    url: 'postgresql://localhost:5432/codaisseur-dev',
    dialect: 'postgres',
    modelPaths: [
      __dirname + '/../models'
    ]
  },
  /**
   * Production Environment
   * ------------------------------------------
   *
   * This configuration will be used by the cloud servers. You are abel to override
   * them with the local cloud environment variable to make it even more configurable.
   */
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    modelPaths: [
      __dirname + '/../models'
    ]
  }
}
