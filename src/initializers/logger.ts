import * as winston from 'winston'
import * as Debug from 'debug'
import Environment from './Environment'

const config = Environment.getConfig().logger

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: Environment.isProduction(),
      handleExceptions: Environment.isProduction(),
      json: Environment.isProduction(),
      colorize: !Environment.isProduction(),
      ...config.console
    })
  ],
  exitOnError: false
})

const stream = (streamFunction: any) => ({
  'stream': streamFunction
})

const write = (writeFunction: any) => ({
  write: (message: string) => writeFunction(message)
})

/**
 * Winston logger stream for the morgan plugin
 */
export const winstonStream = stream(write(logger.info))

// Configure the debug module
process.env.DEBUG = config.debug
const debug = Debug('app:codaisseur:response')

/**
 * Debug stream for the morgan plugin
 */
export const debugStream = stream(write(debug))

/**
 * Exports a wrapper for all the loggers we use in this configuration
 */
const format = (scope: string, message: string): string => `[${scope}] ${message}`

const parse = (args: any[]) => (args.length > 0) ? args : ''

const Logger = (scope: string): config.LogHandlers => {
  const fullScope = `app:codaisseur:${scope || config.context || 'general'}`
  const scopeDebug = Debug(fullScope)
  return {
    debug: (message: string, ...args: any[]) => {
      if (Environment.isProduction()) {
        logger.debug(format(fullScope, message), parse(args))
      }
      scopeDebug(message, parse(args))
    },
    verbose: (message: string, ...args: any[]) => logger.verbose(format(fullScope, message), parse(args)),
    silly: (message: string, ...args: any[]) => logger.silly(format(fullScope, message), parse(args)),
    info: (message: string, ...args: any[]) => logger.info(format(fullScope, message), parse(args)),
    warn: (message: string, ...args: any[]) => logger.warn(format(fullScope, message), parse(args)),
    error: (message: string, ...args: any[]) => logger.error(format(fullScope, message), parse(args))
  }
}

export default Logger
