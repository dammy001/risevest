import { StatusCode } from '@utils'
import { BaseError } from './base.exception'

export class HttpException extends BaseError {
  constructor(message = 'Bad Request', statusCode = StatusCode.BAD_REQUEST, isOperational = true) {
    super(statusCode, message, isOperational)
  }
}
