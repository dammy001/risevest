import { BaseError } from './base.exception'
import { StatusCode } from '@/utils'

export class HttpException extends BaseError {
  constructor(message = 'Bad Request', statusCode = StatusCode.BAD_REQUEST, isOperational = true) {
    super(statusCode, message, isOperational)
  }
}
