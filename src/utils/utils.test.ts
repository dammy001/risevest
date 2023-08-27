import { errorResponse, successResponse } from './status-code.utils'
import { StatusCode } from '@/utils'

describe('successResponse', () => {
  it('should return a success response with default values', () => {
    const response = successResponse()

    expect(response).toEqual({
      success: true,
      data: {},
      message: '',
      status: StatusCode.OK,
    })
  })

  it('should return a success response with custom values', () => {
    const data = { key: 'value' }
    const message = 'Custom message'
    const statusCode = StatusCode.CREATED

    const response = successResponse(data, message, statusCode)

    expect(response).toEqual({
      success: true,
      data,
      message,
      status: statusCode,
    })
  })
})

describe('errorResponse', () => {
  it('should return an error response with default values', () => {
    const response = errorResponse(null)

    expect(response).toEqual({
      success: false,
      error: null,
      message: 'Sorry, an error occured',
      status: StatusCode.BAD_REQUEST,
    })
  })

  it('should return an error response with custom values', () => {
    const customError = new Error('Custom error')
    const message = 'Custom error message'
    const statusCode = StatusCode.SERVER_ERROR

    const response = errorResponse(customError, message, statusCode)

    expect(response).toEqual({
      success: false,
      error: customError,
      message,
      status: statusCode,
    })
  })
})
