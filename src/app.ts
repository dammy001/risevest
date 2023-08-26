import express from 'express'
import type { NextFunction, Request, Response } from 'express'
import { ENVIRONMENT, PORT, cache } from '@config'
import compression from 'compression'
import helmet from 'helmet'
import errorHandler from 'errorhandler'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ErrorInterceptor } from '@middlewares'
import routes from '@routes'
import rateLimit, { type Options } from 'express-rate-limit'

export class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor() {
    this.app = express()
    this.env = ENVIRONMENT ?? 'development'
    this.port = PORT ?? 5500

    this.initializeMiddlewares().initializeRoutes().initializeInterceptors()
  }

  public getApplication(): express.Application {
    return this.app
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('=================================')
      console.log(`======= ENV: ${this.env} =======`)
      console.log(`🚀 App listening on the port ${this.port}`)
      console.log('=================================')
    })

    this.initializeCache()
  }

  private initializeMiddlewares(): this {
    const mapCorsOptions = function (req: Request, callback: (...args: any) => void): void {
      const options = {
        origin: false as boolean | string | string[],
        preflightContinue: false,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      }

      if (['development', 'test', 'local'].includes(ENVIRONMENT as string)) {
        options.origin = '*'
      } else {
        options.origin = ['*'] // change to authorized urls
      }

      callback(null, options)
    }

    this.app.use(cors(mapCorsOptions))
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(bodyParser.json())
    this.app.use(express.json({ limit: '5mb' }))
    this.app.use(express.urlencoded({ extended: true }))

    return this
  }

  private initializeInterceptors(): this {
    this.app.use(ErrorInterceptor)

    if (ENVIRONMENT === 'development') {
      this.app.use(errorHandler())
    }

    return this
  }

  private initializeCache(): this {
    cache
      .connect()
      .then(() => {
        console.log('Redis connected successfully')
      })
      .catch((error) => {
        console.error('Failed to connect to Redis', error)
      })

    return this
  }

  private initializeRoutes(): this {
    const apiLimiter = rateLimit({
      windowMs: 2 * 60 * 1000, // 2 minutes
      max: 1000,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req: Request, res: Response, next: NextFunction, optionsUsed: Options) => {
        return res
          .status(optionsUsed.statusCode)
          .json({ status: false, message: optionsUsed.message })
      },
    })

    this.app.use('/api', apiLimiter, routes)

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        message: 'Invalid Route',
        success: false,
      })
    })

    return this
  }
}
