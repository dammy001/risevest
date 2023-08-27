import { NextFunction, Request, Response } from 'express'
import { ErrorInterceptor } from './error.middleware'
import { StatusCode } from '@/utils'

describe('ErrorInterceptor', () => {
  it('should handle errors and send an appropriate response', () => {
    // Mocking Express objects
    const mockRequest = {} as Request
    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const mockNext = vi.fn() as unknown as NextFunction

    // Creating a mock error
    const mockError = {
      statusCode: StatusCode.NOT_FOUND,
      message: 'Resource not found',
    }

    // Calling the ErrorInterceptor
    ErrorInterceptor(mockError, mockRequest, mockResponse, mockNext)

    // Assertions
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: false,
      message: 'Resource not found',
    })
  })

  it('should handle errors with default message in production', () => {
    // Mocking Express objects
    const mockRequest = {} as Request
    const mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response
    const mockNext = vi.fn() as unknown as NextFunction

    // Creating a mock error
    const mockError = {
      statusCode: StatusCode.SERVER_ERROR,
      message: 'Internal server error',
    }

    // Mocking the production environment
    const originalIsProduction = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    // Calling the ErrorInterceptor
    ErrorInterceptor(mockError, mockRequest, mockResponse, mockNext)

    // Assertions
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.SERVER_ERROR)
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: false,
      message: 'Internal server error',
    })

    // Restoring the environment variable
    process.env.NODE_ENV = originalIsProduction
  })
})
