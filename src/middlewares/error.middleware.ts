import type { NextFunction, Request, Response } from 'express'
import logger from '@config/logger'
import { ISPRODUCTION } from '@config'
import { StatusCode } from '@utils'

export const ErrorInterceptor = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = +error?.statusCode || StatusCode.SERVER_ERROR
    const message: string =
      ISPRODUCTION && status >= StatusCode.SERVER_ERROR ? 'Something went wrong' : error?.message

    if (status >= StatusCode.SERVER_ERROR) {
      logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    }

    return res.status(status).json({ status: false, message })
  } catch (err) {
    next(err)
  }
}
