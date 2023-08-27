import { plainToInstance } from 'class-transformer'
import * as classValidator from 'class-validator'
import { Request, Response } from 'express'
import { validateRequest } from './request.interceptor'

vi.mock('class-transformer')
// vi.mock('class-validator')

describe('validateRequest', () => {
  const mockRequest = {
    body: {},
    query: {},
    params: {},
  } as Request

  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response

  const mockNext = vi.fn()

  class MockType {
    // Define a simple mock class that matches your DTO structure
  }

  it('should validate request body and call next for valid data', async () => {
    const mockDto = new MockType() // Create a mock DTO instance

    ;(plainToInstance as any).mockReturnValue(mockDto)

    // Mock the validate function
    const validateSpy = vi.spyOn(classValidator, 'validate')
    validateSpy.mockResolvedValue([]) // No validation errors

    const middleware = validateRequest(MockType, 'body', false, true, true)

    await middleware(mockRequest, mockResponse, mockNext)

    expect(plainToInstance).toHaveBeenCalledWith(MockType, mockRequest.body)
    expect(validateSpy).toHaveBeenCalledWith(mockDto, {
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    })

    expect(mockRequest.body).toEqual(mockDto)

    validateSpy.mockRestore()
  })
})
